import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Tag, AArrowUp } from "lucide-react";
import articleWarmIntro from "@/assets/article-warm-intro.png";
import { useTextSize } from "@/hooks/useTextSize";

const ArticleWarmIntro = () => {
  const navigate = useNavigate();
  const { textSizeClass, cycleTextSize } = useTextSize();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Back header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/30 px-5 py-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1.5 rounded-lg hover:bg-card transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="truncate text-base font-medium text-secondary-foreground flex-1">The Art of the Warm Intro</span>
        <button onClick={cycleTextSize} className="p-1.5 rounded-lg hover:bg-card transition-colors" aria-label="Increase text size">
          <AArrowUp className="w-5 h-5" />
        </button>
      </header>

      <article className="max-w-2xl mx-auto px-5 pb-20">
        {/* Hero image */}
        <div className="relative -mx-5 mb-8">
          <img src={articleWarmIntro} alt="The Art of the Warm Intro" className="w-full h-56 md:h-72 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-5 right-5">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-sm text-white px-2.5 py-1 rounded-md mb-2">
              <Tag className="w-3 h-3" /> Article
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">The Art of the Warm Intro</h1>
          </div>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-8">
          <span className="flex items-center gap-1 text-sm"><Clock className="w-3.5 h-3.5" /> 5 min read</span>
          <span className="bg-card px-2.5 py-1 rounded-full font-medium text-sm">Networking</span>
        </div>

        {/* Lead */}
        <p className="text-base md:text-lg leading-relaxed mb-8 font-medium border-l-2 border-cta pl-4 text-secondary-foreground">
          How to introduce people professionally — and why cold LinkedIn messages fail.
        </p>

        <div className="prose prose-sm md:prose-base max-w-none space-y-8 text-foreground">

          <section>
            <p className="leading-relaxed text-muted-foreground text-base">
              The ability to introduce two people effectively is one of the most underrated professional skills. A strong introduction creates value for both parties, builds your reputation as a connector, and opens doors that cold outreach never will. A weak introduction — or worse, a LinkedIn message sent without context — wastes everyone's time and damages your credibility.
            </p>
            <p className="leading-relaxed text-muted-foreground mt-4 text-base">
              This article breaks down what makes an introduction work, how to write one that people actually act on, and when to say no to an introduction request. The difference between a warm intro and a cold message is not just tone — it's whether you've done the work to understand why the connection matters.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">Why Warm Introductions Matter</h2>
            <p className="leading-relaxed text-muted-foreground text-base">
              In most professional environments, your network is built through introductions, not through cold outreach. The reason is simple: trust is not transitive, but it is transferable. When someone you respect introduces you to someone else, that introduction carries an implicit endorsement. The person being introduced is worth your time because someone you trust has already vetted them.
            </p>
            <p className="leading-relaxed text-muted-foreground mt-4 text-base">
              Cold messages on LinkedIn or email lack this signal. The recipient has no reason to prioritise your message over the fifty others they received that week. Even if your message is well-written, the absence of a mutual connection means the recipient is taking a risk by engaging with you. Most people, especially senior people, will not take that risk unless the upside is obvious and immediate.
            </p>
            <div className="bg-cta/10 border border-cta/20 rounded-xl p-4 mt-4">
              <p className="text-sm font-semibold text-cta">💡 Key insight</p>
              <p className="text-foreground mt-1 text-base">A warm introduction answers the question 'Why should I care?' before the recipient has to ask it.</p>
            </div>
            <p className="leading-relaxed text-muted-foreground mt-4 text-base">
              The strategic advantage of warm introductions is this: you are remembered not just for what you do, but for who you connect. If you introduce two people and they create something valuable together, both of them remember you as the person who made it possible. This is how professional capital compounds over time.
            </p>
          </section>

          <section>
            <h2 className="text-xl mb-3 font-semibold">The Anatomy of a Strong Introduction</h2>
            <p className="leading-relaxed text-muted-foreground text-base">
              A strong introduction has three elements: context, value, and a clear ask. Each element serves a specific function.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-3">1. Context — Why This Introduction Exists</h3>
            <p className="leading-relaxed text-muted-foreground mb-4 text-base">
              The first thing the recipient needs to know is: why are these two people being introduced? If the answer is not immediately clear from the subject line and first sentence, the introduction has already failed.
            </p>
            <div className="space-y-3">
              <div className="bg-card rounded-xl p-4 border border-border/50">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">❌ Weak</p>
                <p className="italic text-muted-foreground text-base">"Hi [Name], I'd like to introduce you to [Name]. They work in tech and I thought you might have overlapping interests."</p>
              </div>
              <div className="bg-card rounded-xl p-4 border border-cta/30">
                <p className="text-xs font-bold text-cta uppercase tracking-wider mb-2">✅ Strong</p>
                <p className="italic text-foreground text-base">"Hi [Name], I'm introducing you to [Name], who is leading a project on API security at [Company] — an area I know you've been thinking about for your own infrastructure."</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-3">2. Value — What Each Person Gains</h3>
            <p className="leading-relaxed text-muted-foreground mb-4 text-base">
              A strong introduction explains what each person stands to gain from the connection. This is not about selling someone — it is about making the value exchange explicit so that both parties know what the conversation could be about.
            </p>
            <div className="space-y-3">
              <div className="bg-card rounded-xl p-4 border border-border/50">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">💼 Weak value prop</p>
                <p className="italic text-muted-foreground text-base">"[Name A] is an expert in machine learning. [Name B] is working on an ML project. I think you should connect."</p>
              </div>
              <div className="bg-card rounded-xl p-4 border border-cta/30">
                <p className="text-xs font-bold text-cta uppercase tracking-wider mb-2">💼 Strong value prop</p>
                <p className="italic text-foreground text-base">"[Name A] has been through three ML deployment cycles at scale and might have useful perspectives on the latency issues you mentioned last week. [Name B] is currently solving a similar problem and would benefit from hearing how you approached it."</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-3">3. A Clear Ask — What Happens Next</h3>
            <p className="leading-relaxed text-muted-foreground mb-4 text-base">
              Strong introductions end with a clear next step. Weak introductions end with 'Let me know if you'd like to connect!' and leave the recipient to figure out what that means.
            </p>
            <div className="space-y-3">
              <div className="bg-card rounded-xl p-4 border border-border/50">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">❌ Weak</p>
                <p className="italic text-muted-foreground text-base">"Let me know if you'd be open to a call sometime."</p>
              </div>
              <div className="bg-card rounded-xl p-4 border border-cta/30">
                <p className="text-xs font-bold text-cta uppercase tracking-wider mb-2">✅ Strong</p>
                <p className="italic text-foreground text-base">"If this sounds useful, I can make an intro over email. If not, no worries at all — I know your calendar is full."</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl mb-3 font-semibold">When to Say No to an Introduction Request</h2>
            <p className="leading-relaxed text-muted-foreground mb-4 text-base">
              Not every introduction request should be honoured. Saying yes to a weak introduction request damages your relationship with the person being introduced to, because you are asking them to take time for something you have not properly vetted.
            </p>
            <p className="font-semibold mb-2">Say no when:</p>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li className="flex gap-2 text-base"><span className="text-foreground font-bold shrink-0">•</span> You don't know one of the parties well enough to vouch for them.</li>
              <li className="flex gap-2 text-base"><span className="text-foreground font-bold shrink-0">•</span> The value exchange is one-sided — the introduction only benefits one party.</li>
              <li className="flex gap-2 text-base"><span className="text-foreground font-bold shrink-0">•</span> You have not asked permission from both parties first.</li>
            </ul>
            <div className="bg-card rounded-xl p-4 border border-border/50 mt-4">
              <p className="text-muted-foreground italic text-base">If you cannot explain why the introduction is valuable in two sentences, you have not thought about it enough to make it.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl mb-3 font-semibold">The Double Opt-In</h2>
            <p className="leading-relaxed text-muted-foreground mb-4 text-base">
              The double opt-in is the standard method for professional introductions. It works like this:
            </p>
            <ol className="space-y-2 text-sm text-muted-foreground list-none">
              <li className="flex gap-3 text-base"><span className="bg-cta text-cta-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span> Message Person A asking if they're open to the intro, with specific reason.</li>
              <li className="flex gap-3 text-base"><span className="bg-cta text-cta-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span> If A says yes, message Person B with the same structure.</li>
              <li className="flex gap-3 text-base"><span className="bg-cta text-cta-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span> If both say yes, make the introduction with full context for both parties.</li>
              <li className="flex gap-3 text-base"><span className="bg-cta text-cta-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">4</span> If either says no or does not respond, do not make the introduction.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl mb-3 font-semibold">Common Mistakes That Destroy Credibility</h2>
            <div className="space-y-3">
              {[
              { mistake: "The LinkedIn intro request", detail: "'I saw you both work in tech and thought you should connect.' This is not an introduction. It is spam." },
              { mistake: "The group email intro without warning", detail: "Introducing two people on a group email thread without asking them first forces them to respond publicly or look rude." },
              { mistake: "The vague introduction", detail: "'You two should talk.' About what? Why? When? Vague introductions waste everyone's time." }].
              map((item) =>
              <div key={item.mistake} className="bg-card rounded-xl p-4 border border-border/50">
                  <p className="font-semibold text-base mb-1">{item.mistake}</p>
                  <p className="text-muted-foreground text-base">{item.detail}</p>
                </div>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-xl mb-3 font-semibold">Final Thought: Introductions Are a Long Game</h2>
            <p className="leading-relaxed text-muted-foreground text-base">
              The value of introductions is not immediate. The person you introduce today may not be useful to you for three years. But professional networks compound over time, and the reputation you build as someone who makes thoughtful, high-value introductions is one of the most durable forms of professional capital you can create.
            </p>
            <p className="leading-relaxed text-muted-foreground mt-4 text-base">
              Do not introduce people to show off your network. Introduce people because you genuinely believe the connection will create value for both of them. If you do that consistently, your reputation as a connector will build itself.
            </p>
          </section>

        </div>
      </article>
    </div>);

};

export default ArticleWarmIntro;