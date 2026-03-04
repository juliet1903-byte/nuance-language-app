import { useState } from "react";
import { motion } from "framer-motion";
import { Check, RotateCcw } from "lucide-react";

export interface Flashcard {
  front: string;
  back: string;
}

interface FlashcardExerciseProps {
  cards: Flashcard[];
  onComplete: () => void;
}

const FlashcardExercise = ({ cards, onComplete }: FlashcardExerciseProps) => {
  const [flippedSet, setFlippedSet] = useState<Set<number>>(new Set());
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const handleFlip = (index: number) => {
    setActiveCard(activeCard === index ? null : index);
    setFlippedSet((prev) => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  };

  const allFlipped = flippedSet.size === cards.length;

  return (
    <motion.div
      key="flashcards"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}>
      
      <h2 className="text-xl font-medium mb-2">Flashcards</h2>
      <p className="text-muted-foreground mb-5 text-base">
        Tap each card to reveal its meaning. Flip all cards to continue.
      </p>

      <div className="grid gap-3">
        {cards.map((card, i) => {
          const isFlipped = activeCard === i;
          const wasFlipped = flippedSet.has(i);

          return (
            <motion.button
              key={i}
              onClick={() => handleFlip(i)}
              className="relative w-full min-h-[100px] rounded-xl shadow-sm text-left overflow-hidden"
              style={{ perspective: 800 }}
              whileTap={{ scale: 0.98 }}>
              
              <motion.div
                className="w-full h-full"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{ transformStyle: "preserve-3d" }}>
                
                {/* Front */}
                <div
                  className={`absolute inset-0 rounded-xl p-4 flex items-center backface-hidden ${
                  wasFlipped && !isFlipped ?
                  "bg-accent/10 border border-accent/20" :
                  "bg-card border border-border"}`
                  }
                  style={{ backfaceVisibility: "hidden" }}>
                  
                  <div className="flex-1">
                    <p className="font-medium leading-relaxed text-base">{card.front}</p>
                  </div>
                  {wasFlipped && !isFlipped &&
                  <Check className="w-4 h-4 text-accent flex-shrink-0 ml-2" />
                  }
                  {!wasFlipped &&
                  <RotateCcw className="w-4 h-4 text-muted-foreground/40 flex-shrink-0 ml-2" />
                  }
                </div>

                {/* Back */}
                <div
                  className="absolute inset-0 rounded-xl p-4 flex items-center bg-cta/10 border border-cta/20"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)"
                  }}>
                  
                  <p className="text-sm leading-relaxed text-foreground">{card.back}</p>
                </div>
              </motion.div>
            </motion.button>);

        })}
      </div>

      <div className="mt-4 text-center">
        <p className="text-muted-foreground mb-4 text-sm">
          {flippedSet.size}/{cards.length} cards flipped
        </p>
      </div>

      {allFlipped &&
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={onComplete}
        className="w-full py-3.5 rounded-xl bg-cta text-cta-foreground font-semibold text-sm">
        
          Continue
        </motion.button>
      }
    </motion.div>);

};

export default FlashcardExercise;