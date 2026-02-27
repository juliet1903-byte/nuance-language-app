import type { Flashcard } from "@/components/FlashcardExercise";
import type { WordOrderItem } from "@/components/WordOrderExercise";

export interface Lesson {
  id: string;
  title: string;
  phrases: { phrase: string; usage: string }[];
  coachingNotes: string[];
  situation?: { title: string; prompt: string; coachingResponse: string };
  exercises?: Exercise[];
  flashcards?: Flashcard[];
  wordOrderExercise?: { instruction: string; items: WordOrderItem[] };
}

export interface Exercise {
  type: "fill-gap" | "match" | "true-false" | "rewrite";
  instruction: string;
  wordBank?: string[];
  items: ExerciseItem[];
}

export interface ExerciseItem {
  id: string;
  prompt: string;
  answer: string;
  options?: string[];
}

export interface ScenarioExercise {
  title: string;
  context: string;
  prompt: string;
}

export interface Module {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  lessons: Lesson[];
  scenarioExercise: ScenarioExercise;
}

export const modules: Module[] = [
  {
    id: "starting-strong",
    number: 1,
    title: "Starting Strong",
    subtitle: "Introductions, onboarding, and making your mark",
    description: "How you show up in the first interactions sets the tone for everything that follows.",
    image: "module-starting-strong",
    lessons: [
      {
        id: "1-1",
        title: "Introducing Yourself",
        phrases: [
          { phrase: '"I work with [X] to [result] — so they can focus on [Y]."', usage: "Lead with the value you create, not your job category" },
          { phrase: '"I\'m still getting up to speed — but I\'d love to understand how this fits in."', usage: "First days — signals curiosity, not incompetence" },
          { phrase: '"What does good look like in this role, from your perspective?"', usage: "First one-to-one — signals you're here to add value" },
        ],
        coachingNotes: [
          "'I work with [X] to [result]' replaces 'I am a [job title]' with something that actually means something to the listener.",
          "'What does good look like?' goes one level deeper — it asks what success means from the other person's point of view.",
        ],
        situation: {
          title: "The Onboarding One-to-One",
          prompt: "You've been in your new role for two weeks. Your manager opens your one-to-one with: \"So — how are you finding it?\" You have two genuine questions about design ownership and code review.",
          coachingResponse: "\"Overall I'm really enjoying it — the team has been brilliant. Two things I'd love clarity on: ownership of design decisions, and the code review process — it varies quite a bit. Is that something I should raise with someone specific?\"",
        },
        flashcards: [
          { front: "\"I work with [X] to [result].\"", back: "A value-driven introduction that tells people why you matter, not just your job title." },
          { front: "\"Getting up to speed\"", back: "Means becoming fully informed or competent. Signals you're learning without implying incompetence." },
          { front: "\"What does good look like?\"", back: "Asks the other person to define success from their perspective — shows proactive curiosity." },
          { front: "Lead with value, not credentials", back: "Instead of 'I'm a developer', say what you actually help people accomplish." },
          { front: "\"How are you finding it?\"", back: "A common onboarding question from managers — an invitation to share honest early impressions." },
        ],
        wordOrderExercise: {
          instruction: "Arrange the words to form a professional introduction or question.",
          items: [
            { id: "wo-1-1", correctSentence: "I work with development teams to simplify infrastructure", scrambledWords: ["simplify", "teams", "I", "development", "work", "with", "to", "infrastructure"] },
            { id: "wo-1-2", correctSentence: "What does good look like from your perspective", scrambledWords: ["your", "look", "from", "good", "What", "perspective", "does", "like"] },
            { id: "wo-1-3", correctSentence: "I am still getting up to speed on the process", scrambledWords: ["up", "am", "the", "I", "getting", "speed", "still", "to", "process", "on"] },
          ],
        },
        exercises: [
          {
            type: "fill-gap",
            instruction: "Tap the correct phrase to complete each sentence.",
            wordBank: ["up to speed", "stayed with me", "work with", "what brings", "good look like"],
            items: [
              { id: "1", prompt: '"I _____ development teams to make infrastructure invisible."', answer: "work with" },
              { id: "2", prompt: '"I\'m still getting _____ — could you walk me through the process?"', answer: "up to speed" },
              { id: "3", prompt: '"Your point about documentation debt _____ on the way home."', answer: "stayed with me" },
              { id: "4", prompt: '"_____ you here this year — are you speaking or attending?"', answer: "what brings" },
              { id: "5", prompt: '"What does _____ in this role, from your perspective?"', answer: "good look like" },
            ],
          },
        ],
      },
      {
        id: "1-2",
        title: "Networking and Conferences",
        phrases: [
          { phrase: '"Have you been enjoying the conference so far?"', usage: "Opening small talk — low stakes, easy to answer" },
          { phrase: '"Your point about [X] stayed with me — I\'ve been thinking about it since."', usage: "Follow-up message — specific reference proves listening" },
          { phrase: '"I\'d love to stay connected — what\'s the best way to reach you?"', usage: "Closing without sounding transactional" },
        ],
        coachingNotes: [
          "A follow-up message only works if it proves you were paying attention. A generic 'I really enjoyed our conversation' does nothing.",
        ],
        flashcards: [
          { front: "\"Stayed with me\"", back: "Means something made a lasting impression. Shows you were genuinely engaged, not just polite." },
          { front: "\"What's the best way to reach you?\"", back: "A non-transactional way to close a networking conversation and keep the door open." },
          { front: "Opening small talk", back: "Start with low-stakes, easy-to-answer questions like 'Have you been enjoying the conference?'" },
          { front: "Follow-up message", back: "Must include a specific reference to something said. Generic 'great chat' messages are forgettable." },
        ],
        wordOrderExercise: {
          instruction: "Put the words in the correct order to form a natural networking phrase.",
          items: [
            { id: "wo-1-2a", correctSentence: "Your point about documentation stayed with me", scrambledWords: ["stayed", "about", "point", "Your", "documentation", "me", "with"] },
            { id: "wo-1-2b", correctSentence: "I would love to stay connected with you", scrambledWords: ["connected", "I", "love", "to", "would", "you", "stay", "with"] },
          ],
        },
      },
    ],
    scenarioExercise: {
      title: "The First Impression",
      context: "You're at a team lunch on your second day. A senior engineer you haven't met yet sits across from you and says: \"So, what do you actually do here?\" Two other colleagues are listening.",
      prompt: "How do you introduce yourself in a way that's memorable and value-driven without sounding rehearsed?",
    },
  },
  {
    id: "meeting-room",
    number: 2,
    title: "The Meeting Room",
    subtitle: "Participating confidently, managing flow, and closing with clarity",
    description: "Meetings are where professional reputations are built — or quietly eroded.",
    image: "module-meeting-room",
    lessons: [
      {
        id: "2-1",
        title: "Getting Into the Conversation",
        phrases: [
          { phrase: '"Building on that — there\'s one angle I don\'t think we\'ve fully covered yet."', usage: "Non-aggressive entry into discussion" },
          { phrase: '"Could I add something here before we move on?"', usage: "When the topic is about to close" },
          { phrase: '"Before we close — let me reflect back what I\'ve heard."', usage: "End of any meeting with decisions" },
        ],
        coachingNotes: [
          "'Building on that' creates a soft entry. The key word is 'building' — it signals you were listening and adding, not redirecting.",
        ],
        flashcards: [
          { front: "\"Building on that\"", back: "A soft entry phrase that signals you were listening and are adding to the conversation, not redirecting it." },
          { front: "\"Before we move on\"", back: "Used to claim space in a discussion just before the topic changes — polite but assertive." },
          { front: "\"Reflect back\"", back: "To summarise what you've heard in your own words. Shows understanding and catches misalignment." },
          { front: "Soft entry vs hard entry", back: "'Building on that' (soft) vs 'I disagree' (hard). Soft entries preserve relationships while still making your point." },
        ],
        wordOrderExercise: {
          instruction: "Arrange the words to form an effective meeting contribution.",
          items: [
            { id: "wo-2-1a", correctSentence: "Could I add something here before we move on", scrambledWords: ["on", "Could", "here", "move", "add", "something", "we", "before", "I"] },
            { id: "wo-2-1b", correctSentence: "Let me reflect back what I have heard", scrambledWords: ["heard", "me", "what", "Let", "back", "I", "have", "reflect"] },
          ],
        },
        exercises: [
          {
            type: "fill-gap",
            instruction: "Tap the correct phrase to complete each sentence.",
            wordBank: ["Building on that", "before we move on", "reflect back", "fully covered", "add something"],
            items: [
              { id: "2-1", prompt: '"_____ — there\'s one angle I don\'t think we\'ve addressed."', answer: "Building on that" },
              { id: "2-2", prompt: '"Could I _____ here before we close this topic?"', answer: "add something" },
              { id: "2-3", prompt: '"Before we close — let me _____ what I\'ve heard."', answer: "reflect back" },
              { id: "2-4", prompt: '"There\'s a perspective we haven\'t _____ yet."', answer: "fully covered" },
            ],
          },
        ],
      },
      {
        id: "2-2",
        title: "Closing and Following Up",
        phrases: [
          { phrase: '"Let me summarise what we\'ve agreed — and who\'s doing what by when."', usage: "Closing a meeting with clarity and accountability" },
          { phrase: '"Just to confirm — my action is [X] by [date]. Does that sound right?"', usage: "Confirming your own action item to avoid ambiguity" },
          { phrase: '"I\'ll send a short follow-up so we\'re all aligned."', usage: "Taking ownership of post-meeting clarity" },
        ],
        coachingNotes: [
          "The person who summarises the meeting controls the narrative. If you write the follow-up, you decide what was agreed.",
          "Always close with names, actions, and deadlines. 'We should do X' is a wish. 'Sarah will do X by Friday' is a plan.",
        ],
        flashcards: [
          { front: "\"Who's doing what by when\"", back: "The gold standard for meeting close. Turns vague agreements into accountable action items." },
          { front: "\"Send a short follow-up\"", back: "Taking ownership of the summary email. Whoever writes it shapes how decisions are remembered." },
          { front: "\"Does that sound right?\"", back: "A confirmation check that invites correction without sounding uncertain." },
        ],
        wordOrderExercise: {
          instruction: "Put the words in order to form a clear meeting close.",
          items: [
            { id: "wo-2-2a", correctSentence: "Let me summarise what we have agreed today", scrambledWords: ["today", "me", "what", "Let", "agreed", "we", "have", "summarise"] },
            { id: "wo-2-2b", correctSentence: "I will send a short follow up after the meeting", scrambledWords: ["meeting", "will", "a", "I", "follow", "after", "short", "up", "the", "send"] },
          ],
        },
        exercises: [
          {
            type: "fill-gap",
            instruction: "Tap the correct phrase to complete each sentence.",
            wordBank: ["who's doing what", "follow-up", "sound right", "by when", "we've agreed"],
            items: [
              { id: "2-2a", prompt: '"Let me summarise what _____ — and _____ _____."', answer: "we've agreed" },
              { id: "2-2b", prompt: '"I\'ll send a short _____ so we\'re all aligned."', answer: "follow-up" },
              { id: "2-2c", prompt: '"My action is to revise the spec by Friday. Does that _____?"', answer: "sound right" },
            ],
          },
        ],
      },
    ],
    scenarioExercise: {
      title: "The Overlooked Point",
      context: "You're in a product review meeting. The discussion is about to close, but you noticed the team skipped over a critical UX concern that could delay the launch. The PM is already summarising action items.",
      prompt: "How do you re-open the discussion without sounding like you're derailing the meeting?",
    },
  },
  {
    id: "across-cultures",
    number: 3,
    title: "Working Across Cultures",
    subtitle: "Reading communication styles — not just learning idioms",
    description: "Understanding that the same words carry different social weight in different contexts.",
    image: "module-across-cultures",
    lessons: [
      {
        id: "3-1",
        title: "Reading Different Communication Styles",
        phrases: [
          { phrase: '"I have some concerns about this direction — can I share them?"', usage: "Make doubts explicit rather than signalling indirectly" },
          { phrase: '"Can I push back on that slightly?"', usage: "Respectful challenge — 'slightly' de-escalates" },
          { phrase: '"I want to understand your thinking before I share a different view."', usage: "Shows engagement, not reaction" },
        ],
        coachingNotes: [
          "The word 'slightly' does real work. It signals measured disagreement, not emotional. Compare: 'I disagree with that' vs 'Can I push back on that slightly?'",
        ],
        flashcards: [
          { front: "\"Push back on that slightly\"", back: "A measured way to express disagreement. 'Slightly' de-escalates tension and shows the challenge is professional, not personal." },
          { front: "High-context vs low-context", back: "High-context cultures (Japan, Korea) imply meaning indirectly. Low-context cultures (US, Netherlands) state it plainly." },
          { front: "\"That's an interesting approach\"", back: "In some cultures, this may signal polite disagreement rather than genuine interest. Always read the room." },
          { front: "\"Understand your thinking\"", back: "Shows you want to engage with their reasoning before presenting your own view — builds rapport across cultures." },
        ],
        wordOrderExercise: {
          instruction: "Put the words in the correct order to form a respectful cross-cultural phrase.",
          items: [
            { id: "wo-3-1a", correctSentence: "Can I push back on that slightly", scrambledWords: ["slightly", "that", "I", "push", "Can", "on", "back"] },
            { id: "wo-3-1b", correctSentence: "I want to understand your thinking before I respond", scrambledWords: ["I", "before", "understand", "thinking", "to", "your", "respond", "want", "I"] },
          ],
        },
        exercises: [
          {
            type: "fill-gap",
            instruction: "Tap the correct phrase to complete each sentence.",
            wordBank: ["push back", "share them", "your thinking", "slightly", "different view"],
            items: [
              { id: "3-1", prompt: '"I have some concerns — can I _____?"', answer: "share them" },
              { id: "3-2", prompt: '"Can I _____ on that _____?"', answer: "push back" },
              { id: "3-3", prompt: '"I want to understand _____ before I respond."', answer: "your thinking" },
              { id: "3-4", prompt: '"I\'d like to share a _____ on this."', answer: "different view" },
            ],
          },
        ],
      },
      {
        id: "3-2",
        title: "Adapting Your Tone Across Contexts",
        phrases: [
          { phrase: '"I want to make sure I\'m reading this correctly — are you comfortable with the direction?"', usage: "Checking alignment in a high-context setting" },
          { phrase: '"In my experience, this approach works well — but I\'m curious how it lands here."', usage: "Sharing a perspective while inviting cultural input" },
          { phrase: '"I noticed some hesitation — is there something we should discuss further?"', usage: "Naming what you observe without assuming the reason" },
        ],
        coachingNotes: [
          "Silence doesn't always mean agreement. In many cultures, it signals discomfort or a need for more time to process.",
          "'How it lands here' is a powerful phrase — it acknowledges that your norm isn't universal.",
        ],
        flashcards: [
          { front: "\"Reading this correctly\"", back: "A self-checking phrase that invites the other person to correct your interpretation without losing face." },
          { front: "\"How it lands here\"", back: "Acknowledges that your approach may not translate across contexts. Shows cultural humility." },
          { front: "Silence ≠ agreement", back: "In many cultures, silence signals discomfort or the need for processing time, not consent." },
        ],
        wordOrderExercise: {
          instruction: "Arrange the words to form a culturally sensitive question.",
          items: [
            { id: "wo-3-2a", correctSentence: "I want to make sure I am reading this correctly", scrambledWords: ["reading", "make", "I", "to", "want", "am", "this", "sure", "I", "correctly"] },
            { id: "wo-3-2b", correctSentence: "Is there something we should discuss further", scrambledWords: ["further", "there", "something", "Is", "discuss", "should", "we"] },
          ],
        },
        exercises: [
          {
            type: "fill-gap",
            instruction: "Tap the correct phrase to complete each sentence.",
            wordBank: ["reading this correctly", "how it lands", "some hesitation", "discuss further", "comfortable with"],
            items: [
              { id: "3-2a", prompt: '"I want to make sure I\'m _____ — are you _____ the direction?"', answer: "reading this correctly" },
              { id: "3-2b", prompt: '"I noticed _____ — is there something we should _____?"', answer: "some hesitation" },
              { id: "3-2c", prompt: '"I\'m curious _____ here given the team dynamics."', answer: "how it lands" },
            ],
          },
        ],
      },
    ],
    scenarioExercise: {
      title: "The Indirect Objection",
      context: "During a cross-team call, a colleague from the Tokyo office says: \"That's an interesting approach — we might need to consider some additional factors.\" Your American teammate responds with: \"Great, so we're aligned!\" You know the Tokyo colleague was actually expressing disagreement.",
      prompt: "How do you bridge this communication gap without embarrassing either colleague?",
    },
  },
  {
    id: "managing-up",
    number: 4,
    title: "Managing Up & Sideways",
    subtitle: "Influencing without authority",
    description: "Most important relationships are with people you can't direct — only influence.",
    image: "module-managing-up",
    lessons: [
      {
        id: "4-1",
        title: "Influencing Without Authority",
        phrases: [
          { phrase: '"I think this connects directly to something you mentioned about [their goal]."', usage: "Linking your idea to their stated priorities" },
          { phrase: '"What would need to be true for you to feel comfortable with this?"', usage: "Surfaces the real objection" },
          { phrase: '"I\'d rather flag this early than raise it when it\'s too late to act."', usage: "Framing concern as proactive" },
        ],
        coachingNotes: [
          "When someone hesitates without a reason, this phrase asks them to articulate the condition. Once you know it, you can meet it or have an honest conversation.",
        ],
        flashcards: [
          { front: "\"Connects directly to\"", back: "Links your proposal to someone else's stated priorities. Makes your idea feel aligned, not competing." },
          { front: "\"What would need to be true?\"", back: "Surfaces hidden objections by asking the other person to articulate their conditions for agreement." },
          { front: "\"Flag this early\"", back: "Frames your concern as proactive risk management, not complaining. Shows professional maturity." },
          { front: "Influencing without authority", back: "The skill of moving people through alignment, empathy, and strategic framing — not through formal power." },
          { front: "\"Feel comfortable with this\"", back: "Acknowledges the emotional component of decisions. People need to feel safe, not just logically convinced." },
        ],
        wordOrderExercise: {
          instruction: "Arrange the words to form an effective influence phrase.",
          items: [
            { id: "wo-4-1a", correctSentence: "What would need to be true for you to support this", scrambledWords: ["for", "need", "true", "What", "you", "this", "be", "to", "support", "would", "to"] },
            { id: "wo-4-1b", correctSentence: "I would rather flag this early than raise it too late", scrambledWords: ["this", "flag", "late", "raise", "it", "would", "I", "too", "rather", "early", "than"] },
          ],
        },
        exercises: [
          {
            type: "fill-gap",
            instruction: "Tap the correct phrase to complete each sentence.",
            wordBank: ["flag this early", "need to be true", "connects directly", "comfortable with", "too late to act"],
            items: [
              { id: "4-1", prompt: '"I think this _____ to your Q3 priority."', answer: "connects directly" },
              { id: "4-2", prompt: '"What would _____ for you to support this?"', answer: "need to be true" },
              { id: "4-3", prompt: '"I\'d rather _____ than raise it when it\'s _____."', answer: "flag this early" },
            ],
          },
        ],
      },
      {
        id: "4-2",
        title: "Giving Updates That Build Trust",
        phrases: [
          { phrase: '"Here\'s where we are, what\'s at risk, and what I need from you."', usage: "Structured status update for senior stakeholders" },
          { phrase: '"I want to give you an early signal rather than a late surprise."', usage: "Flagging potential problems before they escalate" },
          { phrase: '"I\'ve thought about this from your perspective — here\'s what I\'d recommend."', usage: "Showing you've considered their priorities" },
        ],
        coachingNotes: [
          "Senior people don't want to be surprised. An early warning with a plan is always better than a late confession without one.",
          "Structure updates as: Status → Risk → Ask. Don't bury the ask at the end.",
        ],
        flashcards: [
          { front: "\"Early signal, not late surprise\"", back: "Frames bad news as proactive risk management. Shows you're on top of issues, not hiding them." },
          { front: "Status → Risk → Ask", back: "The ideal update structure for senior stakeholders. Lead with where things stand, highlight risks, then state what you need." },
          { front: "\"From your perspective\"", back: "Shows you've considered how the situation affects them, not just you. Builds trust and credibility." },
        ],
        wordOrderExercise: {
          instruction: "Arrange the words to form a clear stakeholder update.",
          items: [
            { id: "wo-4-2a", correctSentence: "I want to give you an early signal on this", scrambledWords: ["this", "give", "early", "I", "an", "to", "signal", "you", "want", "on"] },
            { id: "wo-4-2b", correctSentence: "Here is where we are and what I need from you", scrambledWords: ["you", "is", "are", "Here", "what", "and", "from", "where", "I", "need", "we"] },
          ],
        },
        exercises: [
          {
            type: "fill-gap",
            instruction: "Tap the correct phrase to complete each sentence.",
            wordBank: ["early signal", "at risk", "your perspective", "late surprise", "what I need"],
            items: [
              { id: "4-2a", prompt: '"I want to give you an _____ rather than a _____."', answer: "early signal" },
              { id: "4-2b", prompt: '"Here\'s where we are, what\'s _____, and _____."', answer: "at risk" },
              { id: "4-2c", prompt: '"I\'ve thought about this from _____ — here\'s my recommendation."', answer: "your perspective" },
            ],
          },
        ],
      },
    ],
    scenarioExercise: {
      title: "The Reluctant Stakeholder",
      context: "Your skip-level manager has been delaying approval on a process change you proposed. They haven't said no, but they haven't said yes either. You have 5 minutes with them before a meeting.",
      prompt: "How do you surface their real concern and move toward a decision without being pushy?",
    },
  },
  {
    id: "difficult-convos",
    number: 5,
    title: "Difficult Conversations",
    subtitle: "Conflict, feedback, and hard truths — without the damage",
    description: "The conversations most people avoid are usually the ones that matter most.",
    image: "module-difficult-convos",
    lessons: [
      {
        id: "5-1",
        title: "Delivering Feedback",
        phrases: [
          { phrase: '"Can I share an observation — it\'s something I\'ve noticed more than once."', usage: "Opening feedback — permission question softens the landing" },
          { phrase: '"The impact on the team has been [specific effect]."', usage: "Grounding feedback in observable impact" },
          { phrase: '"From where I\'m sitting, [observation]."', usage: "Subjective framing — opinion, not verdict" },
        ],
        coachingNotes: [
          "Three frameworks: What-Why-Next for quick feedback, DESC for formal/high-stakes, Contrast Method when expectation and reality diverged.",
        ],
        flashcards: [
          { front: "\"Share an observation\"", back: "Opens feedback gently by asking permission and framing it as a pattern, not a one-off accusation." },
          { front: "What-Why-Next framework", back: "Quick feedback: What happened → Why it matters → What to do next. Best for informal, low-stakes situations." },
          { front: "DESC framework", back: "Describe → Express → Specify → Consequences. Best for formal, high-stakes feedback conversations." },
          { front: "\"From where I'm sitting\"", back: "Frames your feedback as subjective perspective, not absolute truth. Less defensive reaction from the receiver." },
          { front: "Contrast Method", back: "Used when expectation and reality diverged: 'I expected X, but what happened was Y.' Shows the gap without blame." },
        ],
        wordOrderExercise: {
          instruction: "Arrange the words to form constructive feedback.",
          items: [
            { id: "wo-5-1a", correctSentence: "Can I share an observation about something I have noticed", scrambledWords: ["noticed", "about", "share", "Can", "I", "an", "something", "observation", "have", "I"] },
            { id: "wo-5-1b", correctSentence: "The impact on the team has been significant", scrambledWords: ["significant", "impact", "The", "team", "on", "been", "has", "the"] },
          ],
        },
        exercises: [
          {
            type: "fill-gap",
            instruction: "Tap the correct phrase to complete each sentence.",
            wordBank: ["share an observation", "impact on the team", "from where I'm sitting", "more than once", "specific effect"],
            items: [
              { id: "5-1", prompt: '"Can I _____ — it\'s something I\'ve noticed?"', answer: "share an observation" },
              { id: "5-2", prompt: '"The _____ has been significant this quarter."', answer: "impact on the team" },
              { id: "5-3", prompt: '"_____, the deadline pressure is affecting quality."', answer: "from where I'm sitting" },
            ],
          },
        ],
      },
      {
        id: "5-2",
        title: "Receiving Feedback Gracefully",
        phrases: [
          { phrase: '"Thank you for telling me that — can you give me a specific example?"', usage: "Receiving feedback without defensiveness" },
          { phrase: '"I hadn\'t seen it that way — let me sit with that."', usage: "Acknowledging feedback you need time to process" },
          { phrase: '"What would you suggest I do differently going forward?"', usage: "Moving from diagnosis to action" },
        ],
        coachingNotes: [
          "Your first response to feedback sets the tone. If you get defensive, they won't give you feedback again — and that's worse.",
          "Asking for a specific example isn't challenging the feedback — it's showing you want to understand and act on it.",
        ],
        flashcards: [
          { front: "\"Let me sit with that\"", back: "Buys processing time without dismissing feedback. Shows maturity and emotional regulation." },
          { front: "\"Thank you for telling me\"", back: "Disarms tension immediately. Even if the feedback stings, gratitude keeps the channel open." },
          { front: "\"Do differently going forward\"", back: "Shifts from past mistakes to future improvement. Shows action-oriented mindset." },
        ],
        wordOrderExercise: {
          instruction: "Arrange the words to form a graceful response to feedback.",
          items: [
            { id: "wo-5-2a", correctSentence: "Thank you for telling me that honestly", scrambledWords: ["that", "you", "Thank", "me", "telling", "honestly", "for"] },
            { id: "wo-5-2b", correctSentence: "What would you suggest I do differently", scrambledWords: ["differently", "would", "suggest", "What", "do", "you", "I"] },
          ],
        },
        exercises: [
          {
            type: "fill-gap",
            instruction: "Tap the correct phrase to complete each sentence.",
            wordBank: ["sit with that", "telling me", "specific example", "do differently", "seen it that way"],
            items: [
              { id: "5-2a", prompt: '"Thank you for _____ — can you give me a _____?"', answer: "telling me" },
              { id: "5-2b", prompt: '"I hadn\'t _____ — let me _____."', answer: "seen it that way" },
              { id: "5-2c", prompt: '"What would you suggest I _____ going forward?"', answer: "do differently" },
            ],
          },
        ],
      },
    ],
    scenarioExercise: {
      title: "The Repeated Pattern",
      context: "A teammate consistently takes credit for collaborative work in stakeholder updates. It's happened three times now. You like this person and want to preserve the relationship, but it needs to stop.",
      prompt: "How do you address this pattern directly while keeping the relationship intact?",
    },
  },
  {
    id: "career-moves",
    number: 6,
    title: "Career Moves",
    subtitle: "Interviews, promotions, salary conversations",
    description: "Career conversations are emotionally loaded. There is a middle path that is both honest and effective.",
    image: "module-career-moves",
    lessons: [
      {
        id: "6-1",
        title: "Talking About Your Work",
        phrases: [
          { phrase: '"One thing I\'m particularly proud of is [outcome] — because [why it was hard]."', usage: "Interview or review — leads with result, gives context" },
          { phrase: '"Looking back, I\'d handle [X] differently — but at the time, here was my reasoning."', usage: "Reflecting on failure — shows growth" },
        ],
        coachingNotes: [
          "Most candidates only talk about decisions they agreed with. Showing you pushed back signals strong independent judgement.",
        ],
        flashcards: [
          { front: "\"Particularly proud of\"", back: "Leads with your result and then explains why it was hard. Shows both competence and self-awareness." },
          { front: "\"Handle differently\"", back: "Reflects on past decisions honestly. Signals growth mindset and the ability to learn from mistakes." },
          { front: "\"At the time, here was my reasoning\"", back: "Explains past decisions without excuses. Shows you made thoughtful choices even if they weren't perfect." },
          { front: "Talking about failure in interviews", back: "Show the mistake, what you learned, and what you'd do differently. Never blame others or external factors." },
        ],
        wordOrderExercise: {
          instruction: "Put the words in order to form a strong interview answer.",
          items: [
            { id: "wo-6-1a", correctSentence: "One thing I am particularly proud of is reducing deploy time", scrambledWords: ["time", "proud", "is", "thing", "I", "reducing", "am", "One", "deploy", "particularly", "of"] },
            { id: "wo-6-1b", correctSentence: "Looking back I would handle the communication differently", scrambledWords: ["the", "Looking", "I", "handle", "differently", "communication", "back", "would"] },
          ],
        },
        exercises: [
          {
            type: "fill-gap",
            instruction: "Tap the correct phrase to complete each sentence.",
            wordBank: ["particularly proud of", "handle differently", "at the time", "my reasoning", "pushed back"],
            items: [
              { id: "6-1", prompt: '"One thing I\'m _____ is reducing deploy time by 40%."', answer: "particularly proud of" },
              { id: "6-2", prompt: '"Looking back, I\'d _____ the stakeholder communication."', answer: "handle differently" },
              { id: "6-3", prompt: '"_____, here was _____ for that decision."', answer: "at the time" },
            ],
          },
        ],
      },
      {
        id: "6-2",
        title: "Negotiating Salary and Role",
        phrases: [
          { phrase: '"Based on what I\'ve delivered and the market, I believe a range of [X–Y] is fair."', usage: "Anchoring salary with evidence and range" },
          { phrase: '"I\'m excited about this role — I want to make sure we start on the right footing."', usage: "Framing negotiation as collaborative, not adversarial" },
          { phrase: '"Is there flexibility on [specific element]?"', usage: "Testing the boundaries without making demands" },
        ],
        coachingNotes: [
          "Always negotiate with a range, not a single number. It shows research and gives the other side room to move.",
          "'Right footing' signals you're thinking long-term — it's about the relationship, not just the transaction.",
        ],
        flashcards: [
          { front: "\"The right footing\"", back: "Frames salary negotiation as setting up a healthy long-term relationship, not a one-time transaction." },
          { front: "Range anchoring", back: "Giving a range (e.g., £65–75k) shows research, signals flexibility, and lets the other side feel they're negotiating." },
          { front: "\"Is there flexibility on…\"", back: "Tests boundaries gently. Works for salary, start date, remote days, or title. Doesn't demand — it asks." },
        ],
        wordOrderExercise: {
          instruction: "Arrange the words to form a confident negotiation phrase.",
          items: [
            { id: "wo-6-2a", correctSentence: "I want to make sure we start on the right footing", scrambledWords: ["footing", "make", "the", "I", "start", "right", "to", "sure", "want", "we", "on"] },
            { id: "wo-6-2b", correctSentence: "Is there flexibility on the remote working arrangement", scrambledWords: ["arrangement", "the", "there", "Is", "on", "working", "flexibility", "remote"] },
          ],
        },
        exercises: [
          {
            type: "fill-gap",
            instruction: "Tap the correct phrase to complete each sentence.",
            wordBank: ["right footing", "flexibility on", "what I've delivered", "the market", "excited about"],
            items: [
              { id: "6-2a", prompt: '"I\'m _____ this role — I want to start on the _____."', answer: "excited about" },
              { id: "6-2b", prompt: '"Based on _____ and _____, I believe this range is fair."', answer: "what I've delivered" },
              { id: "6-2c", prompt: '"Is there _____ the start date?"', answer: "flexibility on" },
            ],
          },
        ],
      },
    ],
    scenarioExercise: {
      title: "The Promotion Conversation",
      context: "Your annual review is next week. You believe you've been performing at the next level for six months but haven't been promoted. Your manager is supportive but hasn't raised it.",
      prompt: "How do you open the promotion conversation without sounding entitled or creating awkwardness?",
    },
  },
  {
    id: "dei-fundamentals",
    number: 7,
    title: "DEI Fundamentals",
    subtitle: "Language, inclusion, and belonging",
    description: "The specific language choices that either include people or exclude them — often without realising.",
    image: "module-dei",
    lessons: [
      {
        id: "7-1",
        title: "Inclusive Language in Practice",
        phrases: [
          { phrase: '"Hey everyone / Hey team — let\'s get started."', usage: "Gender-neutral group address" },
          { phrase: '"I try to be aware of how different people experience this environment differently."', usage: "When asked about your DEI approach" },
        ],
        coachingNotes: [
          "Most exclusive language is habitual, not malicious. The question is whether language makes certain people feel default and others exceptional.",
        ],
        flashcards: [
          { front: "\"Hey everyone\" vs \"Hey guys\"", back: "'Hey everyone' or 'Hey team' are gender-neutral alternatives that include all participants without assumption." },
          { front: "Habitual vs malicious exclusion", back: "Most exclusive language isn't intentional — it's habitual. The goal is awareness, not blame." },
          { front: "\"Experience differently\"", back: "Acknowledges that the same environment isn't equally comfortable for everyone. Shows awareness without preaching." },
          { front: "Default vs exceptional", back: "Inclusive language avoids making some identities feel 'normal' and others 'other'. Example: 'partner' instead of 'husband/wife'." },
        ],
        wordOrderExercise: {
          instruction: "Arrange the words to form an inclusive workplace phrase.",
          items: [
            { id: "wo-7-1a", correctSentence: "I try to be aware of how people experience this differently", scrambledWords: ["this", "aware", "try", "differently", "how", "I", "people", "be", "experience", "of", "to"] },
            { id: "wo-7-1b", correctSentence: "Hey everyone let us get started with the agenda", scrambledWords: ["agenda", "everyone", "Hey", "get", "with", "us", "the", "started", "let"] },
          ],
        },
        exercises: [
          {
            type: "fill-gap",
            instruction: "Tap the correct phrase to complete each sentence.",
            wordBank: ["Hey everyone", "experience differently", "be aware", "feel default", "habitual"],
            items: [
              { id: "7-1", prompt: '"_____ — let\'s get started with the standup."', answer: "Hey everyone" },
              { id: "7-2", prompt: '"I try to _____ of how people _____ this environment."', answer: "be aware" },
              { id: "7-3", prompt: '"Most exclusive language is _____, not intentional."', answer: "habitual" },
            ],
          },
        ],
      },
      {
        id: "7-2",
        title: "Responding to Microaggressions",
        phrases: [
          { phrase: '"I think that comment landed differently than you intended — can I share why?"', usage: "Addressing a microaggression without escalating" },
          { phrase: '"I\'m sure that wasn\'t your intention, but here\'s how it came across."', usage: "Separating intent from impact" },
          { phrase: '"Can we find a different way to phrase that?"', usage: "Redirecting language without shaming" },
        ],
        coachingNotes: [
          "The goal is awareness, not punishment. Separate intent from impact — people can mean well and still cause harm.",
          "If you witness it but aren't the target, speaking up matters more. The phrase 'I noticed that too' can be powerful.",
        ],
        flashcards: [
          { front: "Intent vs impact", back: "Someone can mean no harm but still cause it. Address the impact without attacking the intent." },
          { front: "\"Landed differently\"", back: "A gentle way to say 'that was offensive' — it implies the speaker didn't intend harm but the effect was real." },
          { front: "Bystander intervention", back: "If you witness a microaggression, saying 'I noticed that too' validates the target and shares the burden of speaking up." },
        ],
        wordOrderExercise: {
          instruction: "Arrange the words to form a thoughtful response to a microaggression.",
          items: [
            { id: "wo-7-2a", correctSentence: "I think that comment landed differently than you intended", scrambledWords: ["intended", "think", "that", "I", "differently", "you", "landed", "than", "comment"] },
            { id: "wo-7-2b", correctSentence: "Can we find a different way to phrase that", scrambledWords: ["that", "we", "find", "Can", "way", "a", "phrase", "to", "different"] },
          ],
        },
        exercises: [
          {
            type: "fill-gap",
            instruction: "Tap the correct phrase to complete each sentence.",
            wordBank: ["landed differently", "your intention", "came across", "different way", "noticed that too"],
            items: [
              { id: "7-2a", prompt: '"I think that comment _____ than you intended."', answer: "landed differently" },
              { id: "7-2b", prompt: '"I\'m sure that wasn\'t _____, but here\'s how it _____."', answer: "your intention" },
              { id: "7-2c", prompt: '"Can we find a _____ to phrase that?"', answer: "different way" },
            ],
          },
        ],
      },
    ],
    scenarioExercise: {
      title: "The Uncomfortable Moment",
      context: "During a team retrospective, a colleague uses the phrase \"that's so lame\" to describe a process. A team member with a visible disability shifts uncomfortably. Nobody else seems to notice.",
      prompt: "How do you address this in the moment without making it feel like a lecture?",
    },
  },
  {
    id: "common-mistakes",
    number: 8,
    title: "Common Mistakes & Final Review",
    subtitle: "A full-program summary of what goes wrong — and how to fix it",
    description: "The most frequent mistakes across every area of the program. Use as a final review.",
    image: "module-common-mistakes",
    lessons: [
      {
        id: "8-1",
        title: "12 Common Mistakes",
        phrases: [
          { phrase: '"I work with engineering teams to make infrastructure invisible."', usage: "Instead of leading with credentials" },
          { phrase: '"Could I add something here before we move on?"', usage: "Instead of waiting for a pause that never comes" },
          { phrase: '"My impression was that the recommendation was hard to follow."', usage: "Instead of starting with a 'you' verdict" },
        ],
        coachingNotes: [
          "Leading with credentials tells them your category. Leading with value tells them why you matter.",
        ],
        flashcards: [
          { front: "Mistake: Leading with credentials", back: "Fix: Lead with value. 'I work with [X] to [result]' instead of 'I'm a senior engineer at…'" },
          { front: "Mistake: Waiting for a pause", back: "Fix: Create your own entry. 'Could I add something here before we move on?' Don't wait for permission that never comes." },
          { front: "Mistake: 'You' verdicts", back: "Fix: Use subjective framing. 'My impression was…' instead of 'You made a bad recommendation.'" },
          { front: "Mistake: Generic follow-ups", back: "Fix: Reference something specific from the conversation. Prove you were listening." },
          { front: "Mistake: Avoiding difficult conversations", back: "Fix: The conversations you avoid are the ones that matter most. Use frameworks (DESC, What-Why-Next) to structure them." },
          { front: "Mistake: Not reading indirect communication", back: "Fix: In high-context cultures, 'interesting approach' may mean disagreement. Always clarify before assuming alignment." },
        ],
        wordOrderExercise: {
          instruction: "Arrange the words to correct a common communication mistake.",
          items: [
            { id: "wo-8-1a", correctSentence: "My impression was that the recommendation was hard to follow", scrambledWords: ["to", "was", "the", "My", "follow", "hard", "that", "recommendation", "impression", "was"] },
            { id: "wo-8-1b", correctSentence: "Could I add something here before we move on", scrambledWords: ["move", "Could", "we", "before", "I", "something", "on", "add", "here"] },
          ],
        },
        exercises: [
          {
            type: "fill-gap",
            instruction: "Tap the correct phrase to complete each sentence.",
            wordBank: ["work with", "add something", "my impression", "hard to follow", "before we move on"],
            items: [
              { id: "8-1", prompt: '"I _____ engineering teams to simplify complexity."', answer: "work with" },
              { id: "8-2", prompt: '"Could I _____ here _____?"', answer: "add something" },
              { id: "8-3", prompt: '"_____ was that the recommendation was _____."', answer: "my impression" },
            ],
          },
        ],
      },
      {
        id: "8-2",
        title: "Building Your Communication Toolkit",
        phrases: [
          { phrase: '"What\'s the one thing you want them to walk away remembering?"', usage: "Self-check before any high-stakes communication" },
          { phrase: '"I\'m going to structure this as: context, recommendation, ask."', usage: "Announcing your structure to help the listener follow" },
          { phrase: '"Let me land the key point first, then I\'ll give you the context."', usage: "Leading with the conclusion for time-pressed audiences" },
        ],
        coachingNotes: [
          "Every great communicator structures before speaking. The pattern 'Context → Recommendation → Ask' works in meetings, emails, and presentations.",
          "If you only have 30 seconds, lead with the point. If you have 5 minutes, add context. Adapt your depth to your audience's time.",
        ],
        flashcards: [
          { front: "\"Walk away remembering\"", back: "A self-check question: if they remember only one thing, what should it be? Design your message around that." },
          { front: "Context → Recommendation → Ask", back: "A universal communication structure. Set the scene, state your view, then say what you need." },
          { front: "\"Land the key point first\"", back: "For time-pressed audiences, lead with the conclusion. Don't build up to it — start with it." },
          { front: "Adapting depth to time", back: "30 seconds = headline only. 2 minutes = headline + context. 5 minutes = full structure. Always match depth to available time." },
        ],
        wordOrderExercise: {
          instruction: "Arrange the words to form a clear communication structure.",
          items: [
            { id: "wo-8-2a", correctSentence: "Let me land the key point first then add context", scrambledWords: ["context", "key", "me", "Let", "first", "point", "add", "the", "then", "land"] },
            { id: "wo-8-2b", correctSentence: "What is the one thing you want them to remember", scrambledWords: ["remember", "the", "is", "What", "thing", "want", "to", "one", "you", "them"] },
          ],
        },
        exercises: [
          {
            type: "fill-gap",
            instruction: "Tap the correct phrase to complete each sentence.",
            wordBank: ["walk away remembering", "land the key point", "context and ask", "structure this", "recommendation"],
            items: [
              { id: "8-2a", prompt: '"What\'s the one thing you want them to _____?"', answer: "walk away remembering" },
              { id: "8-2b", prompt: '"Let me _____ first, then I\'ll give context."', answer: "land the key point" },
              { id: "8-2c", prompt: '"I\'m going to _____ as: context, _____, ask."', answer: "structure this" },
            ],
          },
        ],
      },
    ],
    scenarioExercise: {
      title: "The Full Review",
      context: "You're preparing for a high-stakes client presentation. Your manager reviews your draft and says: \"This is too long and the key message gets lost.\" You agree, but you also feel the client needs the context.",
      prompt: "How do you respond to the feedback and propose a solution that addresses both the brevity concern and the need for context?",
    },
  },
];

export const learningPath = [
  { id: "natural-flow", title: "Natural Flow", subtitle: "Foundations of speech", completed: true, active: false },
  { id: "specialist", title: "The Specialist", subtitle: "Mastering communication techniques", completed: false, active: true, progress: 65 },
  { id: "collaborator", title: "The Collaborator", subtitle: "Team dynamics & empathy", completed: false, active: false },
  { id: "influencer", title: "The Influencer", subtitle: "Visionary leadership", completed: false, active: false },
];
