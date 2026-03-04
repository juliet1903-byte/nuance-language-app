import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, RotateCcw, X } from "lucide-react";

export interface WordOrderItem {
  id: string;
  correctSentence: string;
  scrambledWords: string[];
}

interface WordOrderExerciseProps {
  instruction: string;
  items: WordOrderItem[];
  onComplete: () => void;
}

const WordOrderExercise = ({ instruction, items, onComplete }: WordOrderExerciseProps) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>(items[0]?.scrambledWords || []);
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);

  const current = items[currentIdx];

  const handleTapWord = (word: string, fromIdx: number) => {
    if (checked) return;
    setSelectedWords((prev) => [...prev, word]);
    setAvailableWords((prev) => {
      const next = [...prev];
      next.splice(fromIdx, 1);
      return next;
    });
  };

  const handleRemoveWord = (idx: number) => {
    if (checked) return;
    const word = selectedWords[idx];
    setSelectedWords((prev) => {
      const next = [...prev];
      next.splice(idx, 1);
      return next;
    });
    setAvailableWords((prev) => [...prev, word]);
  };

  const handleCheck = () => {
    const userSentence = selectedWords.join(" ").trim();
    const correct = current.correctSentence.trim();
    const match = userSentence.toLowerCase() === correct.toLowerCase();
    setIsCorrect(match);
    setChecked(true);
    if (match) {
      setCompletedCount((c) => c + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < items.length) {
      const nextIdx = currentIdx + 1;
      setCurrentIdx(nextIdx);
      setSelectedWords([]);
      setAvailableWords(items[nextIdx].scrambledWords);
      setChecked(false);
      setIsCorrect(false);
    } else {
      onComplete();
    }
  };

  const handleRetry = () => {
    setSelectedWords([]);
    setAvailableWords(current.scrambledWords);
    setChecked(false);
    setIsCorrect(false);
  };

  return (
    <motion.div key="word-order" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
      <h2 className="font-medium mb-2 text-2xl">Word Order</h2>
      <p className="text-muted-foreground mb-1 text-base">{instruction}</p>
      <p className="text-xs text-muted-foreground mb-5">
        {currentIdx + 1} of {items.length}
      </p>

      {/* Answer area */}
      <div className="bg-card rounded-xl p-4 shadow-sm mb-4 min-h-[60px]">
        <div className="flex flex-wrap gap-2">
          <AnimatePresence mode="popLayout">
            {selectedWords.map((word, i) => (
              <motion.button
                key={`${word}-${i}`}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => handleRemoveWord(i)}
                disabled={checked}
                className={`text-s px-4 py-2 rounded-full font-medium shadow-sm transition-all ${
                  checked
                    ? isCorrect
                      ? "bg-accent/10 border border-accent text-accent"
                      : "bg-destructive/10 border border-destructive text-destructive"
                    : "bg-cta/10 border border-cta/30 text-cta active:scale-95"
                }`}
              >
                {word}
              </motion.button>
            ))}
          </AnimatePresence>
          {selectedWords.length === 0 && (
            <p className="text-muted-foreground/40 py-2 text-sm">Tap words below to build the sentence…</p>
          )}
        </div>
      </div>

      {/* Word bank */}
      <div className="flex flex-wrap gap-2 mb-6">
        {availableWords.map((word, i) => (
          <motion.button
            key={`${word}-${i}`}
            onClick={() => handleTapWord(word, i)}
            disabled={checked}
            className="px-4 py-2 rounded-full font-medium shadow-sm bg-card text-foreground active:scale-95 transition-all text-base"
            whileTap={{ scale: 0.9 }}
          >
            {word}
          </motion.button>
        ))}
      </div>

      {/* Result feedback */}
      {checked && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-xl p-4 mb-4 ${
            isCorrect ? "bg-accent/10 border border-accent/20" : "bg-destructive/10 border border-destructive/20"
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            {isCorrect ? <Check className="w-4 h-4 text-accent" /> : <X className="w-4 h-4 text-destructive" />}
            <p className="text-sm font-semibold">{isCorrect ? "Correct!" : "Not quite right"}</p>
          </div>
          {!isCorrect && (
            <p className="text-xs text-muted-foreground mt-1">
              Correct: <span className="italic">{current.correctSentence}</span>
            </p>
          )}
        </motion.div>
      )}

      {/* Actions */}
      {!checked ? (
        <button
          onClick={handleCheck}
          disabled={selectedWords.length === 0}
          className="w-full py-3.5 rounded-xl bg-cta text-cta-foreground font-semibold text-sm disabled:opacity-40 transition-opacity"
        >
          Check
        </button>
      ) : isCorrect ? (
        <button
          onClick={handleNext}
          className="w-full py-3.5 rounded-xl bg-cta text-cta-foreground font-semibold text-sm"
        >
          {currentIdx + 1 < items.length ? "Next" : "Continue"}
        </button>
      ) : (
        <button
          onClick={handleRetry}
          className="w-full py-3.5 rounded-xl bg-vibe-blunt text-cta-foreground font-semibold text-sm flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" /> Try Again
        </button>
      )}
    </motion.div>
  );
};

export default WordOrderExercise;
