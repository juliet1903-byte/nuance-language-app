import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Tag, RotateCcw, AArrowUp } from "lucide-react";
import { useState } from "react";
import articleCultures from "@/assets/article-cultures.png";
import { useTextSize } from "@/hooks/useTextSize";

interface FlipCardProps {
  front: string;
  back: string;
}

const FlipCard = ({ front, back }: FlipCardProps) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      onClick={() => setFlipped(!flipped)}
      className="w-full text-left rounded-xl border transition-all duration-300 overflow-hidden"
      style={{ minHeight: "90px" }}
    >
      <div className={`p-4 transition-all duration-300 ${flipped ? "bg-cta text-cta-foreground" : "bg-card"}`}>
        <div className="flex items-start justify-between gap-2">
          <div>
            <p
              className={`text-xs font-bold uppercase tracking-wider mb-1 ${flipped ? "text-cta-foreground/70" : "text-muted-foreground"}`}
            >
              {flipped ? "🔓 Real meaning" : "📣 They said"}
            </p>
            <p
              className={`text-base font-medium leading-relaxed ${flipped ? "text-cta-foreground" : "text-foreground"}`}
            >
              {flipped ? back : front}
            </p>
          </div>
          <RotateCcw
            className={`w-4 h-4 shrink-0 mt-0.5 transition-transform ${flipped ? "rotate-180 text-cta-foreground/70" : "text-muted-foreground"}`}
          />
        </div>
      </div>
    </button>
  );
};

