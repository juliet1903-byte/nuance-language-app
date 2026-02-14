import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, Check, RotateCcw, PartyPopper } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { modules } from "@/data/modules";
import BottomNav from "@/components/BottomNav";
import SocialTranslator from "@/components/SocialTranslator";

type View = "overview" | "lesson" | "exercise" | "complete";

const ModuleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [translatorOpen, setTranslatorOpen] = useState(false);
  const [view, setView] = useState<View>("overview");
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState<Set<string>>(new Set());

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

  const handleCheck = () => {
    if (!exercise) return;
    const newErrors = new Set<string>();
    exercise.items.forEach((item) => {
      const userAnswer = (answers[item.id] || "").trim().toLowerCase();
      if (userAnswer !== item.answer.toLowerCase()) {
        newErrors.add(item.id);
      }
    });
    setErrors(newErrors);
    setChecked(true);
    if (newErrors.size === 0) {
      setTimeout(() => setView("complete"), 800);
    }
  };

  const handleRedo = () => {
    setAnswers({});
    setChecked(false);
    setErrors(new Set());
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="flex items-center gap-3 px-5 pt-6 pb-4">
        <button
          onClick={() => (view === "overview" ? navigate("/") : setView("overview"))}
          className="p-2 -ml-2 rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <p className="text-xs text-muted-foreground font-medium">Module {module.number}</p>
          <h1 className="text-lg font-semibold">{module.title}</h1>
        </div>
      </header>

      <main className="px-5">
        <AnimatePresence mode="wait">
          {/* OVERVIEW */}
          {view === "overview" && (
            <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p className="text-sm text-muted-foreground mb-6">{module.description}</p>

              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Lessons</h3>
              <div className="space-y-2">
                {module.lessons.map((l, i) => (
                  <button
                    key={l.id}
                    onClick={() => {
                      setActiveLessonIdx(i);
                      setView("lesson");
                    }}
                    className="w-full flex items-center justify-between bg-card rounded-xl p-4 shadow-sm"
                  >
                    <div className="text-left">
                      <p className="text-sm font-semibold">
                        {module.number}.{i + 1} — {l.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {l.phrases.length} phrases · {l.coachingNotes.length} coaching notes
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* LESSON */}
          {view === "lesson" && lesson && (
            <motion.div key="lesson" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
              <h2 className="text-xl font-medium mb-4">{lesson.title}</h2>

              {/* Phrases */}
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Useful Phrases</h3>
              <div className="space-y-3 mb-6">
                {lesson.phrases.map((p, i) => (
                  <div key={i} className="bg-card rounded-xl p-4 shadow-sm">
                    <p className="text-sm font-medium mb-1">{p.phrase}</p>
                    <p className="text-xs text-muted-foreground">{p.usage}</p>
                  </div>
                ))}
              </div>

              {/* Coaching Notes */}
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Coaching Notes</h3>
              <div className="space-y-3 mb-6">
                {lesson.coachingNotes.map((note, i) => (
                  <div key={i} className="bg-accent/10 border border-accent/20 rounded-xl p-4">
                    <p className="text-sm leading-relaxed">{note}</p>
                  </div>
                ))}
              </div>

              {/* Situation */}
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

              {/* Practice Button */}
              {exercise && (
                <button
                  onClick={() => {
                    setView("exercise");
                    handleRedo();
                  }}
                  className="w-full py-3.5 rounded-xl bg-cta text-cta-foreground font-semibold text-sm"
                >
                  Practice Exercises
                </button>
              )}

              {!exercise && (
                <button
                  onClick={() => setView("complete")}
                  className="w-full py-3.5 rounded-xl bg-accent text-accent-foreground font-semibold text-sm"
                >
                  Mark as Complete
                </button>
              )}
            </motion.div>
          )}

          {/* EXERCISE */}
          {view === "exercise" && exercise && (
            <motion.div key="exercise" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
              <h2 className="text-xl font-medium mb-2">Practice</h2>
              <p className="text-sm text-muted-foreground mb-4">{exercise.instruction}</p>

              {exercise.wordBank && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {exercise.wordBank.map((w) => (
                    <span key={w} className="text-xs bg-card px-3 py-1.5 rounded-full font-medium shadow-sm">
                      {w}
                    </span>
                  ))}
                </div>
              )}

              <div className="space-y-4 mb-6">
                {exercise.items.map((item) => (
                  <div key={item.id}>
                    <p className="text-sm mb-2">{item.prompt}</p>
                    <input
                      value={answers[item.id] || ""}
                      onChange={(e) => setAnswers((p) => ({ ...p, [item.id]: e.target.value }))}
                      className={`w-full px-4 py-3 rounded-xl text-sm bg-card outline-none border-2 transition-colors ${
                        checked && errors.has(item.id)
                          ? "border-destructive"
                          : checked && !errors.has(item.id)
                          ? "border-accent"
                          : "border-transparent"
                      }`}
                      placeholder="Your answer..."
                    />
                    {checked && errors.has(item.id) && (
                      <p className="text-xs text-destructive mt-1 font-medium">
                        Hint: the answer is "{item.answer}"
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {!checked ? (
                <button onClick={handleCheck} className="w-full py-3.5 rounded-xl bg-cta text-cta-foreground font-semibold text-sm">
                  Check Answers
                </button>
              ) : errors.size > 0 ? (
                <button onClick={handleRedo} className="w-full py-3.5 rounded-xl bg-vibe-blunt text-cta-foreground font-semibold text-sm flex items-center justify-center gap-2">
                  <RotateCcw className="w-4 h-4" /> Redo Exercise
                </button>
              ) : null}
            </motion.div>
          )}

          {/* COMPLETE */}
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
                  onClick={() => {
                    navigate(`/module/${nextModule.id}`);
                    setView("overview");
                    setActiveLessonIdx(0);
                  }}
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

      <BottomNav onTranslatorOpen={() => setTranslatorOpen(true)} />
      <SocialTranslator open={translatorOpen} onClose={() => setTranslatorOpen(false)} />
    </div>
  );
};

export default ModuleDetail;
