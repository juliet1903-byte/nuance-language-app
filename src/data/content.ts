import articleWarmIntro from "@/assets/article-warm-intro.png";
import articleBurnout from "@/assets/article-burnout.png";
import articleCultures from "@/assets/article-cultures.png";
import articleInterview from "@/assets/article-interview.png";
import articleCriticism from "@/assets/article-criticism.png";
import articleConversations from "@/assets/article-conversations.png";
import articlePromoted from "@/assets/article-promoted.png";
import articleMicroaggressions from "@/assets/article-microaggressions.webp";
import videoNeutral from "@/assets/video-neutral.png";
import videoPositive from "@/assets/video-positive.png";
import videoImpostor from "@/assets/video-impostor.png";
import deepDiveManagingUp from "@/assets/deep-dive-managing-up.png";

export interface Article {
  id: string;
  title: string;
  category: string;
  readTime: string;
  href: string;
  image: string;
  badge?: string;
}

export interface Video {
  id: string;
  title: string;
  duration: string;
  category: string;
  href: string;
  image: string;
}

// Ordered newest-first
export const articles: Article[] = [
  {
    id: "a7",
    title: "Why Some People Get Promoted and Others Don't",
    category: "Career",
    readTime: "12 min read",
    href: "/article/promoted",
    image: articlePromoted,
  },
  {
    id: "a1",
    title: "The Art of the Warm Intro",
    category: "Networking",
    readTime: "5 min read",
    href: "/article/warm-intro",
    image: articleWarmIntro,
  },
  {
    id: "a4",
    title: "Quiet Cracking or Burning Out?",
    category: "Wellbeing",
    readTime: "7 min read",
    href: "/article/burnout",
    image: articleBurnout,
  },
  {
    id: "a3",
    title: "Managing Up: How to Work With Your Manager",
    category: "Career",
    readTime: "15 min read",
    href: "/deep-dive/managing-up",
    image: deepDiveManagingUp,
    badge: "Deep Dive",
  },
  {
    id: "a3b",
    title: "Reading Between Cultures",
    category: "Cross-Cultural",
    readTime: "10 min read",
    href: "/deep-dive/cultures",
    image: articleCultures,
    badge: "Deep Dive",
  },
  {
    id: "a5",
    title: "How to Receive Criticism Without Collapsing or Defending",
    category: "Feedback",
    readTime: "8 min read",
    href: "/article/criticism",
    image: articleCriticism,
  },
  {
    id: "a6",
    title: "The Conversations Most People Avoid",
    category: "Communication",
    readTime: "9 min read",
    href: "/article/conversations",
    image: articleConversations,
  },
];

// Ordered newest-first
export const videos: Video[] = [
  {
    id: "v4",
    title: "Impostor Syndrome: What It Is and How to Overcome It",
    duration: "10 min",
    category: "Career",
    href: "/video/impostor-syndrome",
    image: videoImpostor,
  },
  {
    id: "v1",
    title: "How to Get Ready for an Interview",
    duration: "12 min",
    category: "Career",
    href: "/video/interview",
    image: articleInterview,
  },
  {
    id: "v2",
    title: "How to Grow Professional Relationships",
    duration: "8 min",
    category: "Networking",
    href: "/video/relationships",
    image: videoNeutral,
  },
  {
    id: "v3",
    title: "The 4 Domains of Emotional Intelligence",
    duration: "6 min",
    category: "Leadership",
    href: "/video/emotional-intelligence",
    image: videoPositive,
  },
];
