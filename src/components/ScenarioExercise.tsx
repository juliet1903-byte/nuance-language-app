import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, Loader2, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useRequestLimit } from "@/hooks/useRequestLimit";

interface ScenarioExerciseProps {
  moduleTitle: string;
  moduleNumber: number;
  scenario: {
    title: string;
    context: string;
    prompt: string;
  };
  onComplete: (vibeScore: number) => void;
}

interface EvaluationResult {
  vibeScore: number;
  feedback: string;
  coachTips: string[];
  strengths: string[];
}

const ScenarioExercise = ({ moduleTitle, moduleNumber, scenario, onComplete }: ScenarioExerciseProps) => {
  const [response, setResponse] = useState("");
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [needlePosition, setNeedlePosition] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const MAX_CHARS = parseInt(import.meta.env.VITE_MAX_INPUT_CHARS ?? "350", 10);
  const charToastShown = useRef(false);
  const { isLimitReached, requestsLeft, requestsLimit, isGuest, consume, syncFromServer } = useRequestLimit();

  const handleSubmit = useCallback(async () => {
    if (!response.trim() || isLoading) return;

    const allowed = await consume();
    if (!allowed) return;

    setIsLoading(true);
    setResult(null);
    setNeedlePosition(null);
    setShowTips(false);

    try {
      const { data, error } = await supabase.functions.invoke("scenario-evaluate", {
        body: {
          moduleTitle,
          moduleNumber,
          scenario,
          userResponse: response.trim(),
        },
      });

      if (error) throw error;
      if (data?.error === "daily_limit_reached") {
        syncFromServer?.();
        toast({
          title: "Daily limit reached",
          description: `You've used all ${requestsLimit} AI requests for today. Come back tomorrow!`,
          variant: "destructive",
        });
        return;
      }
      if (data?.error) throw new Error(data.error);

      const res = data as EvaluationResult;
      setResult(res);

      // Animate needle: start at 15 (low), sweep to actual score
      setNeedlePosition(15);
      setTimeout(() => {
        setNeedlePosition(res.vibeScore);
      }, 400);
    } catch (e: unknown) {
      console.error("Scenario evaluation error:", e);
      toast({
        title: "Couldn't evaluate your response",
        description: "Something went wrong on our end. Give it another try.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [response, isLoading, moduleTitle, moduleNumber, scenario, consume, syncFromServer, requestsLimit]);

  const passed = result && result.vibeScore >= 50;

  return (
    <motion.div key="scenario" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
      <div className="mb-5">
        <p className="text-xs font-semibold tracking-wider text-accent uppercase mb-1">
          Module {moduleNumber} — Final Challenge
        </p>
        <h2 className="font-medium mb-2 text-2xl">{scenario.title}</h2>
      </div>

      {/* Scenario Context */}
      <div className="glass-dark rounded-2xl p-5 text-glass-foreground mb-5">
        <p className="font-bold tracking-wider text-accent mb-2 text-sm">SITUATION</p>
        <p className="leading-relaxed opacity-90 mb-3 text-base font-normal">{scenario.context}</p>
        <p className="leading-relaxed text-base font-normal">{scenario.prompt}</p>
      </div>

      {/* User Response */}
      {!result && (
        <>
          <label className="font-semibold tracking-wider text-muted-foreground uppercase mb-2 block text-sm">
            Your Response
          </label>
          <div className="bg-card rounded-xl p-4 mb-5 shadow-sm">
            <textarea
              value={response}
              onChange={(e) => {
                const newValue = e.target.value;
                if (newValue.length > MAX_CHARS) {
                  if (!charToastShown.current) {
                    toast({ title: "Character limit reached", description: `Max ${MAX_CHARS} characters allowed.`, variant: "destructive" });
                    charToastShown.current = true;
                  }
                  setResponse(newValue.slice(0, MAX_CHARS));
                } else {
                  charToastShown.current = false;
                  setResponse(newValue);
                }
              }}
              placeholder="Write what you would actually say in this situation..."
              className={`w-full bg-transparent resize-none outline-none text-foreground min-h-[120px] text-base${response.length >= MAX_CHARS ? " opacity-50 cursor-not-allowed" : ""}`}
            />
            <div className="flex justify-between mt-1">
              <span className={`text-xs ${response.length >= MAX_CHARS ? "text-destructive" : "text-muted-foreground"}`}>
                {response.length}/{MAX_CHARS}
              </span>
            </div>
          </div>

          {!isLimitReached && requestsLeft <= 2 && (
            <p className="text-xs text-muted-foreground text-right mb-2">
              {requestsLeft} AI {requestsLeft === 1 ? "request" : "requests"} remaining today
            </p>
          )}

          {isLimitReached ? (
            <div className="w-full py-4 rounded-xl bg-muted border border-border text-center">
              <p className="font-semibold text-muted-foreground text-base">
                Daily limit reached ({requestsLimit} requests/day)
              </p>
              <p className="text-sm text-muted-foreground mt-0.5">
                {isGuest ? "Sign up for more daily requests" : "Resets at midnight"}
              </p>
              {isGuest && (
                <a
                  href="/auth"
                  className="mt-2 inline-block text-sm font-semibold text-accent underline"
                >
                  Create a free account
                </a>
              )}
            </div>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!response.trim() || isLoading}
              className="w-full py-3.5 rounded-xl bg-cta text-cta-foreground font-semibold text-base disabled:opacity-40 transition-opacity flex items-center justify-center gap-2base"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Evaluating…
                </>
              ) : (
                "Submit Response"
              )}
            </button>
          )}
        </>
      )}

      {/* Result */}
      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Vibe Meter */}
            <label className="text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-2 block">
              Your Nuance Score
            </label>
            <div className="relative mb-1" style={{ height: 24 }}>
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2 rounded-full bg-gradient-to-r from-vibe-blunt via-muted to-vibe-nuanced" />
              {needlePosition !== null && (
                <motion.div
                  className="absolute rounded-full bg-foreground border-2 border-card shadow-md"
                  style={{ width: 24, height: 24, top: 0 }}
                  initial={{ opacity: 0, left: `calc(${needlePosition}% - 12px)` }}
                  animate={{ opacity: 1, left: `calc(${needlePosition}% - 12px)` }}
                  transition={{ type: "spring", damping: 20, stiffness: 150 }}
                />
              )}
            </div>
            <div className="flex justify-between text-xs font-semibold mb-5">
              <span className="text-vibe-blunt text-sm">Blunt</span>
              <span className="text-vibe-nuanced text-sm">Nuanced</span>
            </div>

            {/* Feedback */}
            <div className="glass-dark rounded-2xl p-5 text-glass-foreground mb-5">
              <p className="font-bold tracking-wider text-accent mb-2 text-sm">FEEDBACK</p>
              <p className="leading-relaxed opacity-90 mb-4 text-base">{result.feedback}</p>

              {result.strengths.length > 0 && (
                <div className="mb-4">
                  <p className="font-bold tracking-wider text-accent mb-2 text-sm">WHAT WORKED</p>
                  <ul className="space-y-1">
                    {result.strengths.map((s, i) => (
                      <li key={i} className="opacity-90 flex items-start gap-2 text-base">
                        <span className="text-accent mt-0.5">✓</span> {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Coach Tips Toggle */}
              <AnimatePresence>
                {showTips && result.coachTips.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-3 rounded-xl bg-accent/20 border border-accent/30"
                  >
                    <p className="font-bold tracking-wider text-accent mb-2 text-sm">COACH'S TIPS</p>
                    <ul className="space-y-2">
                      {result.coachTips.map((tip, i) => (
                        <li key={i} className="leading-relaxed opacity-90 text-base">
                          💡 {tip}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-end mt-3">
                <button
                  onClick={() => setShowTips((p) => !p)}
                  className={`p-2 rounded-full transition-colors ${showTips ? "bg-accent/30" : "bg-glass-foreground/10"}`}
                >
                  <HelpCircle className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Continue */}
            <button
              onClick={
                passed
                  ? () => onComplete(result!.vibeScore)
                  : () => {
                      setResult(null);
                      setNeedlePosition(null);
                    }
              }
              className={`w-full py-3.5 rounded-xl font-semibold text-base flex items-center justify-center gap-2 ${
                passed ? "bg-accent text-accent-foreground" : "bg-cta text-cta-foreground"
              }`}
            >
              {passed ? (
                <>
                  Complete Module <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                "Try Again"
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ScenarioExercise;
