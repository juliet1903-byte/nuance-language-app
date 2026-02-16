import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, PartyPopper } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { modules } from "@/data/modules";
import AppLayout from "@/components/AppLayout";
import FillGapExercise from "@/components/FillGapExercise";
import ScenarioExercise from "@/components/ScenarioExercise";
import { useProgress } from "@/hooks/useProgress";
import { useAuth } from "@/components/AuthContext";

type View = "overview" | "lesson" | "exercise" | "scenario" | "complete";

const ModuleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { logActivity, completedLessons } = useProgress();
  const [view, setView] = useState<View>("overview");
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);

  const module = modules.find((m) => m.id === id);
  if (!module) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Module not found</p>
      </div>
    );
  }

  const lesson = module.lessons[activeLessonIdx];
  const exercise = lesson?.exercises?.[0];
  const currentModuleIdx = modules.findIndex((m) => m.id === id);
  const nextModule = modules[currentModuleIdx + 1];

  const handleBack = () => {
    if (view === "overview") navigate("/");
    else if (view === "exercise") setView("lesson");
    else if (view === "scenario") setView("lesson");
    else setView("overview");
  };

  const handleLessonComplete = async () => {
    if (user && lesson) {
      await logActivity("lesson_complete", module.id, lesson.id);
    }
  };

  const handleExerciseComplete = async () => {
    if (user) {
      await logActivity("exercise_complete", module.id, lesson?.id);
    }
    setView("scenario");
  };

  const handleScenarioComplete = async (vibeScore?: number) => {
    if (user) {
      await logActivity("scenario_complete", module.id, undefined, vibeScore);
      // Check if all lessons in this module are completed
      const allDone = module.lessons.every(
        (l) => completedLessons.has(l.id) || l.id === lesson?.id
      );
      if (allDone) {
        await logActivity("module_complete", module.id);
      }
    }
    setView("complete");
  };

  return (
    <AppLayout>
      <header className="flex items-center gap-3 px-5 pt-6 pb-4 md:max-w-[900px] md:mx-auto md:w-full">
        <button onClick={handleBack} className="p-2 -ml-2 rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <p className="text-xs text-muted-foreground font-medium">Module {module.number}</p>
          <h1 className="text-lg font-semibold">{module.title}</h1>
        </div>
      </header>

      <main className="px-5 md:max-w-[900px] md:mx-auto md:w-full">
        <AnimatePresence mode="wait">
          {view === "overview" && (
            <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p className="text-sm text-muted-foreground mb-6">{module.description}</p>

              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Lessons</h3>
              <div className="space-y-2">
                {module.lessons.map((l, i) => {
                  const isDone = completedLessons.has(l.id);
                  return (
                    <button
                      key={l.id}
                      onClick={() => { setActiveLessonIdx(i); setView("lesson"); }}
                      className="w-full flex items-center justify-between bg-card rounded-xl p-4 shadow-sm"
                    >
                      <div className="text-left">
                        <p className="text-sm font-semibold">
                          {module.number}.{i + 1} — {l.title}
                          {isDone && <span className="ml-2 text-accent text-xs">✓</span>}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {l.phrases.length} phrases · {l.coachingNotes.length} coaching notes
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </button>
                  );
                })}
              </div>

              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3 mt-6">Final Challenge</h3>
              <button
                onClick={() => setView("scenario")}
                className="w-full flex items-center justify-between bg-accent/10 border border-accent/20 rounded-xl p-4"
              >
                <div className="text-left">
                  <p className="text-sm font-semibold">{module.scenarioExercise.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Situational exercise with Vibe Meter</p>
                </div>
                <ChevronRight className="w-4 h-4 text-accent" />
              </button>
            </motion.div>
          )}

          {view === "lesson" && lesson && (
            <motion.div key="lesson" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
              <h2 className="text-xl font-medium mb-4">{lesson.title}</h2>

              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Useful Phrases</h3>
              <div className="space-y-3 mb-6">
                {lesson.phrases.map((p, i) => (
                  <div key={i} className="bg-card rounded-xl p-4 shadow-sm">
                    <p className="text-sm font-medium mb-1">{p.phrase}</p>
                    <p className="text-xs text-muted-foreground">{p.usage}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Coaching Notes</h3>
              <div className="space-y-3 mb-6">
                {lesson.coachingNotes.map((note, i) => (
                  <div key={i} className="bg-accent/10 border border-accent/20 rounded-xl p-4">
                    <p className="text-sm leading-relaxed">{note}</p>
                  </div>
                ))}
              </div>

              {lesson.situation && (
                <div className="mb-6">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Scenario</h3>
                  <div className="glass-dark rounded-2xl p-5 text-glass-foreground">
                    <p className="text-xs font-bold tracking-wider text-accent mb-2">{lesson.situation.title}</p>
                    <p className="text-sm leading-relaxed opacity-90 mb-4">{lesson.situation.prompt}</p>
                    <details className="group">
                      <summary className="text-xs text-accent cursor-pointer font-semibold">Show coaching response</summary>
                      <p className="text-sm leading-relaxed opacity-80 mt-3 border-t border-glass-foreground/10 pt-3">
                        {lesson.situation.coachingResponse}
                      </p>
                    </details>
                  </div>
                </div>
              )}

              {exercise ? (
                <button
                  onClick={async () => {
                    await handleLessonComplete();
                    setView("exercise");
                  }}
                  className="w-full py-3.5 rounded-xl bg-cta text-cta-foreground font-semibold text-sm"
                >
                  Practice Exercises
                </button>
              ) : (
                <button
                  onClick={async () => {
                    await handleLessonComplete();
                    setView("scenario");
                  }}
                  className="w-full py-3.5 rounded-xl bg-accent text-accent-foreground font-semibold text-sm"
                >
                  Go to Final Challenge
                </button>
              )}
            </motion.div>
          )}

          {view === "exercise" && exercise && (
            <FillGapExercise exercise={exercise} onComplete={handleExerciseComplete} />
          )}

          {view === "scenario" && (
            <ScenarioExercise
              moduleTitle={module.title}
              moduleNumber={module.number}
              scenario={module.scenarioExercise}
              onComplete={() => handleScenarioComplete()}
            />
          )}

          {view === "complete" && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-5">
                <PartyPopper className="w-10 h-10 text-accent" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Module Complete!</h2>
              <p className="text-sm text-muted-foreground mb-8 max-w-xs">
                Great work on {module.title}. You're building real communication skills.
              </p>
              {nextModule ? (
                <button
                  onClick={() => { navigate(`/module/${nextModule.id}`); setView("overview"); setActiveLessonIdx(0); }}
                  className="w-full py-3.5 rounded-xl bg-cta text-cta-foreground font-semibold text-sm"
                >
                  Next Module: {nextModule.title}
                </button>
              ) : (
                <button
                  onClick={() => navigate("/")}
                  className="w-full py-3.5 rounded-xl bg-accent text-accent-foreground font-semibold text-sm"
                >
                  Back to Home
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </AppLayout>
  );
};

export default ModuleDetail;
