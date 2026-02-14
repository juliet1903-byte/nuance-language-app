import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { rawText, tone } = await req.json();

    if (!rawText || typeof rawText !== "string" || rawText.trim().length === 0) {
      return new Response(JSON.stringify({ error: "rawText is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const toneLabel = tone || "colleague";

    const systemPrompt = `You are a workplace communication coach. You help professionals translate blunt, raw thoughts into nuanced, empathetic workplace communication.

You MUST respond with valid JSON only, no markdown, no code fences. The JSON schema:

{
  "rawVibeScore": <number 5-35, how blunt/harsh the raw input sounds, lower = more blunt>,
  "translatedVibeScore": <number 60-95, how nuanced the translated version is>,
  "sections": [
    {"label": "SITUATION", "content": "<rewritten situation observation>"},
    {"label": "BEHAVIOUR", "content": "<rewritten objective behaviour description>"},
    {"label": "IMPACT", "content": "<rewritten impact + invitation to discuss>"}
  ],
  "coachTip": "<1-2 sentence explanation of the key linguistic shift you made, e.g. 'We replaced the accusatory You-statement with an objective observation to reduce defensiveness.'>"
}

Rules:
- Use the SBI (Situation, Behaviour, Impact) framework for the "leader" tone.
- For "colleague" tone, still use SBI but make it more casual and peer-to-peer.
- For "neutral" tone, use SBI in a diplomatic, third-person style.
- The translated text should be professional, empathetic, and non-confrontational.
- The coachTip should explain the most important rhetorical technique you applied.
- rawVibeScore should reflect the bluntness of the original input (5=very harsh, 35=slightly blunt).
- translatedVibeScore should reflect the nuance of your rewrite (60=adequate, 95=masterful).`;

    const userPrompt = `Tone: ${toneLabel}\n\nRaw thought: "${rawText.trim()}"`;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again shortly." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits depleted. Please add credits in workspace settings." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const raw = data.choices?.[0]?.message?.content || "";
    
    // Strip markdown fences if present
    const cleaned = raw.replace(/```json\s*/gi, "").replace(/```\s*/gi, "").trim();
    
    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      console.error("Failed to parse AI response:", raw);
      throw new Error("Invalid AI response format");
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("social-translate error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
