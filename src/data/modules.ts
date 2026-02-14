export interface Lesson {
  id: string;
  title: string;
  phrases: { phrase: string; usage: string }[];
  coachingNotes: string[];
  situation?: { title: string; prompt: string; coachingResponse: string };
  exercises?: Exercise[];
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
