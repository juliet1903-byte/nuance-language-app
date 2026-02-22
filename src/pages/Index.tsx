import { Bell, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect, useState, useMemo } from "react";
import Logo from "@/components/Logo";
import LetterAvatar from "@/components/LetterAvatar";
import { useAuth } from "@/components/AuthContext";
import articleCriticism from "@/assets/article-criticism.png";
import articleConversations from "@/assets/article-conversations.png";
import articleCultures from "@/assets/article-cultures.png";
import videoPositive from "@/assets/video-positive.png";
import LearningPath from "@/components/LearningPath";
import ModuleCard from "@/components/ModuleCard";
import TrendingCard from "@/components/TrendingCard";
import AppLayout, { useScrollContainer } from "@/components/AppLayout";
import { modules } from "@/data/modules";
import { useProgress } from "@/hooks/useProgress";

const Index = () => {
  const navigate = useNavigate();
  const { isGuest, user, profile } = useAuth();
  const { completedLessons, completedModules, loading: progressLoading } = useProgress();
  const showAvatar = !isGuest && user;

  const cardRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useScrollContainer();
  const [tilt, setTilt] = useState(0);

  useEffect(() => {
    const scrollEl = scrollContainerRef?.current;
    const target: HTMLElement | Window = scrollEl || window;

    const onScroll = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const viewH = window.innerHeight;
      const r = Math.max(0, Math.min(1, (viewH * 0.5 - rect.top) / (viewH * 0.5)));
      setTilt(r * 12);
    };

    target.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => target.removeEventListener("scroll", onScroll);
  }, [scrollContainerRef]);

  // Find next lesson for registered users
  const nextLesson = useMemo(() => {
    if (isGuest || !user) return null;
    for (const mod of modules) {
      for (let i = 0; i < mod.lessons.length; i++) {
        if (!completedLessons.has(mod.lessons[i].id)) {
          return { module: mod, lessonIdx: i, lesson: mod.lessons[i] };
        }
      }
    }
    const lastMod = modules[modules.length - 1];
    return { module: lastMod, lessonIdx: lastMod.lessons.length - 1, lesson: lastMod.lessons[lastMod.lessons.length - 1] };
  }, [isGuest, user, completedLessons]);

  const continueModule = isGuest || !nextLesson ? modules[0] : nextLesson.module;
  const continueTitle = isGuest ? "Start Learning" : "Continue where you left";
  const continueSubtitle = isGuest
    ? continueModule.lessons[0]?.title ?? continueModule.subtitle
    : nextLesson?.lesson.title ?? continueModule.subtitle;
  const continueDescription = isGuest
    ? continueModule.description
    : `Module ${continueModule.number} · Lesson ${(nextLesson?.lessonIdx ?? 0) + 1}`;

  const trendingItems = [
  { image: articleCriticism, badge: "Article", badgeColor: "bg-accent", title: "How to Receive Criticism", href: "/article/criticism" },
  { image: articleConversations, badge: "Article", badgeColor: "bg-accent", title: "The Conversations Most People Avoid", href: "/article/conversations" },
  { image: videoPositive, badge: "Video", badgeColor: "bg-cta", title: "The 4 Domains of Emotional Intelligence", href: "/video/emotional-intelligence" },
  { image: articleCultures, badge: "Deep Dive", badgeColor: "bg-vibe-blunt", title: "Reading Between Cultures", href: "/deep-dive/cultures" }];


  return (
    <AppLayout>
      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-6 pb-4 md:max-w-[900px] md:mx-auto md:w-full">
        <Logo className="h-8 md:hidden" />
        <div className="flex items-center gap-3 md:ml-auto">
          <button className="p-2 rounded-full bg-card">
            <Bell className="w-5 h-5 text-foreground" />
          </button>
          {showAvatar ?
          <LetterAvatar
            name={profile?.display_name}
            email={user?.email}
            size="sm" /> :


          <div className="w-9 h-9 rounded-full bg-muted overflow-hidden flex items-center justify-center">
              <User className="w-5 h-5 text-muted-foreground" />
            </div>
          }
        </div>
      </header>

      <main className="px-5 space-y-7 md:max-w-[900px] md:mx-auto md:w-full">
        <LearningPath />

        <section>
          <h2 className="text-xl font-medium mb-3">{continueTitle}</h2>
          <div
            ref={cardRef}
            className="rounded-2xl overflow-hidden bg-card transition-transform duration-150 will-change-transform"
            style={{
              transform: `perspective(800px) rotateX(${tilt}deg)`,
              transformOrigin: "bottom center",
              boxShadow: "0 1px 2px rgba(0,0,0,0.03)"
            }}>

            <img alt="Lesson" className="w-full h-40 object-cover" src="/lovable-uploads/44f61677-4fd5-49b3-9fbb-eabbecbad3aa.png" />
            <div className="p-4">
              <h3 className="font-semibold text-base mb-1">{continueSubtitle}</h3>
              <p className="text-xs lg:text-base text-muted-foreground mb-3">
                {continueDescription}
              </p>
              <button
                onClick={() => navigate(`/module/${continueModule.id}`)}
                className="w-full py-3 rounded-xl text-accent-foreground font-semibold text-sm lg:text-base bg-cta">
                {isGuest ? "Start Learning" : "Continue Learning"}
              </button>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-medium">All Modules</h2>
            <span className="text-sm lg:text-base text-muted-foreground">{modules.length}</span>
          </div>
          <div className="gap-3 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-none flex items-start justify-start">
            {modules.map((m) =>
            <ModuleCard key={m.id} module={m} />
            )}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-3">Trending</h2>
          <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3">
            {trendingItems.map((item) =>
            <TrendingCard key={item.title} {...item} onClick={() => navigate(item.href)} />
            )}
          </div>
        </section>
      </main>
    </AppLayout>);

};

export default Index;