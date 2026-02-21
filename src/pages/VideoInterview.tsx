import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Tag, Play } from "lucide-react";
import articleInterview from "@/assets/article-interview.png";

const VideoInterview = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/30 px-5 py-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1.5 rounded-lg hover:bg-card transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-sm font-semibold truncate">How to Get Ready for an Interview</span>
      </header>

      <div className="max-w-2xl mx-auto px-5 pb-20">
        {/* Hero video embed */}
        <div className="relative -mx-5 mb-8 bg-black">
          <div className="aspect-video w-full">
            <iframe
              src="https://www.youtube.com/embed/f_N3PGvnVKg"
              title="How to Get Ready for an Interview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Title & meta */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-card px-2.5 py-1 rounded-md mb-3">
            <Tag className="w-3 h-3" /> Video
          </span>
          <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-3">How to Get Ready for an Interview</h1>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 12 min</span>
            <span className="bg-card px-2.5 py-1 rounded-full font-medium">Career</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-8 border-l-2 border-cta pl-4">
          Interviews are not just about what you know — they're about how you communicate what you know. This video breaks down the preparation framework used by professionals who consistently convert interviews into offers.
        </p>

        <div className="space-y-6">
          <section>
            <h2 className="text-lg font-bold mb-3">What You'll Learn</h2>
            <div className="space-y-3">
              {[
                { title: "Research that actually matters", desc: "Go beyond the company website. Learn how to research culture, leadership style, and recent challenges to show real preparation." },
                { title: "The STAR method, done right", desc: "Situation, Task, Action, Result — and why most people get the Action part wrong and undersell themselves." },
                { title: "Questions that make you memorable", desc: "The questions you ask at the end of an interview signal your level of thinking. Learn the ones that leave a strong impression." },
                { title: "Managing nerves and body language", desc: "Practical, evidence-backed techniques to present yourself with calm confidence even when you don't feel it." },
                { title: "Following up without being annoying", desc: "The exact timing and language for a post-interview message that reinforces your candidacy without desperation." },
              ].map((item) => (
                <div key={item.title} className="flex gap-3 bg-card rounded-xl p-4 border border-border/50">
                  <Play className="w-4 h-4 text-cta shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3">Key Phrases to Use</h2>
            <div className="space-y-3">
              {[
                { context: "When asked about a weakness", phrase: "One area I'm actively developing is [X]. I've been working on it by [specific action], and I've already seen [result]." },
                { context: "When you don't know the answer", phrase: "That's a great question. I'd want to think that through carefully — here's my initial thinking, and I'd follow up with [action]." },
                { context: "When asking about the team", phrase: "How does the team typically handle disagreements about priorities — what does that process look like day-to-day?" },
                { context: "Closing the interview", phrase: "Based on everything we've discussed, is there anything about my background you'd want me to clarify or address before we wrap up?" },
              ].map((item) => (
                <div key={item.context} className="bg-card rounded-xl p-4 border border-border/50">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">{item.context}</p>
                  <p className="text-sm text-foreground italic">"{item.phrase}"</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3">Common Mistakes to Avoid</h2>
            <div className="space-y-2">
              {[
                "Talking for more than 2–3 minutes on any single answer without checking in with the interviewer.",
                "Saying 'I'm a perfectionist' or 'I work too hard' as a weakness answer. Interviewers hear this constantly.",
                "Not asking any questions — it signals lack of curiosity or preparation.",
                "Badmouthing a previous employer. Even if justified, it raises a red flag about your professionalism.",
                "Leaving salary negotiation entirely to the end. Research ranges before you go in.",
              ].map((mistake, i) => (
                <div key={i} className="flex gap-3 bg-card rounded-xl p-3 border border-border/50">
                  <span className="text-destructive font-bold text-sm shrink-0">✗</span>
                  <p className="text-sm text-muted-foreground">{mistake}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-cta/10 border border-cta/20 rounded-xl p-4">
            <p className="text-sm font-semibold text-foreground mb-1">Remember</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The interview is a two-way conversation. You are evaluating them as much as they are evaluating you. Going in with that mindset shifts your posture from desperate to confident — and that shift is visible.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default VideoInterview;
