import { Check, Lock, CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthContext";
import { useProgress } from "@/hooks/useProgress";
import LoginBanner from "@/components/LoginBanner";

const LEVEL_META = [
  { id: "natural-flow", title: "Natural Flow", subtitle: "Foundations of speech" },
  { id: "specialist", title: "The Specialist", subtitle: "Mastering communication techniques" },
  { id: "collaborator", title: "The Collaborator", subtitle: "Team dynamics & empathy" },
  { id: "influencer", title: "The Influencer", subtitle: "Visionary leadership" },
];

const LEVEL_MODULE_MAP: Record<string, string[]> = {
  "natural-flow": ["dei-fundamentals", "career-moves"],
  specialist: ["starting-strong", "meeting-room"],
  collaborator: ["across-cultures", "difficult-convos"],
  influencer: ["managing-up", "common-mistakes"],
};

const guestSteps = LEVEL_META.map((m, i) => ({
  ...m,
  completed: false,
  active: i === 0,
  progress: undefined as number | undefined,
}));

const LearningPath = () => {
  const navigate = useNavigate();
  const { isGuest, user } = useAuth();
  const showBanner = isGuest || !user;
  const { completedModules, completedLessons, streakDays } = useProgress();

  const steps = showBanner
    ? guestSteps
    : (() => {
        let foundActive = false;
        return LEVEL_META.map((meta) => {
          const moduleIds = LEVEL_MODULE_MAP[meta.id];
          const doneCount = moduleIds.filter((mid) => completedModules.has(mid)).length;
          const completed = doneCount === moduleIds.length;

          // Simple progress based on modules done in level
          const progress = Math.round((doneCount / moduleIds.length) * 100);

          if (completed) return { ...meta, completed, active: false, progress: undefined };
          if (!foundActive) {
            foundActive = true;
            return { ...meta, completed, active: true, progress: progress > 0 ? progress : undefined };
          }
          return { ...meta, completed, active: false, progress: undefined };
        });
      })();

  return (
    <button
      onClick={() => navigate("/progress")}
      className="w-full text-left bg-card rounded-2xl p-5 shadow-sm px-[16px] py-[12px] active:scale-[0.99] transition-transform"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">My Learning Path</h2>
        {!showBanner && (
          <span className="flex items-center gap-1.5 text-sm lg:text-base px-3 py-1.5 rounded-full font-medium text-cta bg-secondary">
            <CalendarDays className="w-3.5 h-3.5" /> {streakDays}
          </span>
        )}
      </div>

      <div className="space-y-0">
        {steps.map((step, i) => (
          <div key={step.id} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                  step.completed
                    ? "bg-accent text-accent-foreground"
                    : step.active
                    ? "border-2 border-accent bg-background"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step.completed ? (
                  <Check className="w-4 h-4" />
                ) : step.active ? (
                  <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                ) : (
                  <Lock className="w-3 h-3 text-white" />
                )}
              </div>
              {i < steps.length - 1 && <div className="w-px flex-1 bg-border" />}
            </div>

            <div className="pb-4 pt-0.5">
              <p className="font-semibold text-sm lg:text-base">{step.title}</p>
              <p className="text-xs lg:text-base text-muted-foreground">{step.subtitle}</p>
              {step.active && step.progress && (
                <div className="mt-2">
                  <div className="w-44 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full transition-all"
                      style={{ width: `${step.progress}%` }}
                    />
                  </div>
                  <p className="text-xs lg:text-base text-accent mt-1 font-medium">
                    {step.progress}% complete
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </button>
  );
};

export default LearningPath;
