import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Tag, Play, AArrowUp, AArrowDown } from "lucide-react";
import { useTextSize } from "@/hooks/useTextSize";

const VideoImpostorSyndrome = () => {
  const navigate = useNavigate();
  const { textSize, textSizeClass, cycleTextSize } = useTextSize();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/30 px-5 py-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1.5 rounded-lg hover:bg-card transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-semibold truncate text-base flex-1">Impostor Syndrome</span>
        <button onClick={cycleTextSize} className="w-10 h-10 flex items-center justify-center rounded-full bg-card hover:bg-muted transition-colors" aria-label="Change text size">
          {textSize === "x-large" ? <AArrowDown className="w-5 h-5" /> : <AArrowUp className="w-5 h-5" />}
        </button>
      </header>

      <div className={`max-w-2xl mx-auto px-5 pb-20 ${textSizeClass}`}>
        <div className="relative -mx-5 mb-8 bg-black">
          <div className="aspect-video w-full">
            <iframe
              src="https://www.youtube.com/embed/qGmwH6DyUjo"
              title="Impostor Syndrome"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>

        <div className="mb-6">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-card px-2.5 py-1 rounded-md mb-3">
            <Tag className="w-3 h-3" /> Video
          </span>
          <h1 className="text-2xl md:text-3xl leading-tight mb-3 font-semibold">Impostor Syndrome: What It Is and How to Overcome It</h1>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1 text-sm"><Clock className="w-3.5 h-3.5" /> 10 min</span>
            <span className="bg-card px-2.5 py-1 rounded-full font-medium text-sm">Career</span>
          </div>
        </div>

        <p className="leading-relaxed mb-8 border-l-2 border-cta pl-4 text-base text-secondary-foreground">
          Impostor syndrome makes high-achievers doubt their accomplishments and fear being exposed as a "fraud." This video explores why it happens, who it affects most, and practical strategies for overcoming it in your professional life.
        </p>

        <div className="space-y-6">
          <section>
            <h2 className="text-lg mb-3 font-semibold">What You'll Learn</h2>
            <div className="space-y-3">
              {[
                { title: "What impostor syndrome really is", desc: "Understanding the psychological pattern behind feeling like a fraud despite evidence of success." },
                { title: "Common triggers at work", desc: "New roles, promotions, and high-visibility projects can all intensify impostor feelings." },
                { title: "Reframing your inner narrative", desc: "Learn to separate feelings from facts and recognize your genuine accomplishments." },
                { title: "Building a support system", desc: "Why talking about impostor syndrome with trusted colleagues can break its hold on you." },
              ].map((item) => (
                <div key={item.title} className="flex gap-3 bg-card rounded-xl p-4 border border-border/50">
                  <Play className="w-4 h-4 text-cta shrink-0 mt-0.5" />
                  <div>
                    <p className="text-base font-medium">{item.title}</p>
                    <p className="text-muted-foreground mt-0.5 leading-relaxed text-base">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-cta/10 border border-cta/20 rounded-xl p-4">
            <p className="text-sm font-semibold text-foreground mb-1">Remember</p>
            <p className="text-muted-foreground leading-relaxed text-base">
              Impostor syndrome is not a reflection of your ability — it's a sign that you care deeply about doing good work. Recognizing it is the first step to moving past it.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default VideoImpostorSyndrome;
