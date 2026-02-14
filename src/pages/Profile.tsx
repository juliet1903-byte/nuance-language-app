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
import userAvatar from "@/assets/user-avatar.jpg";

const Profile = () => {
  const navigate = useNavigate();

  const quickStats = [
    { icon: Flame, label: "Day Streak", value: "7", color: "text-vibe-blunt" },
    { icon: BookOpen, label: "Modules", value: "2/8", color: "text-cta" },
    { icon: Award, label: "Vibe IQ", value: "72", color: "text-accent" },
  ];

  const settingsGroups = [
    {
      title: "Preferences",
      items: [
        { icon: Bell, label: "Notifications", toggle: true },
        { icon: Moon, label: "Dark Mode", toggle: true, disabled: true },
        { icon: Globe, label: "Language", value: "English" },
      ],
    },
    {
      title: "Account",
      items: [
        { icon: Shield, label: "Privacy & Security" },
        { icon: HelpCircle, label: "Help & Support" },
      ],
    },
  ];

  return (
    <AppLayout>
      {/* Header */}
      <header className="flex items-center gap-3 px-5 pt-6 pb-4 md:max-w-[900px] md:mx-auto md:w-full">
        <button onClick={() => navigate("/")} className="p-2 -ml-2 rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold">Profile</h1>
      </header>

      <main className="px-5 space-y-6 pb-8 md:max-w-[900px] md:mx-auto md:w-full">
        {/* Avatar & Name */}
        <section className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-accent ring-offset-2 ring-offset-background mb-3">
            <img
              src={userAvatar}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl font-semibold">Sarina M.</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Junior Marketing Manager
          </p>
          <span className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-semibold">
            <Award className="w-3.5 h-3.5" />
            The Specialist
          </span>
        </section>

        {/* Quick Stats */}
        <section className="grid grid-cols-3 gap-3">
          {quickStats.map((stat) => (
            <div
              key={stat.label}
              className="bg-card rounded-2xl p-4 shadow-sm flex flex-col items-center text-center"
            >
              <stat.icon className={`w-5 h-5 ${stat.color} mb-1.5`} />
              <span className="text-xl font-semibold">{stat.value}</span>
              <span className="text-[11px] text-muted-foreground mt-0.5">
                {stat.label}
              </span>
            </div>
          ))}
        </section>

        {/* Settings Groups */}
        {settingsGroups.map((group) => (
          <section key={group.title}>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              {group.title}
            </h2>
            <div className="bg-card rounded-2xl shadow-sm overflow-hidden divide-y divide-border">
              {group.items.map((item) => (
                <button
                  key={item.label}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-secondary/50 transition-colors"
                  disabled={item.disabled}
                >
                  <item.icon className="w-5 h-5 text-muted-foreground shrink-0" />
                  <span className="flex-1 text-sm font-medium">{item.label}</span>
                  {item.toggle ? (
                    <Switch disabled={item.disabled} />
                  ) : item.value ? (
                    <span className="text-xs text-muted-foreground mr-1">{item.value}</span>
                  ) : null}
                  {!item.toggle && (
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
              ))}
            </div>
          </section>
        ))}

        {/* Sign Out */}
        <section>
          <button className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-destructive/20 text-destructive text-sm font-medium hover:bg-destructive/5 transition-colors">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </section>

        {/* Version */}
        <p className="text-center text-[11px] text-muted-foreground pb-2">
          Nuance v1.0 · Career Playbook
        </p>
      </main>
    </AppLayout>
  );
};

export default Profile;
