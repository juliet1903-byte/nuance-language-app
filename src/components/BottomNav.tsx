import { Home, BookOpen, BarChart3, User, MessageSquare } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

interface BottomNavProps {
  onTranslatorOpen: () => void;
}

const BottomNav = ({ onTranslatorOpen }: BottomNavProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const tabs = [
    { icon: Home, label: "Home", route: "/" },
    { icon: BookOpen, label: "Library", route: "/library" },
    { id: "translator", icon: MessageSquare, label: "" },
    { icon: BarChart3, label: "Stats", route: "/stats" },
    { icon: User, label: "Profile", route: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 glass-light border-t border-border/50">
      <div className="max-w-lg mx-auto flex items-center justify-around py-2 px-4">
        {tabs.map((tab, i) => {
          if (tab.id === "translator") {
            return (
              <button
                key="translator"
                onClick={onTranslatorOpen}
                className="relative -mt-6 w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg"
              >
                <MessageSquare className="w-6 h-6 text-primary-foreground" />
              </button>
            );
          }
          const active = path === tab.route;
          return (
            <button
              key={tab.label}
              onClick={() => navigate(tab.route!)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 transition-colors ${
                active ? "text-accent" : "text-muted-foreground"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
