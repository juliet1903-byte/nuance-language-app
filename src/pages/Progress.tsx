import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Lock, ChevronDown, ChevronRight, CalendarDays } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { modules } from "@/data/modules";
import AppLayout from "@/components/AppLayout";

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

interface CareerLevel {
  id: string;
  title: string;
  subtitle: string;
  completed: boolean;
  active: boolean;
  progress?: number;
  moduleIds: string[]; // maps to module IDs from the playbook
}

const careerLevels: CareerLevel[] = [
  {
    id: "natural-flow",
    title: "Natural Flow",
    subtitle: "Foundations of speech",
    completed: true,
    active: false,
    moduleIds: ["dei-fundamentals", "career-moves"], // Modules 7 & 6
  },
  {
    id: "specialist",
    title: "The Specialist",
    subtitle: "Mastering communication techniques",
    completed: false,
    active: true,
    progress: 65,
    moduleIds: ["starting-strong", "meeting-room"], // Modules 1 & 2
  },
  {
    id: "collaborator",
    title: "The Collaborator",
    subtitle: "Team dynamics & empathy",
    completed: false,
    active: false,
    moduleIds: ["across-cultures", "difficult-convos"], // Modules 3 & 5
  },
  {
    id: "influencer",
    title: "The Influencer",
    subtitle: "Visionary leadership",
    completed: false,
    active: false,
    moduleIds: ["managing-up", "common-mistakes"], // Modules 4 & 8
  },
];

