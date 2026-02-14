import { useState } from "react";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo_nuance.svg";
import userAvatar from "@/assets/user-avatar.jpg";
import heroSilence from "@/assets/hero-silence.jpg";
import articleWarmIntro from "@/assets/article-warm-intro.jpg";
import articleInterview from "@/assets/article-interview.jpg";
import articleCultures from "@/assets/article-cultures.jpg";
import articleBurnout from "@/assets/article-burnout.jpg";
import LearningPath from "@/components/LearningPath";
import ModuleCard from "@/components/ModuleCard";
import TrendingCard from "@/components/TrendingCard";
import BottomNav from "@/components/BottomNav";
import SocialTranslator from "@/components/SocialTranslator";
import { modules } from "@/data/modules";

const Index = () => {
  const [translatorOpen, setTranslatorOpen] = useState(false);
  const navigate = useNavigate();

  const trendingItems = [
  { image: articleWarmIntro, badge: "Article", badgeColor: "bg-accent", title: "The art of the Warm Intro" },
  { image: articleInterview, badge: "Video", badgeColor: "bg-cta", title: "How to get ready for an interview" },
  { image: articleCultures, badge: "Deep Dive", badgeColor: "bg-vibe-blunt", title: "Reading between Cultures" },
  { image: articleBurnout, badge: "Article", badgeColor: "bg-accent", title: "Quiet Cracking or Burning Out" }];


  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-6 pb-4">
        <img src={logo} alt="Nuance" className="h-8" />
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full bg-card">
            <Bell className="w-5 h-5 text-foreground" />
          </button>
          <div className="w-9 h-9 rounded-full bg-muted overflow-hidden">
            <img src={userAvatar} alt="User avatar" className="w-full h-full object-cover shadow-none opacity-50" />
          </div>
        </div>
      </header>

      <main className="px-5 space-y-7">
        {/* Learning Path */}
        <LearningPath />

        {/* Continue Where You Left */}
        <section>
          <h2 className="text-xl font-medium mb-3">Continue where you left</h2>
          <div className="rounded-2xl overflow-hidden bg-card shadow-sm">
            <img alt="Lesson" className="w-full h-40 object-cover" src="/lovable-uploads/5a8baccc-96a0-46e9-a068-c093d117cb1e.png" />
            <div className="p-4">
              <h3 className="font-semibold text-base mb-1">Silence is Not Politeness</h3>
              <p className="text-xs text-muted-foreground mb-3">
                Why your quiet competence might be holding you back
              </p>
              <button
                onClick={() => navigate(`/module/${modules[0].id}`)}
                className="w-full py-3 rounded-xl bg-accent text-accent-foreground font-semibold text-sm">

                Continue Learning
              </button>
            </div>
          </div>
        </section>

        {/* All Modules */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-medium">All Modules</h2>
            <span className="text-sm text-muted-foreground">{modules.length}</span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-none">
            {modules.map((m) =>
            <ModuleCard key={m.id} module={m} />
            )}
          </div>
        </section>

        {/* Trending */}
        <section>
          <h2 className="text-xl font-medium mb-3">Trending</h2>
          <div className="grid grid-cols-2 gap-3">
            {trendingItems.map((item) =>
            <TrendingCard key={item.title} {...item} />
            )}
          </div>
        </section>
      </main>

      <BottomNav onTranslatorOpen={() => setTranslatorOpen(true)} />
      <SocialTranslator open={translatorOpen} onClose={() => setTranslatorOpen(false)} />
    </div>);

};

export default Index;