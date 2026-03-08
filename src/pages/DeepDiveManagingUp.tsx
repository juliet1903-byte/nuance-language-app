import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Tag, RotateCcw, AArrowUp, AArrowDown } from "lucide-react";
import { useState } from "react";
import deepDiveImage from "@/assets/deep-dive-managing-up.png";
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
            <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${flipped ? "text-cta-foreground/70" : "text-muted-foreground"}`}>
              {flipped ? "🔓 Real meaning" : "📣 They said"}
            </p>
            <p className={`text-base font-medium leading-relaxed ${flipped ? "text-cta-foreground" : "text-foreground"}`}>
              {flipped ? back : front}
            </p>
          </div>
          <RotateCcw className={`w-4 h-4 shrink-0 mt-0.5 transition-transform ${flipped ? "rotate-180 text-cta-foreground/70" : "text-muted-foreground"}`} />
        </div>
      </div>
    </button>
  );
};

const DeepDiveManagingUp = () => {
  const navigate = useNavigate();
  const { textSize, textSizeClass, cycleTextSize } = useTextSize();

  const flipCards = [
    {
      front: '"Great work on that project!" (in passing, no detail)',
      back: "Likely means: I do not remember what you did, but I know you did something and I want to seem engaged. They have not actually reviewed it. If you need real feedback, ask: 'Thanks — I would love your thoughts on [specific aspect]. Can we spend 10 minutes on it in our next 1:1?'",
    },
    {
      front: '"Just do your best."',
      back: "Often means: I do not know what 'good' looks like here either, or the goalposts are unclear. This is not permission to do whatever — it is a sign they have not defined success. Ask: 'What does success look like for this? Is it [A] or [B]?'",
    },
    {
      front: '"I trust you to figure this out."',
      back: "Possible meanings: (1) I genuinely trust you and I am giving you autonomy. (2) I do not have time to help you right now. (3) I do not know the answer myself. Ask: 'Just to confirm — are you saying I should proceed independently, or would you like me to check in at key decision points?'",
    },
    {
      front: '"Let me think about it and get back to you."',
      back: "Often means: I am not ready to say no, but I am also not saying yes. This is a soft decline or a way to delay. If they do not follow up in 48 hours, they have probably decided not to do it. Follow up: 'I know you are busy — is there anything I can provide to help you make a decision on this?'",
    },
    {
      front: '"This is a priority."',
      back: "Does not mean: Drop everything else. Means: This matters, but I have not told you what to deprioritize. Ask: 'Understood — to make room for this, should I push back [X] or [Y]?' Forces them to clarify trade-offs.",
    },
    {
      front: '"I need you to be more proactive."',
      back: "Often means: You are waiting for me to tell you what to do, and I do not have time. Or: You are not bringing me solutions, only problems. Ask: 'Can you give me an example of what proactive looks like in this context?' Get specifics.",
    },
    {
      front: '"I will handle it." (after you raise a problem)',
      back: "Possible meanings: (1) I will actually handle it. (2) I heard you but I am not going to do anything. (3) I do not want you escalating this further. If nothing changes in a week, follow up: 'Checking in on [issue] — is there anything I should be doing on my end while you handle it?'",
    },
    {
      front: '"You are doing fine." (when you ask for feedback)',
      back: "Often means: I do not have time to give you real feedback right now, or I am conflict-avoidant and I do not want to tell you what is actually wrong. Push gently: 'I appreciate that — is there one thing I could improve or do differently that would make me more effective?'",
    },
  ];

  const knowledgeCheck = [
    {
      q: "Your manager says 'I trust you to figure this out' on a complex project with no prior context. What should you do?",
      options: [
        "A. Take it as a vote of confidence and proceed independently",
        "B. Ask: 'Just to confirm — are you saying I should proceed independently, or would you like me to check in at key decision points?'",
        "C. Ask for a detailed plan and sign-off before starting",
        "D. Escalate to your skip-level manager for clarity",
      ],
      answer: "B",
      explanation: "Clarifies whether this is real autonomy or a brush-off. Forces them to be explicit.",
    },
    {
      q: "Your manager keeps adding 'urgent' tasks without telling you what to deprioritize. You are now working evenings. What do you say?",
      options: [
        "A. Nothing — this is just the job",
        "B. 'I cannot keep working evenings. You need to help me prioritize.'",
        "C. 'I want to make sure I am focused on the right things. To make room for this new task, should I push back [X] or [Y]?'",
        "D. Start looking for a new job immediately",
      ],
      answer: "C",
      explanation: "Forces your manager to make the trade-off explicit. Protects you and gets clarity.",
    },
    {
      q: "You ask your manager for feedback and they say 'You are doing fine.' You want more detailed feedback. What do you say next?",
      options: [
        "A. Accept the answer and move on",
        "B. 'Fine is not good enough — I need to know what I am doing wrong.'",
        "C. 'I appreciate that — but if I want to get to the next level, what is the one area where I have the most room to grow?'",
        "D. Ask a peer for feedback instead and do not bring it up again",
      ],
      answer: "C",
      explanation: "Acknowledges their response but pushes for actionable feedback. Most managers will give something.",
    },
    {
      q: "Your manager verbally agrees to a decision in a 1:1, but two weeks later claims they never agreed. What should you have done differently?",
      options: [
        "A. Nothing — your manager is lying",
        "B. Recorded the conversation",
        "C. Sent a follow-up email after the 1:1: 'Just confirming we agreed to [X]. I will proceed unless I hear otherwise.'",
        "D. Asked them to put it in writing during the meeting",
      ],
      answer: "C",
      explanation: "Always document decisions in writing. Memories are unreliable. Paper trail protects you.",
    },
    {
      q: "Your manager cancels your 1:1 for the third week in a row. You need clarity on priorities. What do you do?",
      options: [
        "A. Wait for them to reschedule",
        "B. Send a passive-aggressive message: 'I notice our 1:1s keep getting cancelled...'",
        "C. Send a message: 'I know you are slammed — I have three quick questions I need answered to unblock my work. Can I get 10 minutes today or should I proceed with my best guess and update you?'",
        "D. Complain to HR about your manager",
      ],
      answer: "C",
      explanation: "Acknowledges their constraint, makes it easy to help you, and gives you cover to proceed if they do not respond.",
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
        <span className="font-semibold truncate text-base flex-1">Managing Up</span>
        <button onClick={cycleTextSize} className="p-1.5 rounded-lg hover:bg-card transition-colors" aria-label="Change text size">
          {textSize === "x-large" ? <AArrowDown className="w-5 h-5" /> : <AArrowUp className="w-5 h-5" />}
        </button>
      </header>

      <article className={`max-w-2xl mx-auto px-5 pb-20 ${textSizeClass}`}>
        {/* Hero */}
        <div className="relative -mx-5 mb-8">
          <img src={deepDiveImage} alt="Managing Up" className="w-full h-56 md:h-72 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-5 right-5">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-sm text-white px-2.5 py-1 rounded-md mb-2">
              <Tag className="w-3 h-3" /> Deep Dive
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">Managing Up: How to Work With Your Manager</h1>
          </div>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-8">
          <span className="flex items-center gap-1 text-sm"><Clock className="w-3.5 h-3.5" /> 15 min read</span>
          <span className="bg-card px-2.5 py-1 rounded-full font-medium text-sm">Career</span>
        </div>

        {/* Lead */}
        <p className="text-base md:text-lg leading-relaxed mb-8 font-medium border-l-2 border-cta pl-4 text-secondary-foreground">
          The most underestimated skill in your career — and how to get better at it.
        </p>

        <div className="space-y-8 text-foreground">
          {/* Intro */}
          <section>
            <p className="text-muted-foreground leading-relaxed text-base">
              Your relationship with your manager is the single biggest factor in whether you are happy at work, whether you get promoted, and whether you leave. Yet most people treat it as something that just happens to them — they get assigned a manager and hope it works out.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4 text-base">
              Good managers make this easy. They set clear expectations, give regular feedback, advocate for you in promotion discussions, and protect your time. But most managers are not good at all of these things — and even good managers have blindspots, bad weeks, or conflicting priorities that mean you cannot rely on them to manage the relationship for you.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4 text-base">
              Managing up is not about manipulation or politics. It is about taking responsibility for making the relationship work, regardless of whether your manager is excellent, mediocre, or actively difficult.
            </p>
            <div className="bg-cta/10 border border-cta/20 rounded-xl p-4 mt-4">
              <p className="text-foreground text-base font-medium">
                Managing up is not about managing your manager. It is about managing your own success within the constraints of who your manager actually is.
              </p>
            </div>
          </section>

          {/* Why Most People Get This Wrong */}
          <section>
            <h2 className="text-xl mb-3 font-semibold">Why Most People Get This Wrong</h2>
            <p className="text-muted-foreground leading-relaxed text-base mb-4">
              The most common mistakes people make with their managers all stem from the same assumption: that good work speaks for itself, and a good manager will notice, clarify, and advocate without being asked. This assumption is wrong for three reasons:
            </p>
            <ul className="space-y-3 text-muted-foreground text-base">
              <li className="flex gap-2"><span className="text-foreground font-medium shrink-0">•</span><span><strong className="text-foreground">Your manager is overwhelmed.</strong> They have their own deadlines, their own manager, and 5–10 other direct reports. They do not have time to notice everything you do or infer what you need.</span></li>
              <li className="flex gap-2"><span className="text-foreground font-medium shrink-0">•</span><span><strong className="text-foreground">Your manager does not know what you do not tell them.</strong> If you are stuck, frustrated, or unclear on priorities, and you do not say so explicitly, they will assume everything is fine.</span></li>
              <li className="flex gap-2"><span className="text-foreground font-medium shrink-0">•</span><span><strong className="text-foreground">Your manager's job is not to make you successful.</strong> Their job is to deliver outcomes for the business. Making you successful is only valuable to them if it helps them deliver those outcomes. You have to connect the dots.</span></li>
            </ul>
          </section>

          {/* Flip Cards */}
          <section>
            <h2 className="text-xl mb-2 font-semibold">What Your Manager Really Means</h2>
            <p className="text-muted-foreground mb-4 text-base">
              These phrases sound supportive on the surface but often carry different meanings. Tap each card to reveal what's really going on.
            </p>
            <div className="space-y-3">
              {flipCards.map((card, i) => (
                <FlipCard key={i} front={card.front} back={card.back} />
              ))}
            </div>
          </section>

          {/* Five Conversations */}
          <section>
            <h2 className="text-xl mb-3 font-semibold">The Five Conversations Your Manager Needs You to Drive</h2>
            <p className="text-muted-foreground leading-relaxed mb-6 text-base">
              Most people wait for their manager to initiate important conversations. But good managers are busy, and mediocre managers avoid difficult conversations entirely. If you wait for them to bring these up, they may never happen.
            </p>

            {[
              {
                num: "1",
                title: "The Expectations Conversation",
                body: "This is the most important conversation to have in your first 30 days with a new manager — and most people never have it. The goal is to get explicit clarity on what success looks like, so you are not guessing. Do not accept vague answers. If they say 'just do great work,' push for specifics.",
                tips: [
                  '"What does good look like in this role from your perspective?"',
                  '"If I am wildly successful in the next six months, what will I have achieved?"',
                  '"What are the things that would concern you if you saw them in my work?"',
                  '"How do you prefer to work together — should I bring you problems or solutions?"',
                ],
              },
              {
                num: "2",
                title: "The Priorities Conversation (Every Week)",
                body: "Your manager has more priorities than you have time. If you do not actively clarify which ones matter most this week, you will spend time on things that do not matter and get frustrated when your manager asks why something else is not done.",
                tips: [
                  '"I am currently working on [A], [B], and [C]. Is that still the right priority order?"',
                  '"If I can only finish two of these this week, which two matter most?"',
                  '"[New request] just came in. Should I pause [existing work] to do this, or does it wait?"',
                ],
              },
              {
                num: "3",
                title: "The Feedback Conversation (Proactively)",
                body: "Do not wait for performance review season to ask for feedback. By then, it is too late to act on it. Ask for feedback regularly — and make it easy for your manager to give it by being specific about what you want feedback on.",
                tips: [
                  '"I want to make sure I am prioritizing the right things — is there anything in how I am approaching [project] that you would do differently?"',
                  '"I have been working on [skill] — have you noticed improvement, or is there something specific I should focus on?"',
                  '"If there is one thing I could do differently that would make me more effective, what would it be?"',
                ],
              },
              {
                num: "4",
                title: "The Advocacy Conversation (Before Promotion Cycles)",
                body: "Your manager cannot advocate for you if they do not remember what you have done or if they do not have language to describe your impact in terms that matter to senior leadership. You have to give them the material.",
                tips: [
                  "A one-page summary of your major contributions over the past 6–12 months, framed as business outcomes.",
                  "Examples of next-level work you have already done.",
                  '"I would like to be considered for promotion to [level] in this cycle. Based on what I have delivered, do you think that is realistic? If not, what is missing?"',
                ],
              },
              {
                num: "5",
                title: "The Problem Conversation (When Something Is Wrong)",
                body: "This is the hardest conversation to initiate, and the one people avoid the longest. If your workload is unsustainable, if expectations are unclear, if you are being asked to do something you think is wrong — you have to raise it. Waiting makes it worse.",
                tips: [
                  '"I want to flag something that I think is becoming a problem. [Describe factually]. I want to address it before it gets worse."',
                  '"I am concerned about [situation]. Here is what I am seeing: [facts]. I think if we do not address it, [consequence]."',
                  '"I may have misunderstood expectations here. I thought [X], but it seems like [Y]. Can we align on this?"',
                ],
              },
            ].map((conv) => (
              <div key={conv.num} className="mb-6">
                <h3 className="text-lg font-semibold mb-2">{conv.num}. {conv.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-base mb-3">{conv.body}</p>
                <div className="bg-card rounded-xl p-4 border border-border/50">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">📋 What to say</p>
                  <ul className="space-y-2">
                    {conv.tips.map((tip, i) => (
                      <li key={i} className="text-foreground italic text-base">"{tip}"</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </section>

          {/* Difficult Manager Types */}
          <section>
            <h2 className="text-xl mb-3 font-semibold">How to Handle Difficult Manager Types</h2>
            <p className="text-muted-foreground leading-relaxed mb-6 text-base">
              Not all managers are good. You cannot change who your manager is, but you can adapt your approach to work with them more effectively.
            </p>

            {[
              {
                emoji: "🌊",
                title: "The Overwhelmed Manager",
                signs: "Constantly cancels 1:1s, responds to messages days later, seems frazzled, says yes to everything then does not follow through.",
                tips: [
                  "Be ultra-concise. Lead with the ask or decision needed, not the context.",
                  "Do not expect them to remember past conversations. Recap decisions in writing.",
                  "Propose solutions, not problems.",
                  "Ask for delegation authority: 'Would you like me to make this decision and just update you?'",
                ],
              },
              {
                emoji: "🙈",
                title: "The Conflict-Avoidant Manager",
                signs: "Gives vague feedback, avoids decisions, says 'let me think about it' and never follows up.",
                tips: [
                  "Force decisions. Give them two options and ask which they prefer.",
                  "Document decisions in writing immediately after verbal agreements.",
                  "Do not expect them to protect your time. You have to say no yourself.",
                  "Seek feedback elsewhere — from peers, skip-level managers, or other teams.",
                ],
              },
              {
                emoji: "🔍",
                title: "The Micromanager",
                signs: "Wants to review everything, rewrites your work, asks for constant status updates.",
                tips: [
                  "Over-communicate proactively. Send updates before they ask.",
                  "Show your work early and often.",
                  "Frame your work as refining their ideas: 'Based on your direction, here is what I put together.'",
                  "Accept that you will not get full autonomy. The question is whether the role is still worth it.",
                ],
              },
              {
                emoji: "👻",
                title: "The Hands-Off Manager",
                signs: "Never gives feedback, rarely available, assumes everything is fine, provides no direction.",
                tips: [
                  "Manage yourself. Set your own goals and share them.",
                  "Ask for feedback from peers and other stakeholders.",
                  "Build relationships with skip-level managers and adjacent teams.",
                  "Recognize the upside: high autonomy. Use it to build visibility.",
                ],
              },
            ].map((type) => (
              <div key={type.title} className="bg-card rounded-xl p-4 border border-border/50 mb-4">
                <p className="font-semibold mb-1 text-base">{type.emoji} {type.title}</p>
                <p className="text-muted-foreground text-sm mb-3 italic">Signs: {type.signs}</p>
                <ul className="space-y-1.5">
                  {type.tips.map((tip, i) => (
                    <li key={i} className="text-muted-foreground text-base flex gap-2">
                      <span className="text-foreground shrink-0">→</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Knowledge Check */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">✅ Knowledge Check</h2>
              {submitted && (
                <button
                  onClick={() => { setAnswers({}); setSubmitted(false); }}
                  className="text-xs text-cta font-semibold"
                >
                  Retry
                </button>
              )}
            </div>
            <p className="text-muted-foreground mb-6 text-base">
              Test your managing up skills. Choose the best response for each scenario.
            </p>

            <div className="space-y-6">
              {knowledgeCheck.map((item, qi) => (
                <div key={qi} className="bg-card rounded-xl p-4 border border-border/50">
                  <p className="mb-3 text-base font-medium">Q{qi + 1}. {item.q}</p>
                  <div className="space-y-2">
                    {item.options.map((opt) => {
                      const letter = opt[0];
                      const isSelected = answers[qi] === letter;
                      const isCorrect = letter === item.answer;
                      let style = "bg-background border border-border/50 text-muted-foreground";
                      if (submitted) {
                        if (isCorrect) style = "bg-green-500/10 border border-green-500/30 text-green-700 dark:text-green-400";
                        else if (isSelected && !isCorrect) style = "bg-destructive/10 border border-destructive/30 text-destructive";
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
                  {Object.entries(answers).filter(([qi, a]) => a === knowledgeCheck[Number(qi)].answer).length} / {knowledgeCheck.length} correct
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {Object.entries(answers).filter(([qi, a]) => a === knowledgeCheck[Number(qi)].answer).length === knowledgeCheck.length
                    ? "Perfect score! 🎉"
                    : "Review the explanations above to learn more."}
                </p>
              </div>
            )}
          </section>

          {/* Closing */}
          <section>
            <div className="bg-cta/10 border border-cta/20 rounded-xl p-4">
              <p className="text-foreground text-base font-medium">
                Managing up is not optional. It is how you protect your time, get the support you need, and make sure your work actually matters.
              </p>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
};

export default DeepDiveManagingUp;
