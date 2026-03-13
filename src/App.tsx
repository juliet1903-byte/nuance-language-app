import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/SidebarContext";
import { ThemeProvider } from "@/components/ThemeContext";
import { AuthProvider } from "@/components/AuthContext";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Index from "./pages/Index";
import ModuleDetail from "./pages/ModuleDetail";
import Progress from "./pages/Progress";
import Library from "./pages/Library";
import Insights from "./pages/Insights";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import ResetPassword from "./pages/ResetPassword";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import ArticleWarmIntro from "./pages/ArticleWarmIntro";
import ArticleBurnout from "./pages/ArticleBurnout";
import ArticleCriticism from "./pages/ArticleCriticism";
import ArticleConversations from "./pages/ArticleConversations";
import DeepDiveCultures from "./pages/DeepDiveCultures";
import DeepDiveManagingUp from "./pages/DeepDiveManagingUp";
import VideoInterview from "./pages/VideoInterview";
import VideoRelationships from "./pages/VideoRelationships";
import VideoEmotionalIntelligence from "./pages/VideoEmotionalIntelligence";
import ArticlePromoted from "./pages/ArticlePromoted";
import ArticleMicroaggressions from "./pages/ArticleMicroaggressions";
import VideoImpostorSyndrome from "./pages/VideoImpostorSyndrome";
import Review from "./pages/Review";
import HelpSupport from "./pages/HelpSupport";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <AuthProvider>
          <SidebarProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter basename={import.meta.env.BASE_URL}>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/dashboard" element={<Index />} />
                <Route path="/module/:id" element={<ModuleDetail />} />
                <Route path="/progress" element={<Progress />} />
                <Route path="/library" element={<Library />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/article/warm-intro" element={<ArticleWarmIntro />} />
                <Route path="/article/burnout" element={<ArticleBurnout />} />
                <Route path="/article/criticism" element={<ArticleCriticism />} />
                <Route path="/article/conversations" element={<ArticleConversations />} />
                <Route path="/deep-dive/cultures" element={<DeepDiveCultures />} />
                <Route path="/deep-dive/managing-up" element={<DeepDiveManagingUp />} />
                <Route path="/video/interview" element={<VideoInterview />} />
                <Route path="/video/relationships" element={<VideoRelationships />} />
                <Route path="/video/emotional-intelligence" element={<VideoEmotionalIntelligence />} />
                <Route path="/video/impostor-syndrome" element={<VideoImpostorSyndrome />} />
                <Route path="/article/promoted" element={<ArticlePromoted />} />
                <Route path="/article/microaggressions" element={<ArticleMicroaggressions />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/review" element={<Review />} />
                <Route path="/help" element={<HelpSupport />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </SidebarProvider>
        </AuthProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
