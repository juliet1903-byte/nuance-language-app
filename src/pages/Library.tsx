import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Play, FileText, Search, Check, ChevronRight } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { modules } from "@/data/modules";
import { useAuth } from "@/components/AuthContext";
import { useProgress } from "@/hooks/useProgress";

import moduleStartingStrong from "@/assets/module-starting-strong.png";
import moduleMeetingRoom from "@/assets/module-meeting-room.png";
import moduleAcrossCultures from "@/assets/module-across-cultures.png";
import moduleManagingUp from "@/assets/module-managing-up.png";
import moduleDifficultConvos from "@/assets/module-difficult-convos.png";
import moduleCareerMoves from "@/assets/module-career-moves.png";
import moduleDei from "@/assets/module-dei.png";
import moduleCommonMistakes from "@/assets/module-common-mistakes.png";

import articleWarmIntro from "@/assets/article-warm-intro.png";
import articleBurnout from "@/assets/article-burnout.png";
import articleCultures from "@/assets/article-cultures.png";
import articleInterview from "@/assets/article-interview.png";
import articleCriticism from "@/assets/article-criticism.png";
import articleConversations from "@/assets/article-conversations.png";
import articlePromoted from "@/assets/article-promoted.png";
import videoNeutral from "@/assets/video-neutral.png";
import videoPositive from "@/assets/video-positive.png";
import videoImpostor from "@/assets/video-impostor.png";
import deepDiveManagingUp from "@/assets/deep-dive-managing-up.png";

const imageMap: Record<string, string> = {
  "module-starting-strong": moduleStartingStrong,
  "module-meeting-room": moduleMeetingRoom,
  "module-across-cultures": moduleAcrossCultures,
  "module-managing-up": moduleManagingUp,
  "module-difficult-convos": moduleDifficultConvos,
  "module-career-moves": moduleCareerMoves,
  "module-dei": moduleDei,
  "module-common-mistakes": moduleCommonMistakes,
};

type Tab = "modules" | "articles" | "videos";

const articles = [
  {
    id: "a7",
    title: "Why Some People Get Promoted and Others Don't",
    category: "Career",
    readTime: "12 min read",
    href: "/article/promoted",
    image: articlePromoted,
  },
  {
    id: "a1",
    title: "The Art of the Warm Intro",
    category: "Networking",
    readTime: "5 min read",
    href: "/article/warm-intro",
    image: articleWarmIntro,
  },
  {
    id: "a4",
    title: "Quiet Cracking or Burning Out?",
    category: "Wellbeing",
    readTime: "7 min read",
    href: "/article/burnout",
    image: articleBurnout,
  },
  {
    id: "a3",
    title: "Managing Up: How to Work With Your Manager",
    category: "Career",
    readTime: "15 min read",
    href: "/deep-dive/managing-up",
    image: deepDiveManagingUp,
    badge: "Deep Dive",
  },
  {
    id: "a3b",
    title: "Reading Between Cultures",
    category: "Cross-Cultural",
    readTime: "10 min read",
    href: "/deep-dive/cultures",
    image: articleCultures,
    badge: "Deep Dive",
  },
  {
    id: "a5",
    title: "How to Receive Criticism Without Collapsing or Defending",
    category: "Feedback",
    readTime: "8 min read",
    href: "/article/criticism",
    image: articleCriticism,
  },
  {
    id: "a6",
    title: "The Conversations Most People Avoid",
    category: "Communication",
    readTime: "9 min read",
    href: "/article/conversations",
    image: articleConversations,
  },
];

const videos = [
  {
    id: "v4",
    title: "Impostor Syndrome: What It Is and How to Overcome It",
    duration: "10 min",
    category: "Career",
    href: "/video/impostor-syndrome",
    image: videoImpostor,
  },
  {
    id: "v1",
    title: "How to Get Ready for an Interview",
    duration: "12 min",
    category: "Career",
    href: "/video/interview",
    image: articleInterview,
  },
  {
    id: "v2",
    title: "How to Grow Professional Relationships",
    duration: "8 min",
    category: "Networking",
    href: "/video/relationships",
    image: videoNeutral,
  },
  {
    id: "v3",
    title: "The 4 Domains of Emotional Intelligence",
    duration: "6 min",
    category: "Leadership",
    href: "/video/emotional-intelligence",
    image: videoPositive,
  },
];

