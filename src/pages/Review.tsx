import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RotateCcw, Check, Brain, PartyPopper, HelpCircle } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { useReview, ReviewCard, ReviewRating } from "@/hooks/useReview";
import { useAuth } from "@/hooks/useAuth";

const ratingConfig: { value: ReviewRating; label: string; color: string; desc: string }[] = [
  {
    value: "again",
    label: "Again",
    color: "bg-destructive/10 text-destructive border-destructive/20",
    desc: "Forgot",
  },
  {
    value: "hard",
    label: "Hard",
    color:
      "bg-[hsl(var(--vibe-blunt))]/10 text-[hsl(var(--vibe-blunt))] border-[hsl(var(--vibe-blunt))]/20",
    desc: "Struggled",
  },
  { value: "good", label: "Good", color: "bg-cta/10 text-cta border-cta/20", desc: "Recalled" },
  {
    value: "easy",
    label: "Easy",
    color: "bg-accent/10 text-accent border-accent/20",
    desc: "Instant",
  },
];

const Review = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { dueCards, totalCards, loading, reviewCard } = useReview();
  const [flipped, setFlipped] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [animatingOut, setAnimatingOut] = useState(false);

  if (!user) {
    return (
      <AppLayout>
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-5">
          <HelpCircle className="mb-4 h-12 w-12 text-muted-foreground/30" />
          <p className="text-center text-muted-foreground">Sign in to access your review cards.</p>
        </div>
      </AppLayout>
    );
  }

  if (loading) {
    return (
      <AppLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-cta border-t-transparent" />
        </div>
      </AppLayout>
    );
  }

  const currentCard = dueCards[0];
  const totalDue = dueCards.length + reviewedCount;

  const handleRate = async (rating: ReviewRating) => {
    if (!currentCard || animatingOut) return;
    setAnimatingOut(true);
    await reviewCard(currentCard.id, rating);
    setReviewedCount((c) => c + 1);
    setFlipped(false);
    setAnimatingOut(false);
  };

  return (
    <AppLayout>
      <header className="flex items-center gap-3 px-5 pb-4 pt-6 md:mx-auto md:w-full md:max-w-[900px]">
        <button onClick={() => navigate(-1)} className="-ml-2 rounded-full p-2">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-lg font-medium">Review</h1>
          <p className="text-sm text-muted-foreground">
            {totalCards} cards total · {dueCards.length} due now
          </p>
        </div>
      </header>

      <main className="px-5 pb-24 md:mx-auto md:w-full md:max-w-[900px]">
        {/* Progress bar */}
        {totalDue > 0 && (
          <div className="mb-6">
            <div className="mb-1.5 flex justify-between text-xs text-muted-foreground">
              <span>{reviewedCount} reviewed</span>
              <span>{dueCards.length} remaining</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-secondary">
              <motion.div
                className="h-full rounded-full bg-cta"
                initial={{ width: 0 }}
                animate={{ width: totalDue > 0 ? `${(reviewedCount / totalDue) * 100}%` : "0%" }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {currentCard ? (
            <motion.div
              key={currentCard.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
            >
              {/* Card */}
              <button
                onClick={() => setFlipped(!flipped)}
                className="w-full text-left"
                style={{ perspective: 1000 }}
              >
                <motion.div
                  className="relative min-h-[220px] w-full rounded-2xl shadow-sm"
                  animate={{ rotateY: flipped ? 180 : 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Front */}
                  <div
                    className="absolute inset-0 flex flex-col justify-center rounded-2xl border border-border bg-card p-6"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {currentCard.module_id.replace(/-/g, " ")}
                    </p>
                    <p className="text-lg font-medium leading-relaxed">{currentCard.card_front}</p>
                    <p className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground/50">
                      <RotateCcw className="h-3.5 w-3.5" /> Tap to reveal
                    </p>
                  </div>

                  {/* Back */}
                  <div
                    className="absolute inset-0 flex flex-col justify-center rounded-2xl border border-cta/20 bg-cta/5 p-6"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    <p className="text-lg leading-relaxed">{currentCard.card_back}</p>
                  </div>
                </motion.div>
              </button>

              {/* Rating buttons — only show when flipped */}
              <AnimatePresence>
                {flipped && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-6"
                  >
                    <p className="mb-3 text-center text-sm text-muted-foreground">
                      How well did you remember?
                    </p>
                    <div className="grid grid-cols-4 gap-2">
                      {ratingConfig.map((r) => (
                        <button
                          key={r.value}
                          onClick={() => handleRate(r.value)}
                          disabled={animatingOut}
                          className={`flex flex-col items-center gap-1 rounded-xl border px-2 py-3 text-sm font-medium transition-all active:scale-95 ${r.color}`}
                        >
                          <span className="text-base">{r.label}</span>
                          <span className="text-xs opacity-70">{r.desc}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Interval info */}
              <div className="mt-4 text-center">
                <p className="text-xs text-muted-foreground">
                  Reviewed {currentCard.repetitions} time{currentCard.repetitions !== 1 ? "s" : ""}{" "}
                  · Next interval: {currentCard.interval_days}d
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              {reviewedCount > 0 ? (
                <>
                  <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-accent/20">
                    <PartyPopper className="h-10 w-10 text-accent" />
                  </div>
                  <h2 className="mb-2 text-2xl font-semibold">All caught up!</h2>
                  <p className="mb-2 max-w-xs text-base text-muted-foreground">
                    You reviewed {reviewedCount} card{reviewedCount !== 1 ? "s" : ""}. Come back
                    later for more.
                  </p>
                </>
              ) : (
                <>
                  <h2 className="mb-2 text-2xl font-semibold">No cards due</h2>
                  <p className="mb-2 max-w-xs text-base text-muted-foreground">
                    {totalCards > 0
                      ? "All your cards are reviewed. Check back later!"
                      : "Complete lessons to build your review deck. Flashcards from each lesson will appear here automatically."}
                  </p>
                </>
              )}
              <button
                onClick={() => navigate("/dashboard")}
                className="mt-6 rounded-xl bg-cta px-8 py-3 text-sm font-semibold text-cta-foreground"
              >
                Back to Dashboard
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </AppLayout>
  );
};

export default Review;
