import { Home, BookOpen, BarChart3, Brain, MessageSquare } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import chatIcon from "@/assets/chat-icon.png";

interface BottomNavProps {
  onTranslatorOpen: () => void;
}

const BottomNav = ({ onTranslatorOpen }: BottomNavProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const tabs = [
    { icon: Home, label: "Home", route: "/dashboard" },
    { icon: BookOpen, label: "Library", route: "/library" },
    { id: "translator", icon: MessageSquare, label: "" },
    { icon: BarChart3, label: "Insights", route: "/insights" },
    { icon: Brain, label: "Review", route: "/review" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 glass-light border-t border-border/40 dark:border-white/10 md:hidden">
      <div className="max-w-lg mx-auto flex items-center justify-around py-2 px-4">
        {tabs.map((tab, i) => {
          if (tab.id === "translator") {
            return (
              <button
                key="translator"
                onClick={onTranslatorOpen}
                className="relative -mt-6 w-14 h-14 rounded-full bg-foreground flex items-center justify-center shadow-lg dark:shadow-black/40"
              >
                <img src={chatIcon} alt="Chat" className="w-6 h-6 dark:invert" />
              </button>
            );
          }
          const active = path === tab.route;
          return (
            <button
              key={tab.label}
              onClick={() => navigate(tab.route!)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 transition-colors ${
                active ? "text-cta" : "text-muted-foreground dark:text-[hsl(220,8%,55%)]"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
