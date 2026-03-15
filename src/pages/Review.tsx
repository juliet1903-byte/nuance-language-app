import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RotateCcw, Check, PartyPopper, HelpCircle } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { useReview, ReviewCard, ReviewRating } from "@/hooks/useReview";
import { useAuth } from "@/components/AuthContext";

const ratingConfig: {value: ReviewRating;label: string;color: string;desc: string;}[] = [
{ value: "again", label: "Again", color: "bg-destructive/10 text-destructive border-destructive/20", desc: "Forgot" },
{ value: "hard", label: "Hard", color: "bg-[hsl(var(--vibe-blunt))]/10 text-[hsl(var(--vibe-blunt))] border-[hsl(var(--vibe-blunt))]/20", desc: "Struggled" },
{ value: "good", label: "Good", color: "bg-cta/10 text-cta border-cta/20", desc: "Recalled" },
{ value: "easy", label: "Easy", color: "bg-accent/10 text-accent border-accent/20", desc: "Instant" }];


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
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-5">
          <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-5">
            <HelpCircle className="w-10 h-10 text-muted-foreground/50" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Review Cards</h2>
          <p className="text-muted-foreground text-center max-w-xs text-base mb-6">
            Sign in to access your review cards and track your learning progress.
          </p>
          <button
            onClick={() => navigate("/auth")}
            className="py-3 px-8 rounded-xl bg-cta text-cta-foreground font-semibold text-sm"
          >
            Sign In or Sign Up
          </button>
        </div>
      </AppLayout>);
  }

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-8 h-8 border-2 border-cta border-t-transparent rounded-full animate-spin" />
        </div>
      </AppLayout>);

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
      <header className="flex items-center gap-3 px-5 pt-6 pb-4 md:max-w-[900px] md:mx-auto md:w-full">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-lg font-medium">Review</h1>
          <p className="text-muted-foreground text-sm">
            {totalCards} cards total · {dueCards.length} due now
          </p>
        </div>
      </header>

      <main className="px-5 pb-24 md:max-w-[900px] md:mx-auto md:w-full">
        {/* Progress bar */}
        {totalDue > 0 &&
        <div className="mb-6">
            <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
              <span>{reviewedCount} reviewed</span>
              <span>{dueCards.length} remaining</span>
            </div>
            <div className="h-2 rounded-full bg-secondary overflow-hidden">
              <motion.div
              className="h-full bg-cta rounded-full"
              initial={{ width: 0 }}
              animate={{ width: totalDue > 0 ? `${reviewedCount / totalDue * 100}%` : "0%" }}
              transition={{ duration: 0.4 }} />
            
            </div>
          </div>
        }

        <AnimatePresence mode="wait">
          {currentCard ?
          <motion.div
            key={currentCard.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}>
            
              {/* Card */}
              <button
              onClick={() => setFlipped(!flipped)}
              className="w-full text-left"
              style={{ perspective: 1000 }}>
              
                <motion.div
                className="w-full min-h-[220px] rounded-2xl shadow-sm relative"
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{ transformStyle: "preserve-3d" }}>
                
                  {/* Front */}
                  <div
                  className="absolute inset-0 rounded-2xl p-6 flex flex-col justify-center bg-card border border-border"
                  style={{ backfaceVisibility: "hidden" }}>
                  
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-semibold">
                      {currentCard.module_id.replace(/-/g, " ")}
                    </p>
                    <p className="text-lg font-medium leading-relaxed">{currentCard.card_front}</p>
                    <p className="text-sm text-muted-foreground/50 mt-4 flex items-center gap-1.5">
                      <RotateCcw className="w-3.5 h-3.5" /> Tap to reveal
                    </p>
                  </div>

                  {/* Back */}
                  <div
                  className="absolute inset-0 rounded-2xl p-6 flex flex-col justify-center bg-cta/5 border border-cta/20"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                  
                    <p className="text-lg leading-relaxed">{currentCard.card_back}</p>
                  </div>
                </motion.div>
              </button>

              {/* Rating buttons — only show when flipped */}
              <AnimatePresence>
                {flipped &&
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6">
                
                    <p className="text-sm text-muted-foreground mb-3 text-center">How well did you remember?</p>
                    <div className="grid grid-cols-4 gap-2">
                      {ratingConfig.map((r) =>
                  <button
                    key={r.value}
                    onClick={() => handleRate(r.value)}
                    disabled={animatingOut}
                    className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl border text-sm font-medium transition-all active:scale-95 ${r.color}`}>
                    
                          <span className="text-base">{r.label}</span>
                          <span className="text-xs opacity-70">{r.desc}</span>
                        </button>
                  )}
                    </div>
                  </motion.div>
              }
              </AnimatePresence>

              {/* Interval info */}
              <div className="mt-4 text-center">
                <p className="text-xs text-muted-foreground">
                  Reviewed {currentCard.repetitions} time{currentCard.repetitions !== 1 ? "s" : ""} · 
                  Next interval: {currentCard.interval_days}d
                </p>
              </div>
            </motion.div> :

          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-16 text-center">
            
              {reviewedCount > 0 ?
            <>
                  <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-5">
                    <PartyPopper className="w-10 h-10 text-accent" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">All caught up!</h2>
                  <p className="text-muted-foreground mb-2 max-w-xs text-base">
                    You reviewed {reviewedCount} card{reviewedCount !== 1 ? "s" : ""}. Come back later for more.
                  </p>
                </> :

            <>
                  <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-5">
                    <HelpCircle className="w-10 h-10 text-muted-foreground/50" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">No cards due</h2>
                  <p className="text-muted-foreground mb-2 max-w-xs text-base">
                    {totalCards > 0 ?
                "All your cards are reviewed. Check back later!" :
                "Start completing lessons to build your review deck. Flashcards from each lesson will appear here automatically."}
                  </p>
                </>
            }
              <button
              onClick={() => navigate(totalCards > 0 && reviewedCount > 0 ? "/dashboard" : "/library")}
              className="mt-6 py-3 px-8 rounded-xl bg-cta text-cta-foreground font-semibold text-sm">
              
                {reviewedCount > 0 ? "Back to Dashboard" : totalCards > 0 ? "Back to Dashboard" : "Go to Library"}
              </button>
            </motion.div>
          }
        </AnimatePresence>
      </main>
    </AppLayout>);

};

export default Review;