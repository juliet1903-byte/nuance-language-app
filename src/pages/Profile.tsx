import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ChevronRight,
  Bell,
  Moon,
  Globe,
  Shield,
  HelpCircle,
  LogOut,
  Award,
  BookOpen,
  Flame,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import AppLayout from "@/components/AppLayout";
import { useTheme } from "@/components/ThemeContext";
import { useAuth } from "@/components/AuthContext";
import { useProgress } from "@/hooks/useProgress";
import LetterAvatar from "@/components/LetterAvatar";
import { modules } from "@/data/modules";
import LoginBanner from "@/components/LoginBanner";

const LEVEL_NAMES = ["Natural Flow", "The Specialist", "The Collaborator", "The Influencer"];

const Profile = () => {
  const navigate = useNavigate();
  const { theme, toggle: toggleTheme } = useTheme();
  const { isGuest, user, profile, signOut } = useAuth();
  const { streakDays, modulesCompleted, vibeIq } = useProgress();
  const showBanner = isGuest || !user;

  const displayName = showBanner ? "New User" : (profile?.display_name || user?.email?.split("@")[0] || "User");
  const displayEmail = showBanner ? "user@example.com" : user?.email;
  const levelName = showBanner ? LEVEL_NAMES[0] : LEVEL_NAMES[Math.min((profile?.learning_level ?? 1) - 1, 3)];

  const quickStats = [
    { icon: Flame, label: "Day Streak", value: showBanner ? "0" : String(streakDays), color: "text-vibe-blunt" },
    { icon: BookOpen, label: "Modules", value: showBanner ? `0/${modules.length}` : `${modulesCompleted}/${modules.length}`, color: "text-cta" },
    { icon: Award, label: "Vibe IQ", value: showBanner ? "0" : String(vibeIq), color: "text-accent" },
  ];

  return (
    <AppLayout>
      <header className="flex items-center gap-3 px-5 pt-6 pb-4 md:max-w-[900px] md:mx-auto md:w-full">
        <button onClick={() => navigate("/")} className="p-2 -ml-2 rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold">Profile</h1>
      </header>

      <main className="px-5 space-y-6 pb-8 md:max-w-[900px] md:mx-auto md:w-full relative overflow-hidden">
        {showBanner && <LoginBanner className="-top-2" />}

        <section className="flex flex-col items-center text-center">
          <div className="ring-2 ring-accent ring-offset-2 ring-offset-background rounded-full mb-3">
            <LetterAvatar
              name={showBanner ? "U" : profile?.display_name}
              email={showBanner ? undefined : user?.email}
              size="lg"
            />
          </div>
          <h2 className="text-xl font-semibold">{displayName}</h2>
          <p className="text-sm text-muted-foreground mt-0.5">{displayEmail}</p>
          <span className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-semibold">
            <Award className="w-3.5 h-3.5" />
            {levelName}
          </span>
        </section>

        <section className="grid grid-cols-3 gap-3">
          {quickStats.map((stat) => (
            <div key={stat.label} className="bg-card rounded-2xl p-4 shadow-sm flex flex-col items-center text-center">
              <stat.icon className={`w-5 h-5 ${stat.color} mb-1.5`} />
              <span className="text-xl font-semibold">{stat.value}</span>
              <span className="text-xs text-muted-foreground mt-0.5">{stat.label}</span>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Preferences</h2>
          <div className="bg-card rounded-2xl shadow-sm overflow-hidden divide-y divide-border">
            <div className="w-full flex items-center gap-3 px-4 py-3.5">
              <Bell className="w-5 h-5 text-muted-foreground shrink-0" />
              <span className="flex-1 text-sm font-medium">Notifications</span>
              <Switch />
            </div>
            <div className="w-full flex items-center gap-3 px-4 py-3.5">
              <Moon className="w-5 h-5 text-muted-foreground shrink-0" />
              <span className="flex-1 text-sm font-medium">Dark Mode</span>
              <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
            </div>
            <button className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-secondary/50 transition-colors">
              <Globe className="w-5 h-5 text-muted-foreground shrink-0" />
              <span className="flex-1 text-sm font-medium">Language</span>
              <span className="text-xs text-muted-foreground mr-1">English</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Account</h2>
          <div className="bg-card rounded-2xl shadow-sm overflow-hidden divide-y divide-border">
            <button className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-secondary/50 transition-colors">
              <Shield className="w-5 h-5 text-muted-foreground shrink-0" />
              <span className="flex-1 text-sm font-medium">Privacy & Security</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-secondary/50 transition-colors">
              <HelpCircle className="w-5 h-5 text-muted-foreground shrink-0" />
              <span className="flex-1 text-sm font-medium">Help & Support</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </section>

        {!showBanner && (
          <section>
            <button
              onClick={async () => { await signOut(); navigate("/"); }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-destructive/20 text-destructive text-sm font-medium hover:bg-destructive/5 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </section>
        )}

        <p className="text-center text-xs text-muted-foreground pb-2">Nuance v1.0 · Career Playbook</p>
      </main>
    </AppLayout>
  );
};

export default Profile;
