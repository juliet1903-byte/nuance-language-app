import { Home, BookOpen, BarChart3, User, MessageSquare } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/logo_nuance.svg";

interface DesktopSidebarProps {
  onTranslatorOpen: () => void;
}

const DesktopSidebar = ({ onTranslatorOpen }: DesktopSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const navItems = [
    { icon: Home, label: "Home", route: "/" },
    { icon: BookOpen, label: "Library", route: "/library" },
    { icon: BarChart3, label: "Stats", route: "/stats" },
    { icon: User, label: "Profile", route: "/profile" },
  ];

  return (
    <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-[220px] flex-col bg-card border-r border-border z-40">
      {/* Logo */}
      <div className="px-6 pt-7 pb-8">
        <img src={logo} alt="Nuance" className="h-8" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1 px-3">
        {navItems.map((item) => {
          const active = path === item.route;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.route)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Translator button at bottom */}
      <div className="px-3 pb-6">
        <button
          onClick={onTranslatorOpen}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <MessageSquare className="w-5 h-5" />
          <span>Social Translator</span>
        </button>
      </div>
    </aside>
  );
};

export default DesktopSidebar;