const Library = () => {
  const navigate = useNavigate();
  const { isGuest, user } = useAuth();
  const { completedLessons, completedModules } = useProgress();
  const isLoggedIn = !isGuest && !!user;
  const [activeTab, setActiveTab] = useState<Tab>("modules");
  const [search, setSearch] = useState("");

  const tabs: { value: Tab; label: string; icon: typeof BookOpen }[] = [
    { value: "modules", label: "Modules", icon: BookOpen },
    { value: "articles", label: "Articles", icon: FileText },
    { value: "videos", label: "Videos", icon: Play },
  ];

  const filteredModules = modules.filter((m) => m.title.toLowerCase().includes(search.toLowerCase()));
  const filteredArticles = articles.filter((a) => a.title.toLowerCase().includes(search.toLowerCase()));
  const filteredVideos = videos.filter((v) => v.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <AppLayout>
      <header className="px-5 pt-6 pb-2 md:max-w-[900px] md:mx-auto md:w-full">
        <h1 className="mb-4 text-2xl font-medium">Library</h1>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search library..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-card text-base outline-none text-foreground placeholder:text-muted-foreground"
          />
        </div>

        {/* Tabs */}
        <div className="flex bg-card rounded-xl p-1 gap-1">
          {tabs.map((t) => (
            <button
              key={t.value}
              onClick={() => setActiveTab(t.value)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-base font-medium rounded-lg transition-all ${
                activeTab === t.value ? "bg-foreground text-background shadow-sm" : "text-muted-foreground"
              }`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </div>
      </header>

      <main className="px-5 pt-4 pb-4 md:max-w-[900px] md:mx-auto md:w-full">
        {/* Modules Tab */}
        {activeTab === "modules" && (
          <div className="space-y-3">
            {filteredModules.map((mod) => {
              const allDone =
                isLoggedIn && mod.lessons.length > 0 && mod.lessons.every((l) => completedLessons.has(l.id));
              const isDone = isLoggedIn && (completedModules.has(mod.id) || allDone);
              const doneLessons = isLoggedIn ? mod.lessons.filter((l) => completedLessons.has(l.id)).length : 0;
              return (
                <button
                  key={mod.id}
                  onClick={() => navigate(`/module/${mod.id}`)}
                  className="w-full flex items-center gap-3 bg-card rounded-xl p-3 shadow-sm active:scale-[0.98] transition-transform"
                >
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-muted shrink-0">
                    <img src={imageMap[mod.image]} alt={mod.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-base font-medium">{mod.title}</p>
                    <p className="text-muted-foreground mt-0.5 text-sm">{mod.subtitle}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {isLoggedIn ? `${doneLessons}/${mod.lessons.length}` : mod.lessons.length} lesson
                      {mod.lessons.length > 1 ? "s" : ""} · Module {mod.number}
                    </p>
                  </div>
                  {isDone ? (
                    <Check className="w-4 h-4 text-foreground/70 shrink-0" strokeWidth={2.5} />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                  )}
                </button>
              );
            })}
            {filteredModules.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">No modules found</p>
            )}
          </div>
        )}

        {/* Articles Tab */}
        {activeTab === "articles" && (
          <div className="space-y-3 text-base font-medium">
            {filteredArticles.map((article) => (
              <button
                key={article.id}
                onClick={() => navigate(article.href)}
                className="w-full flex items-center gap-3 bg-card rounded-xl p-3 shadow-sm active:scale-[0.98] transition-transform"
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-muted shrink-0">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    {article.badge && (
                      <span className="text-xs font-bold text-cta bg-cta/10 px-1.5 py-0.5 rounded">
                        {article.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-base font-medium">{article.title}</p>
                  <p className="text-muted-foreground mt-0.5 text-sm">
                    {article.category} · {article.readTime}
                  </p>
                </div>
              </button>
            ))}
            {filteredArticles.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">No articles found</p>
            )}
          </div>
        )}

        {/* Videos Tab */}
        {activeTab === "videos" && (
          <div className="space-y-3">
            {filteredVideos.map((video) => (
              <button
                key={video.id}
                onClick={() => navigate(video.href)}
                className="w-full flex items-center gap-3 bg-card rounded-xl p-3 shadow-sm active:scale-[0.98] transition-transform"
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-muted shrink-0 relative">
                  <img src={video.image} alt={video.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-foreground/20">
                    <Play className="w-4 h-4 text-white fill-white" />
                  </div>
                </div>
                <div className="flex-1 text-left">
                  <p className="text-base font-medium">{video.title}</p>
                  <p className="text-muted-foreground mt-0.5 text-sm">
                    {video.category} · {video.duration}
                  </p>
                </div>
              </button>
            ))}
            {filteredVideos.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">No videos found</p>
            )}
          </div>
        )}
      </main>
    </AppLayout>
  );
};

export default Library;