// Generate mock activity data for the current month
const generateActivityData = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = now.getDate();

  const activity: Record<number, "completed" | "locked" | "today"> = {};
  // Some past days marked as completed
  const completedDays = [1, 3, 4, 7, 8, 10, 11, 14, 15, 17, 18, 21];
  for (let d = 1; d <= daysInMonth; d++) {
    if (d === today) {
      activity[d] = "today";
    } else if (d > today) {
      activity[d] = "locked";
    } else if (completedDays.includes(d)) {
      activity[d] = "completed";
    } else {
      activity[d] = "locked";
    }
  }
  return { year, month, daysInMonth, today, activity };
};

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const Progress = () => {
  const navigate = useNavigate();
  const [expandedLevel, setExpandedLevel] = useState<string | null>("specialist");

  const { year, month, daysInMonth, today, activity } = generateActivityData();
  const monthName = new Date(year, month).toLocaleString("default", { month: "long" });

  // First day of month (0=Sun, adjust to Mon-based)
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const startOffset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

  const streak = 7; // mock streak

  return (
    <AppLayout>
        {/* Header */}
        <header className="flex items-center gap-3 px-5 pt-6 pb-4 md:max-w-[900px] md:mx-auto md:w-full">
          <button onClick={() => navigate("/")} className="p-2 -ml-2 rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">My Progress</h1>
          </div>
          <span className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full font-medium text-cta bg-secondary">
            <CalendarDays className="w-3.5 h-3.5" /> {streak}
          </span>
        </header>

        <main className="px-5 space-y-6 md:max-w-[900px] md:mx-auto md:w-full">
          {/* Career Maturity Levels */}
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Career Maturity Path
            </h2>

            <div className="space-y-0">
              {careerLevels.map((level, i) => {
                const isExpanded = expandedLevel === level.id;
                const levelModules = level.moduleIds
                  .map((mid) => modules.find((m) => m.id === mid))
                  .filter(Boolean);

                return (
                  <div key={level.id}>
                    {/* Level Header */}
                    <button
                      onClick={() => setExpandedLevel(isExpanded ? null : level.id)}
                      className="w-full flex gap-3 items-start"
                    >
                      {/* Stepper */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                            level.completed
                              ? "bg-accent text-accent-foreground"
                              : level.active
                              ? "border-2 border-accent bg-background"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {level.completed ? (
                            <Check className="w-4 h-4" />
                          ) : level.active ? (
                            <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                          ) : (
                            <Lock className="w-3 h-3 text-accent-foreground" />
                          )}
                        </div>
                        {i < careerLevels.length - 1 && (
                          <div className="w-px flex-1 bg-border min-h-[16px]" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-4 pt-0.5">
                        <div className="flex items-center justify-between">
                          <div className="text-left">
                            <p className="font-semibold text-sm">{level.title}</p>
                            <p className="text-xs text-muted-foreground">{level.subtitle}</p>
                          </div>
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>

                        {level.active && level.progress && (
                          <div className="mt-2">
                            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-accent rounded-full transition-all"
                                style={{ width: `${level.progress}%` }}
                              />
                            </div>
                            <p className="text-xs text-accent mt-1 font-medium">
                              {level.progress}% complete
                            </p>
                          </div>
                        )}
                      </div>
                    </button>

                    {/* Expanded Modules */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden ml-10 mb-4"
                        >
                          <div className="space-y-2">
                            {levelModules.map((mod) => {
                              if (!mod) return null;
                              const isLocked = !level.completed && !level.active;
                              return (
                                <button
                                  key={mod.id}
                                  onClick={() => !isLocked && navigate(`/module/${mod.id}`)}
                                  className={`w-full flex items-center gap-3 bg-card rounded-xl p-3 shadow-sm transition-opacity ${
                                    isLocked ? "opacity-50" : "active:scale-[0.98]"
                                  }`}
                                  disabled={isLocked}
                                >
                                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-muted shrink-0">
                                    <img
                                      src={imageMap[mod.image]}
                                      alt={mod.title}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="flex-1 text-left">
                                    <p className="text-sm font-semibold">{mod.title}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {mod.lessons.length} lesson{mod.lessons.length > 1 ? "s" : ""} · Module {mod.number}
                                    </p>
                                  </div>
                                  {isLocked ? (
                                    <Lock className="w-4 h-4 text-muted-foreground" />
                                  ) : level.completed ? (
                                    <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                                      <Check className="w-3.5 h-3.5 text-accent-foreground" />
                                    </div>
                                  ) : (
                                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Monthly Activity Calendar */}
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              {monthName} {year}
            </h2>

            <div className="bg-card rounded-2xl p-4 shadow-sm">
              {/* Weekday headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {WEEKDAYS.map((d) => (
                  <div key={d} className="text-center text-xs font-medium text-muted-foreground py-1">
                    {d}
                  </div>
                ))}
              </div>

              {/* Days grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Empty cells for offset */}
                {Array.from({ length: startOffset }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}

                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const status = activity[day];

                  return (
                    <div
                      key={day}
                      className={`aspect-square rounded-xl flex items-center justify-center text-xs font-medium transition-colors ${
                        status === "completed"
                          ? "bg-accent/15 text-accent"
                          : status === "today"
                          ? "bg-cta/15 text-cta ring-2 ring-cta/30"
                          : "bg-muted/40 text-muted-foreground/50"
                      }`}
                    >
                      {status === "completed" ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : status === "locked" && day > today ? (
                        <Lock className="w-3 h-3" />
                      ) : (
                        day
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
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

          {/* Stats summary */}
          <section className="grid grid-cols-3 gap-3 pb-4">
            <div className="bg-card rounded-2xl p-4 shadow-sm text-center">
              <p className="text-2xl font-semibold text-accent">{streak}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Day Streak</p>
            </div>
            <div className="bg-card rounded-2xl p-4 shadow-sm text-center">
              <p className="text-2xl font-semibold text-cta">12</p>
              <p className="text-xs text-muted-foreground mt-0.5">Lessons Done</p>
            </div>
            <div className="bg-card rounded-2xl p-4 shadow-sm text-center">
              <p className="text-2xl font-semibold text-foreground">2</p>
              <p className="text-xs text-muted-foreground mt-0.5">Modules Left</p>
            </div>
          </section>
        </main>
    </AppLayout>
  );
};

export default Progress;
