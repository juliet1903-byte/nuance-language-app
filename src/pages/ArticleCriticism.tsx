import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import articleCriticism from "@/assets/article-criticism.png";

const ArticleCriticism = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/30 px-5 py-4 flex items-center gap-3">
        <button onClick={() => navigate("/dashboard")} className="p-1.5 rounded-lg hover:bg-card transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-sm font-semibold truncate">How to Receive Criticism</span>
      </header>

      <article className="max-w-2xl mx-auto px-5 pb-20">
        <div className="relative -mx-5 mb-8">
          <img src={articleCriticism} alt="Receiving criticism" className="w-full h-56 md:h-72 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-5 right-5">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-sm text-white px-2.5 py-1 rounded-md mb-2">
              <Tag className="w-3 h-3" /> Article
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">How to Receive Criticism Without Collapsing or Defending</h1>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-8">
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 8 min read</span>
          <span className="bg-card px-2.5 py-1 rounded-full font-medium">Feedback</span>
        </div>

        <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 font-medium border-l-2 border-cta pl-4">
          The other side of difficult conversations — what to do when the feedback is about you.
        </p>

        <div className="space-y-8 text-foreground">
          <section>
            <p className="leading-relaxed text-muted-foreground">
              Everyone talks about how to give feedback. Almost nobody talks about how to receive it. But the ability to hear criticism without becoming defensive, to extract useful information from poorly delivered feedback, and to respond in a way that keeps the conversation productive is one of the most valuable professional skills you can develop.
            </p>
            <p className="leading-relaxed text-muted-foreground mt-4">
              Most people respond to critical feedback in one of two ways. They collapse — they agree immediately, apologize profusely, and promise to do better, even when they do not understand what went wrong. Or they defend — they explain their intent, justify their choices, and push back on the criticism before the other person has finished speaking. Both responses have the same effect: they end the conversation before any real learning can happen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">Why Your First Instinct Is Usually Wrong</h2>
            <p className="text-muted-foreground text-sm mb-4">When someone tells you that something you did caused a problem, your brain has about three seconds to decide how to respond. Most people default to one of four instinctive responses:</p>
            <div className="space-y-3">
              {[
                { label: "Justify", desc: "Explain why you made the choice you made, with the subtext being 'if you understood my reasoning, you would agree with me.'" },
                { label: "Deflect", desc: "Point to external factors that made the outcome inevitable — tight deadlines, unclear requirements, other people's mistakes." },
                { label: "Minimize", desc: "Suggest that the issue is not as serious as the other person is making it out to be." },
                { label: "Collapse", desc: "Agree immediately and apologize, even if you do not understand what went wrong or why it matters." },
              ].map((item) => (
                <div key={item.label} className="bg-card rounded-xl p-4 border border-border/50">
                  <p className="font-semibold text-sm">{item.label}</p>
                  <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground text-sm mt-4 leading-relaxed">
              All four responses are efforts to make the discomfort stop. But they all have the same flaw: they prioritize your emotional comfort over actually understanding the problem.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">The Only Response That Keeps the Conversation Open</h2>
            <div className="bg-cta/10 border border-cta/20 rounded-xl p-4 mb-4">
              <p className="text-sm font-medium text-foreground italic">
                "That's useful — thank you. Can I ask what specifically felt off?"
              </p>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Two sentences. The first sentence acknowledges the feedback without agreeing or disagreeing. The second sentence asks for specifics, which gives you more information and signals that you are engaging seriously. This response works because it does not trigger defensiveness in the other person.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">How to Ask for Specifics Without Sounding Defensive</h2>
            <p className="text-muted-foreground text-sm mb-4">Vague feedback is useless. Your job when you receive vague feedback is to ask for specifics in a way that does not sound like you are pushing back:</p>
            <div className="space-y-3">
              {[
                '"I want to make sure I understand exactly what you\'re describing before I respond. Can you give me an example?"',
                '"When you say \'communication style,\' are you referring to the way I run meetings, the way I write emails, or something else?"',
                '"What would \'more polish\' look like in practice? I want to make sure I\'m addressing the right thing."',
                '"Was there a specific part of the presentation that was unclear, or was it the overall structure?"',
              ].map((phrase, i) => (
                <div key={i} className="bg-card rounded-xl p-4 border border-border/50 text-sm text-foreground italic">
                  {phrase}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">What to Do When the Feedback Is Unfair</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Sometimes the feedback you receive is wrong. When that happens, your instinct will be to correct them immediately. Do not do that. Instead, use this two-step process:
            </p>
            <div className="space-y-3">
              <div className="bg-card rounded-xl p-4 border border-border/50">
                <p className="font-semibold text-sm">Step 1: Acknowledge their experience</p>
                <p className="text-sm text-muted-foreground mt-1 italic">"I can see why it looked that way from your perspective."</p>
              </div>
              <div className="bg-card rounded-xl p-4 border border-border/50">
                <p className="font-semibold text-sm">Step 2: Add context without framing it as a correction</p>
                <p className="text-sm text-muted-foreground mt-1 italic">"Let me share what was happening on my side, and you can tell me if that changes how it felt."</p>
              </div>
            </div>

            <div className="space-y-3 mt-4">
              <div className="bg-card rounded-xl p-4 border border-border/50">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">❌ This closes the loop</p>
                <p className="text-sm italic text-muted-foreground">"You've misunderstood what happened. I didn't have the information I needed to make that call."</p>
              </div>
              <div className="bg-card rounded-xl p-4 border border-cta/30">
                <p className="text-xs font-bold text-cta uppercase tracking-wider mb-2">✅ This keeps it open</p>
                <p className="text-sm italic text-foreground">"I can see why it looked that way. From my side, I didn't have X at the time, which is why I made the call I did. If there's a way to flag that earlier in future, that would help."</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">The Danger of Collapsing</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Collapsing under feedback feels like the mature response. But collapsing is not the same as learning. When you collapse, you are prioritizing the emotional resolution of the conversation over understanding what actually went wrong. You agree before you understand. You apologize before you know what you are apologizing for.
            </p>
            <div className="space-y-3">
              <div className="bg-card rounded-xl p-4 border border-border/50">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">❌ Collapsing</p>
                <p className="text-sm italic text-muted-foreground">"I know, I know — I'm just not good at that. I'll try harder. I'm sorry."</p>
              </div>
              <div className="bg-card rounded-xl p-4 border border-cta/30">
                <p className="text-xs font-bold text-cta uppercase tracking-wider mb-2">✅ Learning</p>
                <p className="text-sm italic text-foreground">"That's useful — thank you. Can I ask what specifically felt off? I want to make sure I'm addressing the right thing."</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">When to Push Back</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              There are situations where the correct response to feedback is to push back. But how you push back matters.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              {[
                "Acknowledge first: 'I can see why that's frustrating — let me explain what was happening on my side.'",
                "Provide context without blame: 'I didn't have X at the time, which is why I made the call I did.'",
                "Propose a way forward: 'If this comes up again, here's how I'd suggest we handle it differently.'",
              ].map((item, i) => (
                <div key={i} className="flex gap-2"><span className="text-cta font-bold shrink-0">→</span>{item}</div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">Deciding What to Do With the Feedback</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Not all feedback is correct. Not all feedback is useful. After you have heard the feedback and given yourself time to process, ask yourself:
            </p>
            <div className="space-y-3">
              {[
                "Is this feedback consistent with what I have heard from others?",
                "Is this feedback about something I can actually control?",
                "Is this feedback aligned with the outcomes I am trying to achieve?",
              ].map((q, i) => (
                <div key={i} className="bg-card rounded-xl p-4 border border-border/50 text-sm text-foreground">
                  {q}
                </div>
              ))}
            </div>
          </section>

          <section className="border-t border-border/50 pt-6">
            <p className="text-muted-foreground text-sm leading-relaxed italic">
              Feedback is not a verdict. It is information about how your work is landing with someone else. Your job is to take that information, filter it for what is useful, and decide what to do with it. The people who are best at receiving feedback are not the ones who never get criticized — they are the ones who can hear criticism without treating it as an existential threat.
            </p>
            <p className="text-xs text-muted-foreground mt-3">— Based on insights from The Career Playbook</p>
          </section>
        </div>
      </article>
    </div>
  );
};

export default ArticleCriticism;
