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

export interface Module {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  lessons: Lesson[];
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
          { phrase: '"What does good look like in this role, from your perspective?"', usage: "First one-to-one — signals you\'re here to add value" },
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
            instruction: "Complete each sentence with the correct phrase.",
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
      },
    ],
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
      },
    ],
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
      },
    ],
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
      },
    ],
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
      },
    ],
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
      },
    ],
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
      },
    ],
  },
];

export const learningPath = [
  { id: "natural-flow", title: "Natural Flow", subtitle: "Foundations of speech", completed: true, active: false },
  { id: "specialist", title: "The Specialist", subtitle: "Mastering communication techniques", completed: false, active: true, progress: 65 },
  { id: "collaborator", title: "The Collaborator", subtitle: "Team dynamics & empathy", completed: false, active: false },
  { id: "influencer", title: "The Influencer", subtitle: "Visionary leadership", completed: false, active: false },
];