const DeepDiveCultures = () => {
  const navigate = useNavigate();
  const { textSizeClass, cycleTextSize } = useTextSize();

  const flipCards = [
    {
      front: '"I\'ll have to check with my manager before I can commit."',
      back: "Likely meaning: No, but I am declining indirectly to preserve the relationship. The 'manager' may never actually be consulted.",
    },
    {
      front: '"We should explore all the options before deciding."',
      back: "Likely meaning: I do not support the current direction but I'm not stating that directly. I want more time to build a case against it.",
    },
    {
      front: '"That\'s a valid point — let me think."',
      back: "Likely meaning: I disagree but need time to formulate a response that avoids direct confrontation.",
    },
    {
      front: '"I hear what you\'re saying."',
      back: "Likely meaning: I understand your position but I do not necessarily agree with it — this is acknowledgement, not agreement.",
    },
    {
      front: '"That\'s an interesting approach..."',
      back: "Likely meaning: I have serious concerns about this direction but I am raising them indirectly.",
    },
    {
      front: '"Let\'s revisit this later."',
      back: "Likely meaning: This is probably a no, and I'm hoping the subject will be dropped by the time we revisit it.",
    },
  ];

  const knowledgeCheck = [
    {
      q: "In a project meeting, a colleague says: 'That timeline is ambitious.' What is the most likely intended meaning?",
      options: [
        "A. They think the timeline is achievable but challenging",
        "B. They are signaling that the timeline is unrealistic without saying so directly",
        "C. They are complimenting your ambition",
        "D. They need more information before they can commit",
      ],

      answer: "B",
      explanation: "'Ambitious' is often a polite way of saying 'unrealistic' in high-context communication.",
    },
    {
      q: "You propose a new process. A team member says 'I'll have to check with my manager.' They never follow up. What probably happened?",
      options: [
        "A. They forgot to ask their manager",
        "B. Their manager said no and they're avoiding telling you",
        "C. This was a polite way of declining without direct confrontation",
        "D. They are still waiting for the right moment to ask",
      ],

      answer: "C",
      explanation: "This is a soft no. The manager was likely never consulted.",
    },
    {
      q: "After presenting your idea, there is a long silence in the room. What is the safest assumption?",
      options: [
        "A. Everyone agrees and is processing the information",
        "B. People are waiting for someone senior to speak first",
        "C. Silence signals disagreement or discomfort that has not been voiced",
        "D. Both B and C are possible — silence should not be assumed to mean agreement",
      ],

      answer: "D",
      explanation: "Silence is culturally ambiguous. Never assume it means agreement.",
    },
    {
      q: "A colleague says 'Let's revisit this in a few weeks' for the third time. What should you do?",
      options: [
        "A. Wait a few more weeks and raise it again",
        "B. Recognise this is a soft no and either address the underlying concern or move on",
        "C. Escalate to their manager to get a clear answer",
        "D. Assume they are just very busy and will eventually agree",
      ],

      answer: "B",
      explanation: "Repeated deferrals are a signal to either address the real issue or move on.",
    },
    {
      q: "You're in a meeting and you're not sure if a colleague's vague response means yes or no. What should you say?",
      options: [
        "A. 'Can you be more direct? I'm not sure what you mean.'",
        "B. 'I want to make sure I've understood correctly — are you saying we should proceed, or would you like more time?'",
        "C. Say nothing and assume they will clarify later if needed",
        "D. 'In my culture we say things directly — can you just tell me yes or no?'",
      ],

      answer: "B",
      explanation:
        "This phrase clarifies without forcing direct confrontation. Options A and D are culturally tone-deaf.",
    },
  ];

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/30 px-5 py-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1.5 rounded-lg hover:bg-card transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-semibold truncate text-base">Reading Between Cultures</span>
      </header>

      <article className="max-w-2xl mx-auto px-5 pb-20">
        {/* Hero */}
        <div className="relative -mx-5 mb-8">
          <img src={articleCultures} alt="Reading Between Cultures" className="w-full h-56 md:h-72 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-5 right-5">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-sm text-white px-2.5 py-1 rounded-md mb-2">
              <Tag className="w-3 h-3" /> Deep Dive
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">Reading Between Cultures</h1>
          </div>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-8">
          <span className="flex items-center gap-1 text-sm">
            <Clock className="w-3.5 h-3.5" /> 10 min read
          </span>
          <span className="bg-card px-2.5 py-1 rounded-full font-medium text-sm">Cross-Cultural</span>
        </div>

        {/* Lead */}
        <p className="text-base md:text-lg leading-relaxed mb-8 font-medium border-l-2 border-cta pl-4 text-secondary-foreground">
          What people mean is not always what they say — and what they don't say often matters most.
        </p>

        <div className="space-y-8">
          <section>
            <p className="text-muted-foreground leading-relaxed text-base">
              Working across cultures is not just about learning idioms or avoiding taboo topics. It is about
              understanding that the same words carry different social weight in different contexts — and that what
              counts as direct, polite, or professional varies far more than most people realise.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4 text-base">
              The biggest miscommunications in international teams do not come from language barriers. They come from{" "}
              <strong className="text-foreground">context mismatches</strong>. In high-context cultures, meaning is
              embedded in the situation, the relationship, and what is left unsaid. In low-context cultures, meaning is
              expected to be explicit, direct, and unambiguous.
            </p>
            <div className="bg-cta/10 border border-cta/20 rounded-xl p-4 mt-4">
              <p className="text-foreground text-base font-medium">
                The most dangerous miscommunications are the ones where both parties think they understood each other
                perfectly.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl mb-3 font-semibold">The Signal vs The Words</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-card rounded-xl p-4 border border-border/50">
                <p className="font-semibold mb-2 text-base">🔵 Low-context cultures</p>
                <p className="text-muted-foreground text-base">
                  Northern European, North American, Australian. If you mean no, you say no. Silence is assumed to mean
                  agreement.
                </p>
              </div>
              <div className="bg-card rounded-xl p-4 border border-border/50">
                <p className="font-semibold mb-2 text-base">🟠 High-context cultures</p>
                <p className="text-muted-foreground text-base">
                  East Asian, South Asian, Middle Eastern, Southern European. Disagreement is signalled indirectly.
                  Silence is often the opposite of agreement.
                </p>
              </div>
            </div>
            <p className="text-muted-foreground mt-4 leading-relaxed text-base">
              In a meeting between high-context and low-context communicators, the high-context person thinks they have
              clearly signaled disagreement, and the low-context person thinks the issue has been resolved. Both leave
              the meeting believing the other understood them. Neither did.
            </p>
          </section>

          <section>
            <h2 className="text-xl mb-2 font-semibold">Common High-Context Signals</h2>
            <p className="text-muted-foreground mb-4 text-base">
              These phrases sound neutral or positive in English but often carry different meanings. Tap each card to
              reveal the real meaning.
            </p>
            <div className="space-y-3">
              {flipCards.map((card, i) => (
                <FlipCard key={i} front={card.front} back={card.back} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl mb-3 font-semibold">How to Respond When You're Not Sure</h2>
            <p className="text-muted-foreground leading-relaxed mb-4 text-base">
              Surface the ambiguity before acting on it. These phrases work across cultural contexts:
            </p>
            <div className="space-y-3">
              {[
                "Before I move forward, I want to make sure I've understood this correctly — are you saying we should proceed, or would you like more time to consider it?",
                "I'm hearing some hesitation — is there a concern I should address before we lock this in?",
                "I want to check: when you say 'let's revisit this later,' does that mean you'd like to see more data first, or is there a bigger issue with the direction?",
                "I don't want to misinterpret silence as agreement — does anyone have concerns they'd like to raise, even tentatively?",
              ].map((phrase, i) => (
                <div key={i} className="bg-card rounded-xl p-4 border border-border/50">
                  <p className="text-foreground italic text-base">"{phrase}"</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl mb-3 font-semibold">The Danger of 'Treating Everyone the Same'</h2>
            <p className="text-muted-foreground leading-relaxed mb-4 text-base">
              One of the most common mistakes in cross-cultural teams is the assumption that everyone should communicate
              the same way — usually meaning everyone should communicate like low-context, direct communicators.
            </p>
            <div className="bg-card rounded-xl p-4 border border-border/50 mb-4">
              <p className="text-muted-foreground leading-relaxed text-base">
                The low-context communicator is seen as clear, decisive, and straightforward. The high-context
                communicator is seen as vague, indecisive, or passive-aggressive — even when they are following the
                norms of professional communication in their own culture.
              </p>
            </div>
            <div className="bg-cta/10 border border-cta/20 rounded-xl p-4">
              <p className="font-medium text-foreground text-base">
                Cultural awareness is not about learning to speak like someone from another culture. It is about
                learning to recognise when communication styles are clashing — and knowing how to bridge the gap.
              </p>
            </div>
          </section>

          {/* Knowledge Check */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">✅ Knowledge Check</h2>
              {submitted && (
                <button
                  onClick={() => {
                    setAnswers({});
                    setSubmitted(false);
                  }}
                  className="text-xs text-cta font-semibold"
                >
                  Retry
                </button>
              )}
            </div>
            <p className="text-muted-foreground mb-6 text-base">
              Test your cross-cultural reading skills. Choose the best answer for each scenario.
            </p>

            <div className="space-y-6">
              {knowledgeCheck.map((item, qi) => (
                <div key={qi} className="bg-card rounded-xl p-4 border border-border/50">
                  <p className="mb-3 text-base font-medium">
                    Q{qi + 1}. {item.q}
                  </p>
                  <div className="space-y-2">
                    {item.options.map((opt) => {
                      const letter = opt[0];
                      const isSelected = answers[qi] === letter;
                      const isCorrect = letter === item.answer;
                      let style = "bg-background border border-border/50 text-muted-foreground";
                      if (submitted) {
                        if (isCorrect)
                          style = "bg-green-500/10 border border-green-500/30 text-green-700 dark:text-green-400";
                        else if (isSelected && !isCorrect)
                          style = "bg-destructive/10 border border-destructive/30 text-destructive";
                        else style = "bg-background border border-border/30 text-muted-foreground opacity-50";
                      } else if (isSelected) {
                        style = "bg-cta/10 border border-cta text-foreground";
                      }
                      return (
                        <button
                          key={opt}
                          disabled={submitted}
                          onClick={() => setAnswers((prev) => ({ ...prev, [qi]: letter }))}
                          className={`w-full text-left rounded-lg px-3 py-2.5 text-base transition-all ${style}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {submitted && <p className="text-muted-foreground mt-3 italic text-sm">✓ {item.explanation}</p>}
                </div>
              ))}
            </div>

            {!submitted && Object.keys(answers).length === knowledgeCheck.length && (
              <button
                onClick={() => setSubmitted(true)}
                className="mt-4 w-full py-3 rounded-xl bg-cta text-cta-foreground font-semibold text-sm"
              >
                Check Answers
              </button>
            )}

            {submitted && (
              <div className="mt-4 bg-card rounded-xl p-4 border border-border/50 text-center">
                <p className="font-bold text-lg">
                  {Object.entries(answers).filter(([qi, a]) => a === knowledgeCheck[Number(qi)].answer).length} /{" "}
                  {knowledgeCheck.length} correct
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {Object.entries(answers).filter(([qi, a]) => a === knowledgeCheck[Number(qi)].answer).length ===
                  knowledgeCheck.length
                    ? "Perfect score! 🎉"
                    : "Review the explanations above to learn more."}
                </p>
              </div>
            )}
          </section>
        </div>
      </article>
    </div>
  );
};

export default DeepDiveCultures;
