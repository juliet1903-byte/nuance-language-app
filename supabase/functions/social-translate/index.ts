import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function buildSystemPrompt(tone: string): string {
  const base = `You are a workplace communication coach from the Career Playbook. You help professionals translate blunt, raw thoughts into polished workplace communication.

You MUST respond with valid JSON only, no markdown, no code fences.

IMPORTANT: Every response MUST include a "conversational" field — a single, concise, ready-to-send message that naturally incorporates the key points. It should read like something you'd actually say or type to a colleague — warm, direct, no labels or headers. Keep it to 2-4 sentences max.`;

  if (tone === "neutral") {
    return `${base}

MODE: NEUTRAL — Clarity & Objectivity
Goal: Strip away emotion and bias to provide a clear, factual statement.
- Convert raw thoughts into direct, professional observations.
- Do NOT add leadership framing or softening language.
- Keep it concise, factual, and free of subjective opinion.
- Use third-person or passive voice where appropriate.

JSON schema:
{
  "rawVibeScore": <number 5-35, how blunt/harsh the raw input sounds>,
  "translatedVibeScore": <number 50-70, moderate nuance — clear but not overly warm>,
  "sections": [
    {"label": "OBSERVATION", "content": "<clear, factual restatement of the situation>"},
    {"label": "RECOMMENDATION", "content": "<neutral, actionable suggestion>"}
  ],
  "conversational": "<a single concise, ready-to-send message combining the above points naturally>",
  "coachTip": "<1-2 sentence explanation of the key linguistic shift, e.g. removing emotional charge or bias>"
}`;
  }

  if (tone === "leader") {
    return `${base}

MODE: LEADER — The SBI Framework
Goal: Provide high-impact, professional feedback that drives results.
- STRICTLY follow the SBI Model: Situation, Behaviour, Impact.
- Each section must be clearly distinct and substantive.
- SITUATION: Set the context (when, where, what meeting/project).
- BEHAVIOUR: Describe the specific, observable behaviour objectively.
- IMPACT: Explain the effect on the team, project, or relationship, and invite dialogue.
- This should sound like a seasoned executive giving constructive feedback.

JSON schema:
{
  "rawVibeScore": <number 5-35, how blunt/harsh the raw input sounds>,
  "translatedVibeScore": <number 80-95, deep nuance — masterful leadership communication>,
  "sections": [
    {"label": "SITUATION", "content": "<specific context and setting>"},
    {"label": "BEHAVIOUR", "content": "<objective, observable behaviour description>"},
    {"label": "IMPACT", "content": "<effect on team/project + invitation to discuss>"}
  ],
  "conversational": "<a single concise, ready-to-send message combining the above points naturally>",
  "coachTip": "<1-2 sentence explanation of the SBI technique applied>"
}`;
  }

  // Default: colleague
  return `${base}

MODE: COLLEAGUE — Rapport & Subjectivity
Goal: Maintain social harmony and peer-to-peer relationships.
- Use Subjective Framing to lower the social temperature.
- Start observations with phrases like "From where I'm sitting," "I'm concerned that...", "I noticed...", "It seems to me..."
- Frame feedback as personal perspective, not objective truth.
- Keep the tone warm, approachable, and collaborative.
- Invite the other person's viewpoint.

JSON schema:
{
  "rawVibeScore": <number 5-35, how blunt/harsh the raw input sounds>,
  "translatedVibeScore": <number 65-85, good nuance — warm and diplomatic>,
  "sections": [
    {"label": "PERSPECTIVE", "content": "<subjectively framed observation using I-statements>"},
    {"label": "CONCERN", "content": "<what worries you, framed personally>"},
    {"label": "INVITATION", "content": "<open question inviting their perspective>"}
  ],
  "coachTip": "<1-2 sentence explanation of the subjective framing technique applied>"
}`;
}

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
    const systemPrompt = buildSystemPrompt(toneLabel);
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
