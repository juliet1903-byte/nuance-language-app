import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Check } from "lucide-react";

interface ExerciseItem {
  id: string;
  prompt: string;
  answer: string;
}

interface Exercise {
  type: string;
  instruction: string;
  wordBank?: string[];
  items: ExerciseItem[];
}

interface FillGapExerciseProps {
  exercise: Exercise;
  onComplete: () => void;
}

const FillGapExercise = ({ exercise, onComplete }: FillGapExerciseProps) => {
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState<Set<string>>(new Set());
  const [bankUsed, setBankUsed] = useState<Set<string>>(new Set());

  const handleTapWord = (word: string) => {
    if (checked) return;

    // Find the first unfilled gap
    const nextGap = exercise.items.find((item) => !selections[item.id]);
    if (!nextGap) return;

    setSelections((prev) => ({ ...prev, [nextGap.id]: word }));
    setBankUsed((prev) => new Set([...prev, `${nextGap.id}:${word}`]));
  };

  const handleTapGap = (itemId: string) => {
    if (checked) return;
    const word = selections[itemId];
    if (!word) return;

    setSelections((prev) => {
      const next = { ...prev };
      delete next[itemId];
      return next;
    });
    setBankUsed((prev) => {
      const next = new Set(prev);
      next.delete(`${itemId}:${word}`);
      return next;
    });
  };

  const handleCheck = () => {
    const newErrors = new Set<string>();
    exercise.items.forEach((item) => {
      const userAnswer = (selections[item.id] || "").trim().toLowerCase();
      if (userAnswer !== item.answer.toLowerCase()) {
        newErrors.add(item.id);
      }
    });
    setErrors(newErrors);
    setChecked(true);
    if (newErrors.size === 0) {
      setTimeout(() => onComplete(), 800);
    }
  };

  const handleRedo = () => {
    setSelections({});
    setChecked(false);
    setErrors(new Set());
    setBankUsed(new Set());
  };

  const allFilled = exercise.items.every((item) => selections[item.id]);

  // Build used word counts to handle duplicates in bank
  const usedWords = Object.values(selections);

  const getHint = (item: ExerciseItem) => {
    const answer = item.answer;
    if (answer.length <= 3) return `${answer.length} letters`;
    return `Starts with "${answer.slice(0, 2)}…" (${answer.split(" ").length} word${answer.split(" ").length > 1 ? "s" : ""})`;
  };

  return (
    <motion.div key="exercise" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
      <h2 className="font-medium mb-2 text-2xl">Practice</h2>
      <p className="text-muted-foreground mb-4 text-base">{exercise.instruction}</p>

      {/* Word Bank */}
      {exercise.wordBank && (
        <div className="flex flex-wrap gap-2 mb-5">
          {exercise.wordBank.map((w, i) => {
            // Count how many times this word appears in used selections
            const usedCount = usedWords.filter((uw) => uw?.toLowerCase() === w.toLowerCase()).length;
            const bankCount = exercise
              .wordBank!.filter((bw) => bw.toLowerCase() === w.toLowerCase())
              .slice(0, i + 1).length;
            const isUsed = usedCount >= bankCount;

            return (
              <motion.button
                key={`${w}-${i}`}
                onClick={() => !isUsed && handleTapWord(w)}
                className={`text-s px-4 py-2 rounded-full font-medium shadow-sm transition-all ${
                  isUsed ? "bg-muted/50 text-muted-foreground/40 scale-95" : "bg-card text-foreground active:scale-95"
                }`}
                whileTap={!isUsed ? { scale: 0.9 } : undefined}
                disabled={isUsed || checked}
              >
                {w}
              </motion.button>
            );
          })}
        </div>
      )}

      {/* Gap Items */}
      <div className="space-y-4 mb-6">
        {exercise.items.map((item) => {
          const parts = item.prompt.split("_____");
          const selected = selections[item.id];
          const hasError = checked && errors.has(item.id);
          const isCorrect = checked && !errors.has(item.id) && selected;

          return (
            <div key={item.id} className="bg-card rounded-xl p-4 shadow-sm">
              <p className="leading-relaxed text-base">
                {parts[0]}
                <button
                  onClick={() => handleTapGap(item.id)}
                  className={`inline-flex items-center min-w-[80px] min-h-[28px] px-3 py-1 mx-1 rounded-lg text-sm font-medium transition-all border-2 ${
                    selected
                      ? hasError
                        ? "bg-destructive/10 border-destructive text-destructive"
                        : isCorrect
                          ? "bg-accent/10 border-accent text-accent"
                          : "bg-cta/10 border-cta text-cta"
                      : "bg-muted/40 border-dashed border-muted-foreground/30 text-muted-foreground/50"
                  }`}
                >
                  {selected || "     "}
                  {isCorrect && <Check className="w-3 h-3 ml-1" />}
                </button>
                {parts[1]}
              </p>
              {hasError && <p className="text-xs text-muted-foreground mt-2 italic">💡 {getHint(item)}</p>}
            </div>
          );
        })}
      </div>

      {/* Actions */}
      {!checked ? (
        <button
          onClick={handleCheck}
          disabled={!allFilled}
          className="w-full py-3.5 rounded-xl bg-cta text-cta-foreground font-semibold text-sm disabled:opacity-40 transition-opacity"
        >
          Check Answers
        </button>
      ) : errors.size > 0 ? (
        <button
          onClick={handleRedo}
          className="w-full py-3.5 rounded-xl bg-vibe-blunt text-cta-foreground font-semibold text-sm flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" /> Try Again
        </button>
      ) : null}
    </motion.div>
  );
};

export default FillGapExercise;
