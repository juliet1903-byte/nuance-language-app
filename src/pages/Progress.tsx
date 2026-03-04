import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Lock, ChevronDown, ChevronRight, CalendarDays } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { modules } from "@/data/modules";
import AppLayout from "@/components/AppLayout";
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

const imageMap: Record<string, string> = {
  "module-starting-strong": moduleStartingStrong,
  "module-meeting-room": moduleMeetingRoom,
  "module-across-cultures": moduleAcrossCultures,
  "module-managing-up": moduleManagingUp,
  "module-difficult-convos": moduleDifficultConvos,
  "module-career-moves": moduleCareerMoves,
  "module-dei": moduleDei,
  "module-common-mistakes": moduleCommonMistakes
};

// Career maturity mapping
const LEVEL_MODULE_MAP: Record<string, string[]> = {
  "natural-flow": ["dei-fundamentals", "career-moves"],
  specialist: ["starting-strong", "meeting-room"],
  collaborator: ["across-cultures", "difficult-convos"],
  influencer: ["managing-up", "common-mistakes"]
};

const LEVEL_META = [
{ id: "natural-flow", title: "Natural Flow", subtitle: "Foundations of speech" },
{ id: "specialist", title: "The Specialist", subtitle: "Mastering communication techniques" },
{ id: "collaborator", title: "The Collaborator", subtitle: "Team dynamics & empathy" },
{ id: "influencer", title: "The Influencer", subtitle: "Visionary leadership" }];


