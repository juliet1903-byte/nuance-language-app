import { useNavigate } from "react-router-dom";
import { ArrowLeft, Target, Clock, Zap, TrendingUp } from "lucide-react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import AppLayout from "@/components/AppLayout";

// ---------- Mock data ----------

const LIFETIME_VIBE = 72; // 0–100
const IMPACT_GROWTH = 34; // percentage improvement

const toneData = [
  { name: "Leader Mode", value: 62 },
  { name: "Colleague Mode", value: 38 },
];
const TONE_COLORS = ["hsl(152, 40%, 46%)", "hsl(228, 80%, 56%)"];

const firstTimeAccuracy = 78; // percent
const learningHours = 4;
const learningMinutes = 35;
const masteryAverage = 4.2;

// ---------- Vibe Meter SVG ----------

const VibeMeter = ({ score }: { score: number }) => {
  const cx = 110;
  const cy = 110;
  const r = 90;

  // Animate a single value (angle in radians) from π to target
  const targetTheta = Math.PI - (score / 100) * Math.PI;
  const theta = useMotionValue(Math.PI); // start at left (Blunt)

  const circleX = useTransform(theta, (t) => cx + r * Math.cos(t));
  const circleY = useTransform(theta, (t) => cy - r * Math.sin(t));

  useEffect(() => {
    const controls = animate(theta, targetTheta, {
      type: "spring",
      stiffness: 40,
      damping: 12,
      delay: 0.3,
    });
    return controls.stop;
  }, [targetTheta]);

  return (
    <div className="w-full max-w-[320px] mx-auto">
      <div className="relative">
        <svg viewBox="0 0 220 130" className="w-full">
          <defs>
            <linearGradient id="vibe-arc" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="hsl(14, 80%, 52%)" />
              <stop offset="25%" stopColor="hsl(30, 50%, 55%)" />
              <stop offset="38%" stopColor="hsl(36, 15%, 82%)" />
              <stop offset="50%" stopColor="hsl(36, 12%, 84%)" />
              <stop offset="62%" stopColor="hsl(36, 15%, 82%)" />
              <stop offset="75%" stopColor="hsl(80, 45%, 50%)" />
              <stop offset="100%" stopColor="hsl(152, 40%, 46%)" />
            </linearGradient>
          </defs>

          {/* Coloured arc */}
          <path
            d="M 20 110 A 90 90 0 0 1 200 110"
            fill="none"
            stroke="url(#vibe-arc)"
            strokeWidth="22"
            strokeLinecap="round"
          />

          {/* Indicator circle — follows the arc via motion values */}
          <motion.circle
            r="8"
            fill="hsl(var(--foreground))"
            stroke="hsl(var(--card))"
            strokeWidth="3"
            cx={circleX}
            cy={circleY}
          />

          {/* Labels */}
          <text x="6" y="132" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="start">
            Blunt
          </text>
          <text x="214" y="132" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="end">
            Nuanced
          </text>
        </svg>
      </div>

      {/* Score below the meter */}
      <div className="flex flex-col items-center -mt-6">
        <span className="text-4xl font-semibold">{score}</span>
        <span className="text-caption text-muted-foreground">Lifetime Vibe IQ</span>
      </div>
    </div>
  );
};

// ---------- Page ----------

const Stats = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      {/* Header */}
      <header className="flex items-center gap-3 px-5 pt-6 pb-4 md:max-w-[900px] md:mx-auto md:w-full">
        <button onClick={() => navigate("/")} className="p-2 -ml-2 rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold">Stats</h1>
      </header>

      <main className="px-5 space-y-6 pb-8 md:max-w-[900px] md:mx-auto md:w-full">
        {/* ========= HERO: Vibe IQ Mastery ========= */}
        <section className="bg-card rounded-2xl p-6 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Vibe IQ Mastery
          </h2>

          <VibeMeter score={LIFETIME_VIBE} />

          {/* Impact Growth badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center mt-5"
          >
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-accent/15 text-accent text-sm font-semibold">
              <TrendingUp className="w-4 h-4" />
              Impact Growth: +{IMPACT_GROWTH}%
            </span>
          </motion.div>

          {/* Tone Profile */}
          <div className="mt-8">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Tone Profile
            </h3>

            <div className="flex items-center gap-4">
              <div className="w-24 h-24 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={toneData}
                      cx="50%"
                      cy="50%"
                      innerRadius={28}
                      outerRadius={42}
                      dataKey="value"
                      strokeWidth={0}
                    >
                      {toneData.map((_, idx) => (
                        <Cell key={idx} fill={TONE_COLORS[idx]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-2 flex-1">
                {toneData.map((entry, idx) => (
                  <div key={entry.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: TONE_COLORS[idx] }}
                      />
                      <span className="text-sm">{entry.name}</span>
                    </div>
                    <span className="text-sm font-semibold">{entry.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs text-muted-foreground mt-3">
              Leader Mode uses the SBI Model · Colleague Mode uses Subjective Framing
            </p>
          </div>
        </section>

        {/* ========= EDUCATIONAL METRICS ========= */}
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Learning Metrics
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* First-Time Accuracy */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-2xl p-5 shadow-sm flex flex-col items-center text-center"
            >
              <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center mb-3">
                <Target className="w-5 h-5 text-accent" />
              </div>
              <span className="text-2xl font-semibold">{firstTimeAccuracy}%</span>
              <span className="text-xs text-muted-foreground mt-1">First-Time Accuracy</span>
              <span className="text-[11px] text-muted-foreground/70 mt-0.5">
                Tasks passed without Redo
              </span>
            </motion.div>

            {/* Learning Time */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-card rounded-2xl p-5 shadow-sm flex flex-col items-center text-center"
            >
              <div className="w-10 h-10 rounded-full bg-cta/15 flex items-center justify-center mb-3">
                <Clock className="w-5 h-5 text-cta" />
              </div>
              <span className="text-2xl font-semibold">
                {learningHours}h {learningMinutes}m
              </span>
              <span className="text-xs text-muted-foreground mt-1">Learning Time</span>
              <span className="text-[11px] text-muted-foreground/70 mt-0.5">
                Total hours invested
              </span>
            </motion.div>

            {/* Mastery Average */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-card rounded-2xl p-5 shadow-sm flex flex-col items-center text-center"
            >
              <div className="w-10 h-10 rounded-full bg-vibe-nuanced/15 flex items-center justify-center mb-3">
                <Zap className="w-5 h-5 text-vibe-nuanced" />
              </div>
              <span className="text-2xl font-semibold">{masteryAverage}/5</span>
              <span className="text-xs text-muted-foreground mt-1">Mastery Average</span>
              <span className="text-[11px] text-muted-foreground/70 mt-0.5">
                Mean scenario score
              </span>
            </motion.div>
          </div>
        </section>
      </main>
    </AppLayout>
  );
};

export default Stats;
