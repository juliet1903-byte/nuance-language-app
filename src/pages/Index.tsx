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
import { useNotifications } from "@/hooks/useNotifications";

const Index = () => {
  const navigate = useNavigate();
  const { isGuest, user, profile } = useAuth();
  const { completedLessons, completedModules, loading: progressLoading } = useProgress();
  const { unreadCount } = useNotifications();
  const showAvatar = !isGuest && user;


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
  const continueSubtitle = isGuest ?
  continueModule.lessons[0]?.title ?? continueModule.subtitle :
  nextLesson?.lesson.title ?? continueModule.subtitle;
  const continueDescription = isGuest ?
  continueModule.description :
  `Module ${continueModule.number} · Lesson ${(nextLesson?.lessonIdx ?? 0) + 1}`;

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
          <button onClick={() => navigate("/notifications")} className="p-2 rounded-full bg-card relative">
            <Bell className="w-5 h-5 text-foreground" />
            {unreadCount > 0 &&
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            }
          </button>
          {showAvatar ?
          <LetterAvatar
            name={profile?.display_name}
            email={user?.email}
            size="sm" /> :


          <div onClick={() => navigate("/auth")} className="w-9 h-9 rounded-full bg-muted overflow-hidden flex items-center justify-center cursor-pointer">
              <User className="w-5 h-5 text-muted-foreground" />
            </div>
          }
        </div>
      </header>

      <main className="px-5 space-y-7 md:max-w-[900px] md:mx-auto md:w-full">
        <LearningPath />

        <section>
          <h2 className="text-xl font-medium mb-3">{continueTitle}</h2>
          <div className="rounded-2xl overflow-hidden bg-card shadow-sm">

            <img alt="Lesson" className="w-full h-40 object-cover" src="/lovable-uploads/44f61677-4fd5-49b3-9fbb-eabbecbad3aa.png" />
            <div className="p-4 text-sm">
              <h3 className="text-base mb-1 font-medium">{continueSubtitle}</h3>
              <p className="lg:text-base text-muted-foreground mb-3 text-base">
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