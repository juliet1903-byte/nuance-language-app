import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Tag, AArrowUp, AArrowDown } from "lucide-react";
import articleMicroaggressions from "@/assets/article-microaggressions.webp";
import { useTextSize } from "@/hooks/useTextSize";

const ArticleMicroaggressions = () => {
  const navigate = useNavigate();
  const { textSize, textSizeClass, cycleTextSize } = useTextSize();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/30 px-5 py-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1.5 rounded-lg hover:bg-card transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-semibold truncate text-base flex-1">The Career Cost of Microaggressions</span>
        <button onClick={cycleTextSize} className="w-10 h-10 flex items-center justify-center rounded-full bg-card hover:bg-muted transition-colors" aria-label="Change text size">
          {textSize === "x-large" ? <AArrowDown className="w-5 h-5" /> : <AArrowUp className="w-5 h-5" />}
        </button>
      </header>

      <article className={`max-w-2xl mx-auto px-5 pb-20 ${textSizeClass}`}>
        {/* Hero */}
        <div className="relative -mx-5 mb-8">
          <img src={articleMicroaggressions} alt="The career cost of microaggressions" className="w-full h-56 md:h-72 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-5 right-5">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-sm text-white px-2.5 py-1 rounded-md mb-2">
              <Tag className="w-3 h-3" /> Article
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">The Career Cost of Microaggressions</h1>
          </div>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-8">
          <span className="flex items-center gap-1 text-sm"><Clock className="w-3.5 h-3.5" /> 14 min read</span>
          <span className="bg-card px-2.5 py-1 rounded-full font-medium text-sm">DEI</span>
        </div>

        {/* Lead */}
        <p className="text-base md:text-lg leading-relaxed mb-8 font-medium border-l-2 border-cta pl-4 text-secondary-foreground">
          How small slights accumulate into serious professional damage — and what to do about it.
        </p>

        <div className="space-y-8 text-foreground">

          {/* Intro */}
          <section>
            <p className="leading-relaxed text-muted-foreground text-base">
              A colleague mispronounces your name for the third time this month and does not apologize. In a meeting, someone talks over your idea and presents it as their own two minutes later. Your manager asks you to take notes, even though you are the most senior person in the room. A teammate says 'your English is really good' as if they are surprised you can speak at all.
            </p>
            <p className="leading-relaxed text-muted-foreground mt-4 text-base">
              None of these moments are catastrophic on their own. But they accumulate. Over weeks and months, they send a clear message: you do not quite belong here. Your contributions are not valued the same way others' are. The rules that apply to everyone else do not apply to you — or they apply more harshly.
            </p>
            <p className="leading-relaxed text-muted-foreground mt-4 text-base">
              These are <strong>microaggressions</strong> — small, often unintentional behaviors that communicate negative messages about someone based on their identity. The 'micro' does not mean small in impact. It means the harm is embedded in ordinary, everyday interactions rather than overt discrimination.
            </p>
          </section>

          {/* What They Are */}
          <section>
            <h2 className="text-xl mb-4 font-semibold">What Microaggressions Actually Are</h2>
            <p className="leading-relaxed text-muted-foreground text-base">
              A microaggression is a comment, question, or action that — often unintentionally — reinforces a negative stereotype or communicates that someone does not fully belong. The person delivering it usually does not think they are doing anything wrong. That is what makes it difficult to address.
            </p>
            <p className="leading-relaxed text-muted-foreground mt-4 text-base">
              Microaggressions differ from overt discrimination in three important ways:
            </p>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              <li className="flex gap-2 text-base"><span className="text-cta font-bold shrink-0">•</span>They are often <strong>ambiguous</strong>. You cannot prove intent. The person can always claim they meant something else.</li>
              <li className="flex gap-2 text-base"><span className="text-cta font-bold shrink-0">•</span>They are <strong>deniable</strong>. If you raise the issue, the other person can say you are being oversensitive or misinterpreting them.</li>
              <li className="flex gap-2 text-base"><span className="text-cta font-bold shrink-0">•</span>They are <strong>cumulative</strong>. One incident is easy to dismiss. Ten incidents over two months is a pattern — but by then, the damage is done.</li>
            </ul>
            <div className="bg-cta/10 border border-cta/20 rounded-xl p-4 mt-4">
              <p className="font-medium text-foreground text-base">
                The harm of microaggressions is not in any single moment. It is in the constant low-level signal that you are different, less competent, or not quite trustworthy — and the mental energy it takes to decide whether to address it every single time.
              </p>
            </div>
          </section>

          {/* Common Examples */}
          <section>
            <h2 className="text-xl mb-4 font-semibold">Common Microaggressions in Professional Settings</h2>
            <p className="leading-relaxed text-muted-foreground text-base mb-4">
              Microaggressions take many forms. Here are the patterns that show up most frequently in international workplaces, especially for people from underrepresented groups.
            </p>

            <h3 className="font-semibold text-base mb-3">1. Competence Questioned Based on Identity</h3>
            <div className="space-y-3 mb-6">
              <div className="bg-card rounded-xl p-4 border border-border/50">
                <p className="font-bold text-muted-foreground uppercase tracking-wider mb-2 text-sm">⚠️ The Surprised Compliment</p>
                <p className="text-muted-foreground text-base"><strong>What happened:</strong> "Your English is really good!" said to a colleague who has been working in English for a decade.</p>
                <p className="text-muted-foreground text-base mt-2"><strong>Why it matters:</strong> Implies surprise that someone from their background would be competent. Creates a subtle hierarchy where native speakers are the default and everyone else is an exception.</p>
              </div>
              <div className="bg-card rounded-xl p-4 border border-border/50">
                <p className="font-bold text-muted-foreground uppercase tracking-wider mb-2 text-sm">⚠️ The Credibility Check</p>
                <p className="text-muted-foreground text-base"><strong>What happened:</strong> A woman presents a technical solution. A male colleague immediately asks "Are you sure that will work?" — a question he does not ask male colleagues.</p>
                <p className="text-muted-foreground text-base mt-2"><strong>Why it matters:</strong> Her expertise is questioned by default. She has to prove competence every time, while others are assumed competent until proven otherwise.</p>
              </div>
              <div className="bg-card rounded-xl p-4 border border-border/50">
                <p className="font-bold text-muted-foreground uppercase tracking-wider mb-2 text-sm">⚠️ The Stereotype Assumption</p>
                <p className="text-muted-foreground text-base"><strong>What happened:</strong> "You must be good at math" (to an Asian colleague) or "You are so articulate" (to a Black colleague).</p>
                <p className="text-muted-foreground text-base mt-2"><strong>Why it matters:</strong> Reduces the person to a stereotype. Implies their skills are surprising given their background.</p>
              </div>
            </div>

            <h3 className="font-semibold text-base mb-3">2. Contributions Minimized or Ignored</h3>
            <div className="space-y-3 mb-6">
              <div className="bg-card rounded-xl p-4 border border-border/50">
                <p className="font-bold text-muted-foreground uppercase tracking-wider mb-2 text-sm">⚠️ The Interrupted Idea</p>
                <p className="text-muted-foreground text-base"><strong>What happened:</strong> You make a suggestion in a meeting. It is ignored. Two minutes later, a colleague says the same thing and everyone agrees it is brilliant.</p>
                <p className="text-muted-foreground text-base mt-2"><strong>Why it matters:</strong> Your contributions are not heard the same way others' are. Over time, you stop speaking up because it does not matter.</p>
              </div>
              <div className="bg-card rounded-xl p-4 border border-border/50">
                <p className="font-bold text-muted-foreground uppercase tracking-wider mb-2 text-sm">⚠️ The Assigned Admin Work</p>
                <p className="text-muted-foreground text-base"><strong>What happened:</strong> You are repeatedly asked to take notes or organize team events — even though this is not your role.</p>
                <p className="text-muted-foreground text-base mt-2"><strong>Why it matters:</strong> Signals that your time is less valuable. Limits your visibility on high-impact projects.</p>
              </div>
            </div>

            <h3 className="font-semibold text-base mb-3">3. Belonging Questioned</h3>
            <div className="space-y-3">
              <div className="bg-card rounded-xl p-4 border border-border/50">
                <p className="font-bold text-muted-foreground uppercase tracking-wider mb-2 text-sm">⚠️ The Mistaken Identity</p>
                <p className="text-muted-foreground text-base"><strong>What happened:</strong> Someone confuses you with another colleague who does not look like you at all — except that you are both from the same ethnic background.</p>
                <p className="text-muted-foreground text-base mt-2"><strong>Why it matters:</strong> Signals that you are seen as interchangeable. Your individual identity does not matter.</p>
              </div>
              <div className="bg-card rounded-xl p-4 border border-border/50">
                <p className="font-bold text-muted-foreground uppercase tracking-wider mb-2 text-sm">⚠️ The "Where Are You Really From?"</p>
                <p className="text-muted-foreground text-base"><strong>What happened:</strong> Someone asks where you are from. You say the city. They ask "No, where are you really from?"</p>
                <p className="text-muted-foreground text-base mt-2"><strong>Why it matters:</strong> Signals that you are not considered a full member of the community. You are perpetually foreign.</p>
              </div>
              <div className="bg-card rounded-xl p-4 border border-border/50">
                <p className="font-bold text-muted-foreground uppercase tracking-wider mb-2 text-sm">⚠️ The Exclusion from Informal Networks</p>
                <p className="text-muted-foreground text-base"><strong>What happened:</strong> After-work drinks, lunch conversations, hallway chats — always happening without you.</p>
                <p className="text-muted-foreground text-base mt-2"><strong>Why it matters:</strong> You miss the informal discussions where decisions are actually made. Your network is weaker, which limits career progression.</p>
              </div>
            </div>
          </section>

          {/* How They Damage Careers */}
          <section>
            <h2 className="text-xl mb-4 font-semibold">How Microaggressions Damage Careers</h2>
            <p className="leading-relaxed text-muted-foreground text-base mb-4">
              Most people think microaggressions are just annoying. They are much worse than that. Here is how they create real, measurable career damage:
            </p>

            <h3 className="font-semibold text-base mb-3">1. Death by a Thousand Cuts — The Cognitive Load</h3>
            <p className="leading-relaxed text-muted-foreground text-base mb-4">
              Every microaggression creates a decision point: Do I address this? Do I let it go? Am I overreacting? This decision-making process happens multiple times per day. It is exhausting. While colleagues are focused on solving technical problems, you are also managing the emotional labor of deciding whether to respond.
            </p>

            <h3 className="font-semibold text-base mb-3">2. The Visibility Trap</h3>
            <p className="leading-relaxed text-muted-foreground text-base mb-4">
              If you address microaggressions directly, you risk being seen as difficult. If you do not address them, the behavior continues. People who speak up are labeled as complainers. People who stay silent experience worsening treatment. Either way, career progression suffers.
            </p>

            <h3 className="font-semibold text-base mb-3">3. Erosion of Credibility and Authority</h3>
            <p className="leading-relaxed text-muted-foreground text-base mb-4">
              When your competence is questioned repeatedly, it affects how others perceive you. This is particularly damaging in performance review cycles. If peers have been subtly trained to doubt your expertise, that doubt shows up in feedback — affecting your rating, promotion prospects, and compensation.
            </p>

            <h3 className="font-semibold text-base mb-3">4. The Exit Multiplier</h3>
            <p className="leading-relaxed text-muted-foreground text-base">
              Microaggressions are one of the primary reasons high-performing people leave organizations — often without saying why. They do not leave over one comment. They leave because the accumulation becomes unbearable.
            </p>
          </section>

          {/* How to Respond */}
          <section>
            <h2 className="text-xl mb-4 font-semibold">How to Respond: A Decision Framework</h2>
            <p className="leading-relaxed text-muted-foreground text-base mb-4">
              There is no single correct way to respond to a microaggression. The right response depends on the situation, the relationship, the power dynamics, and your own capacity at that moment.
            </p>

            <h3 className="font-semibold text-base mb-3">Option 1: Address It Immediately (Use Rarely)</h3>
            <p className="leading-relaxed text-muted-foreground text-base mb-3">
              This works when the comment was clearly out of line, you have the energy to engage, and the relationship can handle directness.
            </p>
            <div className="space-y-3 mb-6">
              <div className="bg-card rounded-xl p-4 border border-cta/30">
                <p className="font-bold text-cta uppercase tracking-wider mb-2 text-sm">💬 Name mispronunciation</p>
                <p className="italic text-foreground text-base">"Actually, it is pronounced [correct pronunciation]. I have noticed it has come up a few times — would it help if I wrote it phonetically?"</p>
              </div>
              <div className="bg-card rounded-xl p-4 border border-cta/30">
                <p className="font-bold text-cta uppercase tracking-wider mb-2 text-sm">💬 "Where are you really from?"</p>
                <p className="italic text-foreground text-base">"I was born in [city]. If you are asking about my family background, I am happy to share that — but that is a different question."</p>
              </div>
            </div>

            <h3 className="font-semibold text-base mb-3">Option 2: Name the Pattern Later (Use for Repeat Offenders)</h3>
            <p className="leading-relaxed text-muted-foreground text-base mb-3">
              If the same person keeps making similar comments, address the pattern in a one-on-one conversation.
            </p>
            <div className="space-y-3 mb-6">
              <div className="bg-card rounded-xl p-4 border border-cta/30">
                <p className="font-bold text-cta uppercase tracking-wider mb-2 text-sm">💬 Repeated interruptions</p>
                <p className="italic text-foreground text-base">"I have noticed that in the past few meetings, I have been interrupted a few times while presenting. I do not think it is intentional, but it makes it hard to finish my points. Can we find a way to make sure everyone has space to contribute?"</p>
              </div>
              <div className="bg-card rounded-xl p-4 border border-cta/30">
                <p className="font-bold text-cta uppercase tracking-wider mb-2 text-sm">💬 Assigned admin tasks</p>
                <p className="italic text-foreground text-base">"I have noticed I am often asked to take notes or organize logistics. I am happy to help occasionally, but I want to make sure I have time for strategic work as well. Can we rotate these responsibilities?"</p>
              </div>
            </div>

            <h3 className="font-semibold text-base mb-3">Option 3: Redirect Without Confrontation (Use Often)</h3>
            <p className="leading-relaxed text-muted-foreground text-base mb-3">
              Sometimes the most effective response is to redirect the conversation or reframe the assumption without directly calling it out.
            </p>
            <div className="space-y-3 mb-6">
              <div className="bg-card rounded-xl p-4 border border-cta/30">
                <p className="font-bold text-cta uppercase tracking-wider mb-2 text-sm">💬 Speaking for your culture</p>
                <p className="italic text-foreground text-base">"I can share my perspective, but I cannot speak for everyone from [country/culture]. There is a lot of diversity within any group."</p>
              </div>
              <div className="bg-card rounded-xl p-4 border border-cta/30">
                <p className="font-bold text-cta uppercase tracking-wider mb-2 text-sm">💬 Surprised English compliment</p>
                <p className="italic text-foreground text-base">"Thank you — I have been working in English for years now."</p>
              </div>
            </div>

            <h3 className="font-semibold text-base mb-3">Option 4: Document and Do Nothing Immediately (Use Strategically)</h3>
            <p className="leading-relaxed text-muted-foreground text-base mb-3">
              Some microaggressions are not worth addressing in the moment, but they are worth documenting. Keep a record of what happened, when, and who was present. This helps you recognize patterns and gives you evidence if you later need to escalate.
            </p>

            <h3 className="font-semibold text-base mb-3">Option 5: Decide It Is Not Worth Your Energy (Use When Necessary)</h3>
            <p className="leading-relaxed text-muted-foreground text-base">
              Not every microaggression deserves your time and emotional labor. Sometimes the most strategic choice is to let it go — not because it is acceptable, but because your energy is better spent elsewhere. This is not defeat. It is a conscious decision about where to invest your limited resources.
            </p>
          </section>

          {/* When to Escalate */}
          <section>
            <h2 className="text-xl mb-4 font-semibold">When to Escalate</h2>
            <div className="space-y-3">
              {[
                "It is coming from your manager and affecting your ability to do your job.",
                "It is creating a measurable impact on your career progression — blocked promotions, negative feedback, exclusion from key projects.",
                "You have documentation of a clear pattern over time.",
              ].map((item, i) => (
                <div key={i} className="flex gap-3 bg-card rounded-xl p-4 border border-border/50">
                  <span className="text-destructive font-bold text-base shrink-0 mt-0.5">⚠</span>
                  <p className="text-muted-foreground text-base">{item}</p>
                </div>
              ))}
            </div>
            <p className="leading-relaxed text-muted-foreground mt-4 text-base">
              If you decide to escalate, go to HR or a skip-level manager with specific examples, dates, and the impact on your work. Do not frame it as 'I feel excluded.' Frame it as <strong>'Here is a pattern of behavior that is affecting my ability to contribute effectively.'</strong>
            </p>
          </section>

          {/* When to Leave */}
          <section>
            <h2 className="text-xl mb-4 font-semibold">When to Leave</h2>
            <p className="leading-relaxed text-muted-foreground text-base mb-4">
              Sometimes the healthiest response to chronic microaggressions is to leave. Here are the signs:
            </p>
            <div className="space-y-3">
              {[
                "You have addressed the issue multiple times and nothing has changed.",
                "The behavior is coming from leadership and is therefore unlikely to be addressed.",
                "You are spending more energy managing microaggressions than doing your actual job.",
                "Your mental and physical health are suffering.",
                "You have lost trust in the organization's ability to create a fair environment.",
              ].map((sign, i) => (
                <div key={i} className="flex gap-3 bg-card rounded-xl p-4 border border-border/50">
                  <span className="text-cta font-bold text-sm shrink-0 mt-0.5">{i + 1}.</span>
                  <p className="text-muted-foreground text-base">{sign}</p>
                </div>
              ))}
            </div>
            <p className="leading-relaxed text-muted-foreground mt-4 text-base">
              Leaving is not giving up. It is recognizing that some environments are structurally unsustainable, and your career and wellbeing are worth more than staying in a place that does not value you.
            </p>
          </section>

          {/* Final Thought */}
          <section className="border-t border-border/50 pt-6">
            <h2 className="text-xl mb-3 font-semibold">Final Thought: You Are Not Imagining It</h2>
            <p className="text-muted-foreground leading-relaxed italic text-base">
              One of the most insidious effects of microaggressions is that they make you question your own perception. You are not imagining it. If you feel that something is off, if you notice that the rules seem to apply differently to you, if you are working twice as hard for half the recognition — you are probably right. Trust your instincts. Document what you see. Talk to people you trust. And remember that the problem is not you. The problem is an environment that tolerates behavior that makes certain people work harder just to be seen as equal.
            </p>
          </section>

        </div>
      </article>
    </div>
  );
};

export default ArticleMicroaggressions;
