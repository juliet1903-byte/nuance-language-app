import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import articleBurnout from "@/assets/article-burnout.png";

const ArticleBurnout = () => {
  const navigate = useNavigate();

  const earlyWarnings = [
  "You stop volunteering for things. You used to raise your hand for new projects, offer to help with side tasks. Now you wait to be asked — and sometimes you hope you are not asked at all.",
  "Your communication becomes transactional. Emails that used to start warmly now start with the request and end with nothing.",
  "You stop contributing in meetings unless directly asked. You sit quietly, contribute when called on, and leave as soon as the meeting ends.",
  "Small frustrations feel disproportionately large. A meeting that runs ten minutes over now feels unbearable.",
  "You fantasise about leaving, but you do not take any concrete steps. The fantasy provides temporary relief but no actual change."];


  const irreversibleSigns = [
  "You feel nothing when you achieve something that used to matter to you. A project ships, a client is happy — and you feel numb.",
  "You are irritable with people you care about, even outside of work.",
  "You are making mistakes you would not normally make. Missing deadlines, forgetting commitments, sending messages to the wrong person.",
  "You fantasise about catastrophic events that would force you to stop — anything that would give you permission to stop without it being your choice."];


  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Back header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/30 px-5 py-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1.5 rounded-lg hover:bg-card transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-semibold truncate text-base">Quiet Cracking or Burning Out?</span>
      </header>

      <article className="max-w-2xl mx-auto px-5 pb-20">
        {/* Hero image */}
        <div className="relative -mx-5 mb-8">
          <img src={articleBurnout} alt="Burnout article" className="w-full h-56 md:h-72 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-5 right-5">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-sm text-white px-2.5 py-1 rounded-md mb-2">
              <Tag className="w-3 h-3" /> Article
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">Quiet Cracking or Burning Out?</h1>
          </div>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-8">
          <span className="flex items-center gap-1 text-sm"><Clock className="w-3.5 h-3.5" /> 7 min read</span>
          <span className="bg-card px-2.5 py-1 rounded-full font-medium text-sm">Wellbeing</span>
        </div>

        {/* Lead */}
        <p className="text-base md:text-lg leading-relaxed mb-8 font-medium border-l-2 border-cta pl-4 text-secondary-foreground">
          How to recognise when you're burning out — and what to say before it's too late.
        </p>

        <div className="space-y-8 text-foreground">

          <section>
            <p className="leading-relaxed text-muted-foreground text-base">
              Burnout does not announce itself. It does not arrive as a single catastrophic moment. For most people, burnout is a slow accumulation of unaddressed stress, unrealistic expectations, and the repeated suppression of the instinct to say no.
            </p>
            <p className="leading-relaxed text-muted-foreground mt-4 text-base">
              The term 'quiet quitting' became popular in 2022 to describe people who do the minimum required by their job and nothing more. But the phrase misses the point. What most people call quiet quitting is actually <strong>quiet cracking</strong> — the visible symptoms of burnout that show up long before someone consciously decides to disengage.
            </p>
          </section>

          <section>
            <h2 className="text-xl mb-4 font-semibold">The Early Warning Signs</h2>
            <p className="text-muted-foreground mb-4 text-base">Burnout does not start with exhaustion. It starts with subtle changes in behaviour:</p>
            <div className="space-y-3">
              {earlyWarnings.map((sign, i) =>
              <div key={i} className="flex gap-3 bg-card rounded-xl p-4 border border-border/50">
                  <span className="text-cta font-bold text-sm shrink-0 mt-0.5">{i + 1}.</span>
                  <p className="text-muted-foreground leading-relaxed text-base">{sign}</p>
                </div>
              )}
            </div>
            <div className="bg-cta/10 border border-cta/20 rounded-xl p-4 mt-4">
              <p className="font-medium text-foreground text-base">
                Burnout is not laziness. It is what happens when the cost of continuing exceeds the energy you have left to pay it.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl mb-3 font-semibold">Why Professional Culture Makes It Hard to Raise Burnout</h2>
            <p className="text-muted-foreground leading-relaxed mb-4 text-base">
              Professional norms actively discourage naming burnout. Saying 'I am burned out' in most workplaces is interpreted as one of three things:
            </p>
            <div className="space-y-2">
              {[
              { label: "A performance issue", desc: "You cannot handle the workload that others are managing fine." },
              { label: "A lack of commitment", desc: "You are not willing to do what it takes to succeed here." },
              { label: "A personal problem", desc: "You should handle this outside of work hours." }].
              map((item) =>
              <div key={item.label} className="bg-card rounded-xl p-4 border border-border/50">
                  <p className="text-base font-medium">{item.label}</p>
                  <p className="text-muted-foreground mt-1 text-base">{item.desc}</p>
                </div>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-xl mb-3 font-semibold">What to Say to Your Manager</h2>
            <p className="text-muted-foreground leading-relaxed mb-4 text-base">
              Frame it as a structural issue, not a personal one. The key is proposing a solution alongside the problem.
            </p>

            <div className="space-y-3 mb-6">
              <h3 className="font-semibold text-base">1. Name the Situation, Not the Feeling</h3>
              <div className="bg-card rounded-xl p-4 border border-border/50">
                <p className="font-bold text-muted-foreground uppercase tracking-wider mb-2 text-sm">❌ Weak opening</p>
                <p className="italic text-muted-foreground text-base">"I'm really struggling at the moment. I feel completely overwhelmed and I don't think I can keep this up."</p>
              </div>
              <div className="bg-card rounded-xl p-4 border border-cta/30">
                <p className="font-bold text-cta uppercase tracking-wider mb-2 text-sm">✅ Strong opening</p>
                <p className="italic text-foreground text-base">"I want to talk about the current workload. Over the past two months, I've taken on [X], [Y], and [Z emergency fix], and I'm now working evenings and weekends to keep up. That pace is not sustainable, and I want to find a way to reset expectations before it affects the quality of my work."</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <h3 className="font-semibold text-base">2. Propose a Solution, Not Just a Problem</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2 text-base"><span className="text-foreground">•</span> "Can we deprioritise [X] or push [Y] to next quarter?"</li>
                <li className="flex gap-2 text-base"><span className="text-foreground">•</span> "I'd like to hand off [Z task] to someone else so I can focus on the higher-impact work."</li>
                <li className="flex gap-2 text-base"><span className="text-foreground">•</span> "Can we limit my meeting load to mornings only for the next month?"</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-base">3. Make It Clear This Is Time-Sensitive</h3>
              <div className="bg-card rounded-xl p-4 border border-border/50">
                <p className="font-bold text-muted-foreground uppercase tracking-wider mb-2 text-sm">❌ Low urgency (will be ignored)</p>
                <p className="italic text-muted-foreground text-base">"At some point we should probably talk about workload. Let me know when you have time."</p>
              </div>
              <div className="bg-card rounded-xl p-4 border border-cta/30">
                <p className="font-bold text-cta uppercase tracking-wider mb-2 text-sm">✅ High urgency (will be prioritised)</p>
                <p className="italic text-foreground text-base">"I'd like to talk about this in our next one-to-one — or sooner if possible. I'm at the point where I need to make a change in the next two weeks or the quality of my work will start to slip."</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl mb-3 font-semibold">What to Say When a Colleague Is Burning Out</h2>
            <div className="space-y-3">
              {[
              "'I've noticed you seem quieter in meetings lately — is everything okay?' — Opens the door without assuming.",
              "'I noticed you've been working late a lot. Is there something I can take off your plate this week?' — Concrete, immediate offer.",
              "'I've been in that place before and I know how hard it is. If you want to talk it through, I'm here — no advice, just listening.' — Acknowledges without pressuring."].
              map((phrase, i) =>
              <div key={i} className="bg-card rounded-xl p-4 border border-border/50 text-base text-foreground leading-relaxed">
                  {phrase}
                </div>
              )}
            </div>
            <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 mt-4">
              <p className="font-bold text-accent uppercase tracking-wider mb-1 text-sm">Important</p>
              <p className="text-muted-foreground text-base">Do not ask 'Are you burned out?' Most people will reflexively say no, even when the answer is yes. Ask about behaviour or offer concrete help instead.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl mb-3 font-semibold">The Language of Boundaries: Saying No Before You Break</h2>
            <div className="space-y-2">
              {[
              "'I'd love to help with this, but I'm at capacity right now. Can we revisit it in two weeks, or is there someone else who could take it on?'",
              "'I can't take on another project without dropping something else. If this is the priority, what should I deprioritise?'",
              "'I'm not able to commit to that timeline. If we push it out by a week, I can do it properly.'"].
              map((phrase, i) =>
              <div key={i} className="bg-card rounded-xl p-4 border border-border/50 text-sm text-foreground italic">
                  {phrase}
                </div>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-xl mb-3 font-semibold">When It's Too Late: Signs of Irreversible Burnout</h2>
            <div className="space-y-3">
              {irreversibleSigns.map((sign, i) =>
              <div key={i} className="flex gap-3 bg-card rounded-xl p-4 border border-border/50">
                  <span className="text-destructive font-bold text-sm shrink-0 mt-0.5">⚠</span>
                  <p className="text-muted-foreground text-base">{sign}</p>
                </div>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-xl mb-3 font-semibold">What Recovery Actually Looks Like</h2>
            <p className="text-muted-foreground leading-relaxed mb-4 text-base">
              Recovering from burnout is not a weekend off. Recovery from serious burnout takes months, not days, and requires structural change:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
              "A significant reduction in workload for at least 8–12 weeks — sustained, not temporary.",
              "Protected time where you are not expected to be available — entire days genuinely offline.",
              "A change in what you are working on. If the work itself is the source, doing less of it won't fix the problem.",
              "External support — a coach, therapist, or trusted mentor."].
              map((item, i) =>
              <li key={i} className="flex gap-2 text-base"><span className="text-cta font-bold shrink-0">→</span>{item}</li>
              )}
            </ul>
          </section>

          <section className="border-t border-border/50 pt-6">
            <p className="text-muted-foreground leading-relaxed italic text-base">
              You cannot prevent burnout by working harder or being more resilient. You prevent it by recognising the early signs, naming the problem clearly, and making changes before the damage becomes permanent.
            </p>
            <p className="text-xs text-muted-foreground mt-3">​</p>
          </section>

        </div>
      </article>
    </div>);

};

export default ArticleBurnout;