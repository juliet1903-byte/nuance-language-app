import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Tag, Play, AArrowUp, AArrowDown } from "lucide-react";
import { useTextSize } from "@/hooks/useTextSize";

const VideoRelationships = () => {
  const navigate = useNavigate();
  const { textSize, textSizeClass, cycleTextSize } = useTextSize();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/30 px-5 py-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1.5 rounded-lg hover:bg-card transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-semibold truncate text-base flex-1">How to Grow Professional Relationships</span>
        <button onClick={cycleTextSize} className="p-1.5 rounded-lg hover:bg-card transition-colors" aria-label="Increase text size">
          {textSize === "x-large" ? <AArrowDown className="w-5 h-5" /> : <AArrowUp className="w-5 h-5" />}
        </button>
      </header>

      <div className={`max-w-2xl mx-auto px-5 pb-20 ${textSizeClass}`}>
        <div className="relative -mx-5 mb-8 bg-black">
          <div className="aspect-video w-full">
            <iframe
              src="https://www.youtube.com/embed/IRG-YubP1rw"
              title="How to Grow Professional Relationships"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full" />
            
          </div>
        </div>

        <div className="mb-6">
          <span className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider bg-card px-2.5 py-1 rounded-md mb-3 text-sm">
            <Tag className="w-3 h-3" /> Video
          </span>
          <h1 className="text-2xl md:text-3xl leading-tight mb-3 font-semibold">How to Grow Professional Relationships</h1>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1 text-sm"><Clock className="w-3.5 h-3.5" /> 8 min</span>
            <span className="bg-card px-2.5 py-1 rounded-full font-medium text-sm">Networking</span>
          </div>
        </div>

        <p className="text-muted-foreground leading-relaxed mb-8 border-l-2 border-cta pl-4 text-base">
          Building strong professional relationships is about more than exchanging business cards. This video explores how to create genuine connections that advance your career and enrich your professional life.
        </p>

        <div className="space-y-6">
          <section>
            <h2 className="text-lg mb-3 font-semibold">What You'll Learn</h2>
            <div className="space-y-3">
              {[
              { title: "Beyond surface-level networking", desc: "Learn to move past small talk and build relationships rooted in mutual value and trust." },
              { title: "The follow-up framework", desc: "A simple system for staying in touch without being pushy or forgettable." },
              { title: "Adding value first", desc: "Why leading with generosity creates stronger professional bonds than any elevator pitch." },
              { title: "Navigating different relationship stages", desc: "From first meeting to trusted advisor — understand what each stage requires." }].
              map((item) =>
              <div key={item.title} className="flex gap-3 bg-card rounded-xl p-4 border border-border/50">
                  <Play className="w-4 h-4 text-cta shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-base">{item.title}</p>
                    <p className="text-muted-foreground mt-0.5 leading-relaxed text-base">{item.desc}</p>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="bg-cta/10 border border-cta/20 rounded-xl p-4">
            <p className="text-sm font-semibold text-foreground mb-1">Remember</p>
            <p className="text-muted-foreground leading-relaxed text-base">
              Professional relationships are long-term investments. The people who build the strongest networks focus on being helpful, not transactional.
            </p>
          </section>
        </div>
      </div>
    </div>);

};

export default VideoRelationships;