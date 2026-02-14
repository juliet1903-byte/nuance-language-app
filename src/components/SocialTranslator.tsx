import { useState, useCallback } from "react";
import { X, Mic, HelpCircle, Copy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Tone = "neutral" | "colleague" | "leader";

interface TranslationResult {
  text: string;
  sections?: { label: string; content: string }[];
  vibeScore: number;
}

const translateText = (input: string, tone: Tone): TranslationResult => {
  if (!input.trim()) return { text: "", vibeScore: 30 };

  if (tone === "leader") {
    return {
      text: "",
      sections: [
        {
          label: "SITUATION",
          content: `I'd like to share an observation. ${input.includes("code") ? "During the sprint, I noticed some concerns with the current approach" : "I've been reflecting on a pattern I've noticed recently"}.`,
        },
        {
          label: "BEHAVIOUR",
          content: `${input.includes("bad") ? "I noticed the implementation approach diverged from our agreed standards" : "I observed that the current direction may benefit from a different perspective"}.`,
        },
        {
          label: "IMPACT",
          content: `I think aligning on ${input.includes("system") ? "clearer architectural guidelines" : "shared expectations"} could help us stay on track. What are your thoughts?`,
        },
      ],
      vibeScore: 82,
    };
  }

  if (tone === "colleague") {
    const softened = input
      .replace(/bad/gi, "could use some attention")
      .replace(/break/gi, "impact")
      .replace(/wrong/gi, "different from what we expected");
    return {
      text: `From where I'm sitting, ${softened.charAt(0).toLowerCase() + softened.slice(1)}${softened.endsWith(".") ? "" : "."} I'd love to hear your take on this — maybe we can find a way forward together.`,
      vibeScore: 68,
    };
  }

  // Neutral
  return {
    text: `I'd like to flag something: ${input.charAt(0).toLowerCase() + input.slice(1)}${input.endsWith(".") ? "" : "."} I think it's worth discussing how we can address this.`,
    vibeScore: 50,
  };
};

interface SocialTranslatorProps {
  open: boolean;
  onClose: () => void;
}

const SocialTranslator = ({ open, onClose }: SocialTranslatorProps) => {
  const [input, setInput] = useState("");
  const [tone, setTone] = useState<Tone>("colleague");
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [animatedVibe, setAnimatedVibe] = useState(25);

  const handleTranslate = useCallback(() => {
    if (!input.trim()) return;
    const translation = translateText(input, tone);
    setResult(translation);
    // Animate vibe meter
    setTimeout(() => setAnimatedVibe(translation.vibeScore), 100);
  }, [input, tone]);

  const handleClear = () => {
    setInput("");
    setResult(null);
    setAnimatedVibe(25);
  };

  const tones: { value: Tone; label: string }[] = [
    { value: "neutral", label: "Neutral" },
    { value: "colleague", label: "Colleague" },
    { value: "leader", label: "Leader" },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/20 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-card rounded-t-3xl max-h-[90vh] overflow-y-auto"
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-muted rounded-full" />
            </div>

            <div className="px-5 pb-8">
              <h2 className="text-2xl font-semibold mb-1">Social Translator</h2>
              <p className="text-sm text-muted-foreground mb-5">
                Turn raw thoughts into leadership communication
              </p>

              {/* Input */}
              <label className="text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-2 block">
                Your Raw Thoughts
              </label>
              <div className="relative bg-background rounded-xl p-4 mb-5">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type something"
                  className="w-full bg-transparent resize-none outline-none text-foreground min-h-[100px] text-sm"
                />
                <div className="flex justify-end gap-2 mt-1">
                  {input && (
                    <button onClick={handleClear} className="p-2 rounded-full bg-muted/60 text-muted-foreground">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <button className="p-2 rounded-full bg-muted/60 text-muted-foreground">
                    <Mic className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Vibe Meter */}
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  The Vibe Meter
                </label>
                <button className="p-1 rounded-full border border-border">
                  <HelpCircle className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
              <div className="relative mb-1">
                <div className="h-2 rounded-full bg-gradient-to-r from-vibe-blunt via-yellow-400 to-vibe-nuanced" />
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-foreground border-2 border-card shadow-md"
                  animate={{ left: `calc(${animatedVibe}% - 10px)` }}
                  transition={{ type: "spring", damping: 20, stiffness: 150 }}
                />
              </div>
              <div className="flex justify-between text-xs font-semibold mb-5">
                <span className="text-vibe-blunt">Blunt</span>
                <span className="text-vibe-nuanced">Nuanced</span>
              </div>

              {/* Tone Toggles */}
              <div className="flex bg-background rounded-xl p-1 mb-5">
                {tones.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setTone(t.value)}
                    className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                      tone === t.value
                        ? "bg-foreground text-background shadow-sm"
                        : "text-muted-foreground"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Translate Button */}
              <button
                onClick={handleTranslate}
                disabled={!input.trim()}
                className="w-full py-4 rounded-xl bg-cta text-cta-foreground font-semibold text-lg disabled:opacity-40 transition-opacity"
              >
                Translate
              </button>

              {/* Result */}
              <AnimatePresence>
                {result && (result.text || result.sections) && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-5 glass-dark rounded-2xl p-5 text-glass-foreground"
                  >
                    {result.sections ? (
                      result.sections.map((s) => (
                        <div key={s.label} className="mb-4 last:mb-0">
                          <p className="text-xs font-bold tracking-wider text-accent mb-1">{s.label}</p>
                          <p className="text-sm leading-relaxed opacity-90">{s.content}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm leading-relaxed">{result.text}</p>
                    )}
                    <div className="flex justify-end gap-2 mt-4">
                      <button className="p-2 rounded-full bg-glass-foreground/10">
                        <HelpCircle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          const text = result.sections
                            ? result.sections.map((s) => `${s.label}: ${s.content}`).join("\n")
                            : result.text;
                          navigator.clipboard.writeText(text);
                        }}
                        className="p-2 rounded-full bg-glass-foreground/10"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SocialTranslator;
