import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Tag, AArrowUp } from "lucide-react";
import articleConversations from "@/assets/article-conversations.png";
import { useTextSize } from "@/hooks/useTextSize";

const ArticleConversations = () => {
  const navigate = useNavigate();
  const { textSizeClass, cycleTextSize } = useTextSize();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/30 px-5 py-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1.5 rounded-lg hover:bg-card transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-semibold truncate text-base flex-1">The Conversations Most People Avoid</span>
        <button onClick={cycleTextSize} className="p-1.5 rounded-lg hover:bg-card transition-colors" aria-label="Increase text size">
          <AArrowUp className="w-5 h-5" />
        </button>
      </header>

      <article className="max-w-2xl mx-auto px-5 pb-20">
        <div className="relative -mx-5 mb-8">
          <img src={articleConversations} alt="Difficult conversations" className="w-full h-56 md:h-72 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-5 right-5">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-sm text-white px-2.5 py-1 rounded-md mb-2">
              <Tag className="w-3 h-3" /> Article
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">The Conversations Most People Avoid</h1>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-8">
          <span className="flex items-center gap-1 text-sm"><Clock className="w-3.5 h-3.5" /> 9 min read</span>
          <span className="bg-card px-2.5 py-1 rounded-full font-medium text-sm">Communication</span>
        </div>

        <p className="text-base md:text-lg leading-relaxed mb-8 font-medium border-l-2 border-cta pl-4 text-secondary-foreground">
          How to address conflict directly without destroying the relationship.
        </p>

        <div className="space-y-8 text-foreground">
          <section>
            <p className="leading-relaxed text-muted-foreground text-base">
              The most important conversations in your career are usually the ones you least want to have. Telling a colleague their behavior is affecting the team. Pushing back on a decision you think is wrong. Addressing a pattern that has been happening for months but nobody has named.
            </p>
            <p className="leading-relaxed text-muted-foreground mt-4 text-base">
              But avoiding them is riskier. The unaddressed issue does not disappear. It festers. It affects your work, your stress levels, and eventually your willingness to stay in the role.
            </p>
          </section>

          <section>
            <h2 className="text-xl mb-4 font-semibold">Why Difficult Conversations Go Wrong</h2>
            <p className="text-muted-foreground mb-4 text-base">Most difficult conversations fail for one of three reasons:</p>
            <div className="space-y-3">
              {[
              { label: "You wait too long", desc: "By the time you raise the issue, you are already resentful. The other person hears anger rather than concern." },
              { label: "You avoid being specific", desc: "You say 'your communication style isn't working' instead of 'in the last three meetings, you interrupted me while I was explaining the technical approach.'" },
              { label: "You focus on the person rather than the behavior", desc: "You say 'you are difficult to work with' instead of 'when deadlines slip without warning, it creates problems for the rest of the team.'" }].
              map((item) =>
              <div key={item.label} className="bg-card rounded-xl p-4 border border-border/50">
                  <p className="text-base font-medium">{item.label}</p>
                  <p className="text-muted-foreground mt-1 text-base">{item.desc}</p>
                </div>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-xl mb-4 font-semibold">Framework 1: What-Why-Next</h2>
            <p className="text-muted-foreground mb-4 text-base">The simplest and most versatile framework. It works for quick feedback, recurring issues, and situations where you need to be direct but not heavy-handed.</p>
            <div className="space-y-3">
              <div className="bg-card rounded-xl p-4 border border-border/50">
                <p className="font-semibold text-cta text-base">What happened</p>
                <p className="text-muted-foreground mt-1 italic text-base">"During Tuesday's standup, when the timeline question came up, you said 'that's not my problem' and moved on."</p>
              </div>
              <div className="bg-card rounded-xl p-4 border border-border/50">
                <p className="font-semibold text-cta text-base">Why it mattered</p>
                <p className="text-muted-foreground mt-1 italic text-base">"People stopped asking clarifying questions for the rest of the meeting, and two people came to me afterwards feeling unsure about next steps."</p>
              </div>
              <div className="bg-card rounded-xl p-4 border border-border/50">
                <p className="font-semibold text-cta text-base">What next</p>
                <p className="text-muted-foreground mt-1 italic text-base">"Going forward, even something like 'I don't have that answer right now, but I can find out' would help the team feel like they can ask without getting shut down."</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl mb-4 font-semibold">Framework 2: DESC</h2>
            <p className="text-muted-foreground mb-4 text-base">Use this when the feedback is formal, the issue is recurring, or you need a clear outcome.</p>
            <div className="space-y-3">
              {[
              { step: "Describe", text: "Over the past three sprints, the documentation updates have been submitted 2-3 days after the sprint close." },
              { step: "Express", text: "This creates a problem for me because I can't finalize the release notes until the documentation is complete." },
              { step: "Specify", text: "I'd like the documentation to be submitted at least 24 hours before the sprint closes." },
              { step: "Consequences", text: "If we can make that work, the release process becomes much smoother. If it keeps slipping, I'll need to escalate the timeline risk." }].
              map((item) =>
              <div key={item.step} className="bg-card rounded-xl p-4 border border-border/50">
                  <p className="font-semibold text-base">{item.step}</p>
                  <p className="text-muted-foreground mt-1 text-base">{item.text}</p>
                </div>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-xl mb-4 font-semibold">Framework 3: The Contrast Method</h2>
            <p className="text-muted-foreground mb-4 text-base">Works when there is an obvious gap between what was agreed and what actually happened.</p>
            <div className="bg-cta/10 border border-cta/20 rounded-xl p-4 mb-4">
              <p className="font-medium text-foreground text-base">
                Structure: I expected [X], but what I saw was [Y]. Here's why that matters: [impact]. Going forward, [request].
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl mb-4 font-semibold">The Most Common Mistake: Defending Your Intent</h2>
            <p className="text-muted-foreground leading-relaxed mb-4 text-base">
              When someone tells you that something you said caused harm, the instinct is to defend your intent. The problem is that it centers your discomfort over their experience.
            </p>
            <div className="space-y-3">
              <div className="bg-card rounded-xl p-4 border border-border/50">
                <p className="font-bold text-muted-foreground uppercase tracking-wider mb-2 text-sm">❌ Defending intent first</p>
                <p className="italic text-muted-foreground text-base">"I'm not sexist — I didn't mean it like that. You've misunderstood what I was trying to say."</p>
              </div>
              <div className="bg-card rounded-xl p-4 border border-cta/30">
                <p className="font-bold text-cta uppercase tracking-wider mb-2 text-sm">✅ Acknowledging impact first</p>
                <p className="italic text-foreground text-base">"That wasn't my intention — and I can see how it landed. I'm sorry. I'll be more careful. Let me explain what I was trying to say, and you can tell me if that changes how it felt."</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl mb-4 font-semibold">How to Start Without Escalating</h2>
            <p className="text-muted-foreground mb-4 text-base">The opening sets the tone for everything that follows. Here are openers that work:</p>
            <div className="space-y-3">
              {[
              '"I want to clear something up — I think there might be a misunderstanding between us."',
              '"I\'m raising this because I don\'t want it to become a bigger thing."',
              '"Can I share an observation — it\'s something I\'ve noticed more than once."',
              '"I may have contributed to this situation — can we start from there?"'].
              map((phrase, i) =>
              <div key={i} className="bg-card rounded-xl p-4 border border-border/50 text-base text-foreground italic">
                  {phrase}
                </div>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-xl mb-4 font-semibold">When the Other Person Gets Defensive</h2>
            <p className="text-muted-foreground mb-4 text-base">Your job is not to match their energy. It is to stay calm, restate what you need, and give them space:</p>
            <div className="space-y-3">
              {[
              '"I can see this has landed badly — that wasn\'t my intention. Can we take a step back and talk about what the actual issue is?"',
              '"I\'m not trying to attack you. I\'m trying to address a pattern that\'s affecting the team. Can we focus on that?"',
              '"If this isn\'t a good time, we can come back to it. But I do need us to talk about it at some point."'].
              map((phrase, i) =>
              <div key={i} className="bg-card rounded-xl p-4 border border-border/50 text-base text-foreground italic">
                  {phrase}
                </div>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-xl mb-4 font-semibold">The Conversations You Should Not Have</h2>
            <div className="space-y-3">
              {[
              "The behavior happened once and is unlikely to repeat.",
              "You are too angry to have the conversation constructively.",
              "The issue is fundamentally about personal style, not performance.",
              "You do not have standing to raise it."].
              map((item, i) =>
              <div key={i} className="flex gap-2 text-base text-muted-foreground">
                  <span className="text-foreground font-bold shrink-0">•</span>{item}
                </div>
              )}
            </div>
          </section>

          <section className="border-t border-border/50 pt-6">
            <p className="text-muted-foreground leading-relaxed italic text-base">
              Difficult conversations are a skill, not a trait. The more you practice, the better you get. The alternative is to avoid them entirely — and watch as small issues become large ones, fixable problems become entrenched, and relationships deteriorate because nobody was willing to name what was happening.
            </p>
            <p className="text-xs text-muted-foreground mt-3">
</p>
          </section>
        </div>
      </article>
    </div>);
};

export default ArticleConversations;