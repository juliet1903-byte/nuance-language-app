import { useState, useCallback, useRef } from "react";
import { X, Mic, HelpCircle, Copy, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

type Tone = "neutral" | "colleague" | "leader";

interface TranslationResult {
  sections: {label: string;content: string;}[];
  rawVibeScore: number;
  translatedVibeScore: number;
  coachTip: string;
}

interface SocialTranslatorProps {
  open: boolean;
  onClose: () => void;
}

const SocialTranslator = ({ open, onClose }: SocialTranslatorProps) => {
  const [input, setInput] = useState("");
  const [tone, setTone] = useState<Tone>("colleague");
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [needlePosition, setNeedlePosition] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showCoachTip, setShowCoachTip] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);

  const handleMic = useCallback(() => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast({ title: "Not supported", description: "Speech recognition is not available in this browser.", variant: "destructive" });
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = true;
    recognitionRef.current = recognition;

    let finalTranscript = input;

    recognition.onresult = (event: any) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += (finalTranscript ? " " : "") + transcript;
        } else {
          interim = transcript;
        }
      }
      setInput(finalTranscript + (interim ? " " + interim : ""));
    };

    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => setIsRecording(false);

    recognition.start();
    setIsRecording(true);
  }, [isRecording, input]);

  const handleTranslate = useCallback(async () => {
    if (!input.trim() || isLoading) return;
    setIsLoading(true);
    setResult(null);
    setShowCoachTip(false);

    try {
      const { data, error } = await supabase.functions.invoke("social-translate", {
        body: { rawText: input, tone }
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      const res = data as TranslationResult;
      setResult(res);

      // 1. Show needle at raw score
      setNeedlePosition(res.rawVibeScore);

      // 2. After a beat, sweep needle to translated score
      setTimeout(() => {
        setNeedlePosition(res.translatedVibeScore);
      }, 600);
    } catch (e: any) {
      console.error("Translation error:", e);
      toast({
        title: "Translation failed",
        description: e.message || "Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [input, tone, isLoading]);

  const handleClear = () => {
    setInput("");
    setResult(null);
    setNeedlePosition(null);
    setShowCoachTip(false);
  };

  const handleCopy = () => {
    if (!result) return;
    const text = result.sections.map((s) => s.content).join(" ");
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard" });
  };

  const tones: {value: Tone;label: string;}[] = [
  { value: "neutral", label: "Neutral" },
  { value: "colleague", label: "Colleague" },
  { value: "leader", label: "Leader" }];


  return (
    <AnimatePresence>
      {open &&
      <>
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-foreground/20 z-50"
          onClick={onClose} />

          <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl max-h-[90vh] overflow-y-auto bg-background border-t border-border/50">

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
              <div className="relative rounded-xl p-4 mb-5 bg-card border border-border">
                <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type something"
                className="w-full bg-transparent resize-none outline-none text-foreground min-h-[100px] text-sm" />

                <div className="flex justify-end gap-2 mt-1">
                  {input &&
                <button onClick={handleClear} className="p-2 rounded-full bg-muted/60 text-muted-foreground">
                      <X className="w-4 h-4" />
                    </button>
                }
                  <button
                    onClick={handleMic}
                    className={`p-2 rounded-full transition-colors ${isRecording ? "bg-destructive text-destructive-foreground animate-pulse" : "bg-muted/60 text-muted-foreground"}`}
                  >
                    <Mic className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Vibe Meter */}
              <label className="text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-2 block">
                The Vibe Meter
              </label>
              <div className="relative mb-1" style={{ height: 24 }}>
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2 rounded-full bg-gradient-to-r from-vibe-blunt via-muted to-vibe-nuanced" />

                {/* Solid needle – hidden until translate */}
                {needlePosition !== null &&
              <motion.div
                className="absolute rounded-full bg-foreground border-2 border-card shadow-md"
                style={{ width: 24, height: 24, top: 0 }}
                initial={{ opacity: 0, left: `calc(${needlePosition}% - 12px)` }}
                animate={{ opacity: 1, left: `calc(${needlePosition}% - 12px)` }}
                transition={{ type: "spring", damping: 20, stiffness: 150 }} />

              }
              </div>
              <div className="flex justify-between text-xs font-semibold mb-5">
                <span className="text-vibe-blunt">Blunt</span>
                <span className="text-vibe-nuanced">Nuanced</span>
              </div>

              {/* Tone Toggles */}
              <div className="flex rounded-xl p-1 mb-5 bg-secondary border border-border">
                {tones.map((t) =>
              <button
                key={t.value}
                onClick={() => setTone(t.value)}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                tone === t.value ?
                "bg-foreground text-background shadow-sm" :
                "text-muted-foreground"}`
                }>

                    {t.label}
                  </button>
              )}
              </div>

              {/* Translate Button */}
              <button
              onClick={handleTranslate}
              disabled={!input.trim() || isLoading}
              className="w-full py-4 rounded-xl bg-cta text-cta-foreground font-semibold text-lg disabled:opacity-40 transition-opacity flex items-center justify-center gap-2">

                {isLoading ?
              <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Translating…
                  </> :

              "Translate"
              }
              </button>

              {/* Result */}
              <AnimatePresence>
                {result &&
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-5 glass-dark rounded-2xl p-5 text-glass-foreground">

                    {result.sections.map((s) =>
                <div key={s.label} className="mb-4 last:mb-0">
                        <p className="text-xs font-bold tracking-wider text-accent mb-1">{s.label}</p>
                        <p className="text-sm leading-relaxed opacity-90">{s.content}</p>
                      </div>
                )}

                    {/* Coach's Tip */}
                    <AnimatePresence>
                      {showCoachTip && result.coachTip &&
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 p-3 rounded-xl bg-accent/20 border border-accent/30">

                          <p className="text-xs font-bold tracking-wider text-accent mb-1">COACH'S TIP</p>
                          <p className="text-sm leading-relaxed opacity-90">{result.coachTip}</p>
                        </motion.div>
                  }
                    </AnimatePresence>

                    <div className="flex justify-end gap-2 mt-4">
                      <button
                    onClick={() => setShowCoachTip((p) => !p)}
                    className={`p-2 rounded-full transition-colors ${showCoachTip ? "bg-accent/30" : "bg-glass-foreground/10"}`}>

                        <HelpCircle className="w-4 h-4" />
                      </button>
                      <button onClick={handleCopy} className="p-2 rounded-full bg-glass-foreground/10">
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
              }
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      }
    </AnimatePresence>);

};

export default SocialTranslator;