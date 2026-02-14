import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Play, FileText, Headphones, Search } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { modules } from "@/data/modules";

import moduleStartingStrong from "@/assets/module-starting-strong.png";
import moduleMeetingRoom from "@/assets/module-meeting-room.png";
import moduleAcrossCultures from "@/assets/module-across-cultures.png";
import moduleManagingUp from "@/assets/module-managing-up.png";
import moduleDifficultConvos from "@/assets/module-difficult-convos.png";
import moduleCareerMoves from "@/assets/module-career-moves.png";
import moduleDei from "@/assets/module-dei.png";
import moduleCommonMistakes from "@/assets/module-common-mistakes.png";

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

type Tab = "modules" | "articles" | "videos" | "podcasts";

const articles = [
  { id: "a1", title: "The Art of the Warm Intro", category: "Networking", readTime: "5 min read" },
  { id: "a2", title: "Why Silence Isn't Politeness", category: "Communication", readTime: "4 min read" },
  { id: "a3", title: "Reading Between Cultures", category: "Cross-Cultural", readTime: "6 min read" },
  { id: "a4", title: "Quiet Cracking or Burning Out?", category: "Wellbeing", readTime: "7 min read" },
  { id: "a5", title: "Feedback Without the Flinch", category: "Leadership", readTime: "5 min read" },
  { id: "a6", title: "Owning the Room Without Shouting", category: "Meetings", readTime: "4 min read" },
];

const videos = [
  { id: "v1", title: "How to Get Ready for an Interview", duration: "12 min", category: "Career" },
  { id: "v2", title: "Building Trust in Remote Teams", duration: "8 min", category: "Collaboration" },
  { id: "v3", title: "The SBI Feedback Model in Action", duration: "10 min", category: "Leadership" },
  { id: "v4", title: "Navigating Difficult Conversations", duration: "15 min", category: "Communication" },
];

const podcasts = [
  { id: "p1", title: "The Nuance of 'No'", duration: "22 min", category: "Communication" },
  { id: "p2", title: "Managing Up Without Losing Yourself", duration: "18 min", category: "Career" },
  { id: "p3", title: "Cross-Cultural Communication Myths", duration: "25 min", category: "Culture" },
];

const Library = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("modules");
  const [search, setSearch] = useState("");

  const tabs: { value: Tab; label: string; icon: typeof BookOpen }[] = [
    { value: "modules", label: "Modules", icon: BookOpen },
    { value: "articles", label: "Articles", icon: FileText },
    { value: "videos", label: "Videos", icon: Play },
    { value: "podcasts", label: "Podcasts", icon: Headphones },
  ];

  const filteredModules = modules.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase())
  );
  const filteredArticles = articles.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );
  const filteredVideos = videos.filter((v) =>
    v.title.toLowerCase().includes(search.toLowerCase())
  );
  const filteredPodcasts = podcasts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppLayout>
      <header className="px-5 pt-6 pb-2 md:max-w-[900px] md:mx-auto md:w-full">
        <h1 className="text-lg font-semibold mb-4">Library</h1>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search library..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-card text-sm outline-none text-foreground placeholder:text-muted-foreground"
          />
        </div>

        {/* Tabs */}
        <div className="flex bg-card rounded-xl p-1 gap-1">
          {tabs.map((t) => (
            <button
              key={t.value}
              onClick={() => setActiveTab(t.value)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === t.value
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground"
              }`}
            >
              <t.icon className="w-3.5 h-3.5" />
              {t.label}
            </button>
          ))}
        </div>
      </header>

      <main className="px-5 pt-4 pb-4 md:max-w-[900px] md:mx-auto md:w-full">
        {/* Modules Tab */}
        {activeTab === "modules" && (
          <div className="space-y-3">
            {filteredModules.map((mod) => (
              <button
                key={mod.id}
                onClick={() => navigate(`/module/${mod.id}`)}
                className="w-full flex items-center gap-3 bg-card rounded-xl p-3 shadow-sm active:scale-[0.98] transition-transform"
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-muted shrink-0">
                  <img
                    src={imageMap[mod.image]}
                    alt={mod.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold">{mod.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{mod.subtitle}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {mod.lessons.length} lesson{mod.lessons.length > 1 ? "s" : ""} · Module {mod.number}
                  </p>
                </div>
              </button>
            ))}
            {filteredModules.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">No modules found</p>
            )}
          </div>
        )}

        {/* Articles Tab */}
        {activeTab === "articles" && (
          <div className="space-y-3">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="flex items-center gap-3 bg-card rounded-xl p-3 shadow-sm"
              >
                <div className="w-14 h-14 rounded-xl bg-muted shrink-0 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-muted-foreground/50" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{article.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {article.category} · {article.readTime}
                  </p>
                </div>
              </div>
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
              <div
                key={video.id}
                className="flex items-center gap-3 bg-card rounded-xl p-3 shadow-sm"
              >
                <div className="w-14 h-14 rounded-xl bg-muted shrink-0 flex items-center justify-center">
                  <Play className="w-6 h-6 text-muted-foreground/50" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{video.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {video.category} · {video.duration}
                  </p>
                </div>
              </div>
            ))}
            {filteredVideos.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">No videos found</p>
            )}
          </div>
        )}

        {/* Podcasts Tab */}
        {activeTab === "podcasts" && (
          <div className="space-y-3">
            {filteredPodcasts.map((podcast) => (
              <div
                key={podcast.id}
                className="flex items-center gap-3 bg-card rounded-xl p-3 shadow-sm"
              >
                <div className="w-14 h-14 rounded-xl bg-muted shrink-0 flex items-center justify-center">
                  <Headphones className="w-6 h-6 text-muted-foreground/50" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{podcast.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {podcast.category} · {podcast.duration}
                  </p>
                </div>
              </div>
            ))}
            {filteredPodcasts.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">No podcasts found</p>
            )}
          </div>
        )}
      </main>
    </AppLayout>
  );
};

export default Library;