const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const Progress = () => {
  const navigate = useNavigate();
  const { isGuest, user } = useAuth();
  const showBanner = isGuest || !user;
  const {
    streakDays,
    lessonsCompleted,
    modulesCompleted,
    completedModules,
    completedLessons,
    activeDays,
    loading
  } = useProgress();

  // Find the first level with activity for default expansion
  const getDefaultExpanded = () => {
    if (showBanner) return "natural-flow";
    // Find first level that is in-progress (has activity but not completed)
    for (const meta of LEVEL_META) {
      const moduleIds = LEVEL_MODULE_MAP[meta.id];
      const levelModules = moduleIds.map((mid) => modules.find((m) => m.id === mid)).filter(Boolean);
      const totalLessons = levelModules.reduce((sum, m) => sum + (m?.lessons.length ?? 0), 0);
      const doneLessons = levelModules.reduce(
        (sum, m) => sum + (m?.lessons.filter((l) => completedLessons.has(l.id)).length ?? 0),
        0
      );
      const hasActivity = doneLessons > 0;
      const allDone = totalLessons > 0 && doneLessons === totalLessons;
      if (hasActivity && !allDone) return meta.id;
    }
    return LEVEL_META[0].id;
  };
  const [expandedLevel, setExpandedLevel] = useState<string | null>(getDefaultExpanded());

  // Build dynamic career levels
  const careerLevels = LEVEL_META.map((meta) => {
    const levelModuleIds = LEVEL_MODULE_MAP[meta.id];
    const levelModules = levelModuleIds.map((mid) => modules.find((m) => m.id === mid)).filter(Boolean);
    const doneCount = levelModuleIds.filter((mid) => completedModules.has(mid)).length;
    const total = levelModuleIds.length;
    const totalLessons = levelModules.reduce((sum, m) => sum + (m?.lessons.length ?? 0), 0);
    const doneLessons = levelModules.reduce(
      (sum, m) => sum + (m?.lessons.filter((l) => completedLessons.has(l.id)).length ?? 0),
      0
    );
    const allLessonsDone = totalLessons > 0 && doneLessons === totalLessons;
    const completed = allLessonsDone || doneCount === total;
    const progress = totalLessons > 0 ? Math.round(doneLessons / totalLessons * 100) : 0;

    // A level is active if user has any progress in it (even partial)
    const active = !completed && progress > 0;

    return { ...meta, moduleIds: levelModuleIds, completed, progress, active };
  });

  // Use careerLevels directly (no sequential locking)
  const levelsWithActive = careerLevels;

  // Calendar data
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = now.getDate();
  const monthName = new Date(year, month).toLocaleString("default", { month: "long" });
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const startOffset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

  const getActivityStatus = (day: number) => {
    if (day === today) return "today";
    if (day > today) return "locked";
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return activeDays.has(dateStr) ? "completed" : "locked";
  };

  const totalModules = modules.length;
  const modulesLeft = totalModules - modulesCompleted;

  return (
    <AppLayout>
      <header className="flex items-center gap-3 px-5 pt-6 pb-4 md:max-w-[900px] md:mx-auto md:w-full">
        <button onClick={() => navigate("/")} className="p-2 -ml-2 rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-semibold">My Progress</h1>
        </div>
        {!showBanner &&
        <span className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full font-medium text-cta bg-secondary">
            <CalendarDays className="w-3.5 h-3.5" /> {streakDays}
          </span>
        }
      </header>

      <main className="px-5 space-y-6 md:max-w-[900px] md:mx-auto md:w-full">
        {showBanner &&
        <section className="bg-card rounded-2xl p-6 shadow-sm border border-border/30 text-center">
            <CalendarDays className="w-10 h-10 text-cta mx-auto mb-3" />
            <h2 className="font-semibold text-base mb-1">Track Your Progress</h2>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Join Nuance to track completed lessons, build streaks, and monitor your career maturity path.
            </p>
            <button
            onClick={() => navigate("/auth")}
            className="px-8 py-3 rounded-xl bg-cta text-cta-foreground font-semibold text-sm hover:opacity-90 transition-opacity shadow-md">
            
              Join to Track Your Progress
            </button>
          </section>
        }

        {/* Career Maturity Levels */}
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Career Maturity Path
          </h2>
          <div className="space-y-0">
            {levelsWithActive.map((level, i) => {
              const isExpanded = expandedLevel === level.id;
              const levelModules = level.moduleIds.
              map((mid) => modules.find((m) => m.id === mid)).
              filter(Boolean);

              const displayLevel = showBanner ?
              { ...level, completed: false, active: i === 0, progress: 0 } :
              level;

              return (
                <div key={displayLevel.id} className="flex gap-3">
                  <div className="flex flex-col items-center shrink-0">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                      displayLevel.completed ?
                      "bg-accent text-accent-foreground" :
                      displayLevel.active ?
                      "border-2 border-accent bg-background" :
                      showBanner ?
                      "bg-muted text-muted-foreground" :
                      "bg-muted text-muted-foreground"}`
                      }>
                      
                      {displayLevel.completed ?
                      <Check className="w-4 h-4" /> :
                      displayLevel.active ?
                      <div className="w-2.5 h-2.5 rounded-full bg-accent" /> :
                      showBanner ?
                      <Lock className="w-3 h-3 text-accent-foreground" /> :

                      <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/40" />
                      }
                    </div>
                    {i < levelsWithActive.length - 1 && <div className="w-px flex-1 bg-border" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <button
                      onClick={() => setExpandedLevel(isExpanded ? null : displayLevel.id)}
                      className="w-full flex items-center justify-between pb-4 pt-0.5">
                      
                      <div className="text-left">
                        <p className="font-semibold text-base">{displayLevel.title}</p>
                        <p className="text-muted-foreground text-sm">{displayLevel.subtitle}</p>
                      </div>
                      {isExpanded ?
                      <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" /> :

                      <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                      }
                    </button>

                    {displayLevel.progress > 0 && !isExpanded &&
                    <div className="-mt-2 mb-4">
                        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                          className="h-full bg-accent rounded-full transition-all"
                          style={{ width: `${displayLevel.progress}%` }} />
                        
                        </div>
                        <p className="text-xs text-accent mt-1 font-medium">
                          {displayLevel.progress}% complete
                        </p>
                      </div>
                    }

                    <AnimatePresence>
                      {isExpanded &&
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mb-4">
                        
                          <div className="space-y-2">
                            {levelModules.map((mod) => {
                            if (!mod) return null;
                            const isLocked = showBanner && !displayLevel.active;
                            const allModLessonsDone = mod.lessons.length > 0 && mod.lessons.every((l) => completedLessons.has(l.id));
                            const isModuleDone = completedModules.has(mod.id) || allModLessonsDone;
                            return (
                              <button
                                key={mod.id}
                                onClick={() => !isLocked && navigate(`/module/${mod.id}`)}
                                className={`w-full flex items-center gap-3 bg-card rounded-xl p-3 shadow-sm transition-opacity ${
                                isLocked ? "opacity-50" : "active:scale-[0.98]"}`
                                }
                                disabled={isLocked}>
                                
                                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-muted shrink-0">
                                    <img
                                    src={imageMap[mod.image]}
                                    alt={mod.title}
                                    className="w-full h-full object-cover" />
                                  
                                  </div>
                                  <div className="flex-1 text-left">
                                    <p className="text-sm font-semibold">{mod.title}</p>
                                    <p className="text-muted-foreground text-sm">
                                      {mod.lessons.filter((l) => completedLessons.has(l.id)).length}/{mod.lessons.length} lesson{mod.lessons.length > 1 ? "s" : ""} · Module {mod.number}
                                    </p>
                                  </div>
                                  {isLocked ?
                                <Lock className="w-4 h-4 text-muted-foreground" /> :
                                isModuleDone ?
                                <Check className="w-4 h-4 text-foreground/70 shrink-0" strokeWidth={2.5} /> :

                                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                }
                                </button>);

                          })}
                          </div>
                        </motion.div>
                      }
                    </AnimatePresence>
                  </div>
                </div>);

            })}
          </div>
        </section>

        {/* Monthly Activity Calendar */}
        {!showBanner &&
        <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              {monthName} {year}
            </h2>
            <div className="bg-card rounded-2xl p-4 shadow-sm">
              <div className="grid grid-cols-7 gap-1 mb-2">
                {WEEKDAYS.map((d) =>
              <div key={d} className="text-center text-xs font-medium text-muted-foreground py-1">
                    {d}
                  </div>
              )}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: startOffset }).map((_, i) =>
              <div key={`empty-${i}`} className="aspect-square" />
              )}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const status = getActivityStatus(day);
                return (
                  <div
                    key={day}
                    className={`aspect-square rounded-xl flex items-center justify-center text-xs font-medium transition-colors ${
                    status === "completed" ?
                    "bg-accent/15 text-accent" :
                    status === "today" ?
                    "bg-cta/15 text-cta ring-2 ring-cta/30" :
                    "bg-muted/40 text-muted-foreground/50"}`
                    }>
                    
                      {status === "completed" ?
                    <Check className="w-3.5 h-3.5" /> :
                    status === "locked" && day > today ?
                    <Lock className="w-3 h-3" /> :

                    day
                    }
                    </div>);

              })}
              </div>
              <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded bg-accent/15 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-accent" />
                  </div>
                  <span className="text-xs text-muted-foreground">Completed</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded bg-cta/15 ring-1 ring-cta/30" />
                  <span className="text-xs text-muted-foreground">Today</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded bg-muted/40 flex items-center justify-center">
                    <Lock className="w-2.5 h-2.5 text-muted-foreground/50" />
                  </div>
                  <span className="text-xs text-muted-foreground">Upcoming</span>
                </div>
              </div>
            </div>
          </section>
        }

        {/* Stats summary */}
        {!showBanner &&
        <section className="grid grid-cols-3 gap-3 pb-4">
            <div className="bg-card rounded-2xl p-4 shadow-sm text-center">
              <p className="text-2xl font-semibold text-accent">{streakDays}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Day Streak</p>
            </div>
            <div className="bg-card rounded-2xl p-4 shadow-sm text-center">
              <p className="text-2xl font-semibold text-cta">{lessonsCompleted}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Lessons Done</p>
            </div>
            <div className="bg-card rounded-2xl p-4 shadow-sm text-center">
              <p className="text-2xl font-semibold text-foreground">{modulesLeft}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Modules Left</p>
            </div>
          </section>
        }
      </main>
    </AppLayout>);

};

export default Progress;