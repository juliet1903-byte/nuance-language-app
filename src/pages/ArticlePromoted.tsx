import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Tag, AArrowUp, AArrowDown } from "lucide-react";
import articlePromoted from "@/assets/article-promoted.png";
import { useTextSize } from "@/hooks/useTextSize";

const ArticlePromoted = () => {
  const navigate = useNavigate();
  const { textSize, textSizeClass, cycleTextSize } = useTextSize();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/30 px-5 py-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1.5 rounded-lg hover:bg-card transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-semibold truncate text-base flex-1">Why Some People Get Promoted</span>
        <button onClick={cycleTextSize} className="w-10 h-10 flex items-center justify-center rounded-full bg-card hover:bg-accent transition-colors" aria-label="Change text size">
          {textSize === "x-large" ? <AArrowDown className="w-5 h-5" /> : <AArrowUp className="w-5 h-5" />}
        </button>
      </header>

      <article className={`max-w-2xl mx-auto px-5 pb-20 ${textSizeClass}`}>
        {/* Hero */}
        <div className="relative -mx-5 mb-8">
          <img src={articlePromoted} alt="Why some people get promoted" className="w-full h-56 md:h-72 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-5 right-5">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-sm text-white px-2.5 py-1 rounded-md mb-2">
              <Tag className="w-3 h-3" /> Article
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">Why Some People Get Promoted and Others Don't</h1>
          </div>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-8">
          <span className="flex items-center gap-1 text-sm"><Clock className="w-3.5 h-3.5" /> 12 min read</span>
          <span className="bg-card px-2.5 py-1 rounded-full font-medium text-sm">Career</span>
        </div>

        {/* Lead */}
        <p className="text-base md:text-lg leading-relaxed mb-8 font-medium border-l-2 border-cta pl-4 text-secondary-foreground">
          What actually determines career progression in international companies — and what you can do about it.
        </p>

        <div className="space-y-8 text-foreground">

          {/* Intro */}
          <section>
            <p className="leading-relaxed text-muted-foreground text-base">
              In most international companies, there are people who have been at the same level for five years. They are excellent at their jobs. They deliver on time. They help onboard new team members. They contribute consistently. And yet, when promotion cycles come around, they are passed over — again.
            </p>
            <p className="leading-relaxed text-muted-foreground mt-4 text-base">
              At the same time, there are people who get promoted every 18–24 months. They are not always the strongest individual contributors. They do not always work the longest hours. But when decisions are being made about who moves up, their names come up first.
            </p>
            <p className="leading-relaxed text-muted-foreground mt-4 text-base">
              The difference is rarely technical skill. It is <strong>visibility, narrative, and timing</strong>. The people who get promoted are not necessarily better at their jobs — they are better at making their work visible, articulating their impact in terms that matter to decision-makers, and knowing when and how to ask for what they want.
            </p>
          </section>

          {/* The Uncomfortable Truth */}
          <section>
            <h2 className="text-xl mb-4 font-semibold">The Uncomfortable Truth About Promotions</h2>
            <p className="leading-relaxed text-muted-foreground text-base">
              Promotions in IT are not a reward for past performance. They are a bet on future impact at the next level. The question being asked is not 'Has this person done their current job well?' The question is: <strong>'Can this person operate effectively at the next level, and do we trust them to do so?'</strong>
            </p>
            <p className="leading-relaxed text-muted-foreground mt-4 text-base">
              That distinction matters because it explains why being excellent at your current job does not automatically lead to promotion. If you are a senior analyst who produces excellent reports and mentors junior team members, that is proof you are good at being a senior analyst. It is not proof you can operate at the principal level.
            </p>
            <div className="bg-cta/10 border border-cta/20 rounded-xl p-4 mt-4">
              <p className="font-medium text-foreground text-base">
                Promotion is not a reward for doing your current job well. It is recognition that you are already operating at the next level.
              </p>
            </div>
          </section>

          {/* Three Reasons */}
          <section>
            <h2 className="text-xl mb-4 font-semibold">The Three Reasons Excellence in Your Role Is Not Enough</h2>

            <h3 className="font-semibold text-base mb-3">1. Your Work Is Not Visible to the People Who Decide</h3>
            <p className="leading-relaxed text-muted-foreground text-base mb-4">
              Most people assume that good work speaks for itself. It does not. If you deliver a complex project that prevents a major business risk, but the only people who know about it are your immediate team, that work has no impact on promotion decisions.
            </p>
            <div className="bg-card rounded-xl p-4 border border-border/50 mb-6">
              <p className="font-bold text-muted-foreground uppercase tracking-wider mb-2 text-sm">⚠️ Common mistake</p>
              <p className="text-muted-foreground text-base">Waiting for your manager to notice your work. Your job is to make it easy for them to advocate for you by providing clear, concrete examples of impact they can repeat in promotion discussions.</p>
            </div>

            <h3 className="font-semibold text-base mb-3">2. You Cannot Articulate Your Impact in Terms That Matter</h3>
            <p className="leading-relaxed text-muted-foreground text-base mb-4">
              People tend to describe their work in functional terms. These statements are functionally accurate, but they do not communicate impact to senior decision-makers.
            </p>
            <div className="space-y-3 mb-6">
              <div className="bg-card rounded-xl p-4 border border-border/50">
                <p className="font-bold text-muted-foreground uppercase tracking-wider mb-2 text-sm">❌ Technical framing</p>
                <p className="italic text-muted-foreground text-base">"I migrated the legacy monolith to microservices and containerized everything with Docker and Kubernetes."</p>
              </div>
              <div className="bg-card rounded-xl p-4 border border-cta/30">
                <p className="font-bold text-cta uppercase tracking-wider mb-2 text-sm">✅ Impact framing</p>
                <p className="italic text-foreground text-base">"The monolith was blocking our ability to ship features independently. I led the migration to microservices, which reduced our deployment cycle from two weeks to two days and allowed us to scale the checkout service separately during peak traffic."</p>
              </div>
            </div>

            <h3 className="font-semibold text-base mb-3">3. You Are Not Operating Visibly at the Next Level</h3>
            <p className="leading-relaxed text-muted-foreground text-base mb-4">
              The most common reason people get stuck is that they wait for the promotion before they start doing next-level work. But promotion committees think the opposite.
            </p>
            <div className="space-y-2 mb-4">
              {[
                { level: "Senior", action: "Start mentoring junior team members, lead a project end-to-end, contribute to strategic discussions." },
                { level: "Principal", action: "Write strategy documents other teams use, influence cross-functional process decisions." },
                { level: "Director", action: "Define strategy for a domain, represent your function in senior leadership discussions." },
                { level: "VP", action: "Set organizational direction, build alignment across the executive team." },
              ].map((item) => (
                <div key={item.level} className="bg-card rounded-xl p-4 border border-border/50">
                  <p className="text-base font-medium">{item.level}</p>
                  <p className="text-muted-foreground mt-1 text-base">{item.action}</p>
                </div>
              ))}
            </div>
          </section>

          {/* The Promotion Conversation */}
          <section>
            <h2 className="text-xl mb-4 font-semibold">The Promotion Conversation: How to Actually Ask</h2>

            <div className="space-y-3 mb-6">
              <h3 className="font-semibold text-base">Step 1: Frame It as a Development Conversation</h3>
              <div className="bg-card rounded-xl p-4 border border-border/50">
                <p className="font-bold text-muted-foreground uppercase tracking-wider mb-2 text-sm">❌ Demanding</p>
                <p className="italic text-muted-foreground text-base">"I think I deserve a promotion."</p>
              </div>
              <div className="bg-card rounded-xl p-4 border border-cta/30">
                <p className="font-bold text-cta uppercase tracking-wider mb-2 text-sm">✅ Collaborative</p>
                <p className="italic text-foreground text-base">"I'd love to talk about where I'm heading here and what the path to the next level looks like."</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <h3 className="font-semibold text-base">Step 2: Make the Case With Evidence</h3>
              <div className="bg-cta/10 border border-cta/20 rounded-xl p-4">
                <p className="text-foreground text-base">
                  "Over the past [time period], I've taken on [X responsibility] and delivered [Y outcome]. For example: I led the database migration project, which reduced query latency by 50% and unblocked the mobile team's roadmap for Q3."
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-base">Step 3: Ask for a Roadmap If the Answer Is Not Yet</h3>
              <div className="bg-card rounded-xl p-4 border border-border/50">
                <p className="font-bold text-muted-foreground uppercase tracking-wider mb-2 text-sm">❌ Accepting vagueness</p>
                <p className="italic text-muted-foreground text-base">"Okay, I understand. I'll keep working hard and we can revisit this later."</p>
              </div>
              <div className="bg-card rounded-xl p-4 border border-cta/30">
                <p className="font-bold text-cta uppercase tracking-wider mb-2 text-sm">✅ Asking for clarity</p>
                <p className="italic text-foreground text-base">"I understand the timing isn't right now — can we define what 'ready' looks like? What would I need to demonstrate in the next review cycle for this to be a clear yes?"</p>
              </div>
            </div>
          </section>

          {/* International Workers */}
          <section>
            <h2 className="text-xl mb-4 font-semibold">Why International Workers Face Additional Barriers</h2>
            <div className="space-y-3">
              {[
                "Communication style differences are often misread as lack of confidence or leadership.",
                "Visibility requires comfort with self-promotion, which varies enormously across cultures.",
                "Informal influence happens in conversations you are not part of — after meetings, in Slack threads, over lunch.",
              ].map((item, i) => (
                <div key={i} className="flex gap-3 bg-card rounded-xl p-4 border border-border/50">
                  <span className="text-cta font-bold text-sm shrink-0 mt-0.5">{i + 1}.</span>
                  <p className="text-muted-foreground leading-relaxed text-base">{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Red Flags */}
          <section>
            <h2 className="text-xl mb-4 font-semibold">Red Flags: When You Should Stop Waiting</h2>
            <div className="space-y-3">
              {[
                "Your manager cannot give you specific criteria for promotion, even when asked directly.",
                "People at your level in other teams have been promoted, but you have not — and the reason given is vague.",
                "You have been told you are 'already operating at the next level' but there is no timeline for making it official.",
                "The company is in a hiring freeze and promotions have been paused indefinitely.",
                "Your manager privately agrees you deserve promotion but says it is being blocked by senior leadership.",
              ].map((sign, i) => (
                <div key={i} className="flex gap-3 bg-card rounded-xl p-4 border border-border/50">
                  <span className="text-destructive font-bold text-base shrink-0 mt-0.5">⚠</span>
                  <p className="text-muted-foreground text-base">{sign}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Practical Steps */}
          <section>
            <h2 className="text-xl mb-4 font-semibold">Practical Steps You Can Take This Month</h2>
            <ul className="space-y-2 text-muted-foreground">
              {[
                "Schedule a one-on-one with your manager specifically to discuss career progression. Ask: 'What does the path to the next level look like?'",
                "Identify one responsibility at the next level and start doing it visibly.",
                "Create a promotion document for yourself — list your major contributions, translate them into business impact, and share it with your manager.",
                "Find out who the decision-makers are for promotions. Make sure your work is visible to them.",
                "If promotion criteria are opaque, start interviewing. The experience will tell you your market value.",
              ].map((item, i) => (
                <li key={i} className="flex gap-2 text-base"><span className="text-cta font-bold shrink-0">→</span>{item}</li>
              ))}
            </ul>
          </section>

          {/* Final Thought */}
          <section className="border-t border-border/50 pt-6">
            <h2 className="text-xl mb-3 font-semibold">Final Thought</h2>
            <p className="text-muted-foreground leading-relaxed italic text-base">
              The engineers who get promoted are not always the best engineers. They are the engineers who understand that promotion is a political and social process as much as it is a technical one. If you are stuck at the same level, the answer is almost never 'you are not good enough.' The answer is usually 'you have not made it easy for the people who decide to say yes.'
            </p>
            <p className="text-xs text-muted-foreground mt-4">— Based on insights from The Career Playbook</p>
          </section>

        </div>
      </article>
    </div>
  );
};

export default ArticlePromoted;
