import { Home, BookOpen, BarChart3, User, MessageSquare, PanelLeftClose, PanelLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import { useSidebar } from "@/components/SidebarContext";

interface DesktopSidebarProps {
  onTranslatorOpen: () => void;
}

const DesktopSidebar = ({ onTranslatorOpen }: DesktopSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const { collapsed, toggle } = useSidebar();

  const navItems = [
    { icon: Home, label: "Home", route: "/dashboard" },
    { icon: BookOpen, label: "Library", route: "/library" },
    { icon: BarChart3, label: "Insights", route: "/insights" },
    { icon: User, label: "Profile", route: "/profile" },
  ];

  return (
    <aside
      className={`hidden md:flex fixed left-0 top-0 bottom-0 flex-col bg-card z-40 transition-all duration-300 ${
        collapsed ? "w-[68px]" : "w-[220px]"
      }`}
    >
      {/* Logo + collapse toggle */}
      <div className={`flex items-center pt-7 pb-8 ${collapsed ? "px-4 justify-center" : "px-6 justify-between"}`}>
        {!collapsed && <Logo className="h-8" />}
        <button
          onClick={toggle}
          className="p-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
        >
          {collapsed ? <PanelLeft className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className={`flex-1 flex flex-col gap-1 ${collapsed ? "px-2" : "px-3"}`}>
        {navItems.map((item) => {
          const active = path === item.route;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.route)}
              title={collapsed ? item.label : undefined}
              className={`flex items-center gap-3 py-3 rounded-xl text-sm font-medium transition-colors ${
                collapsed ? "justify-center px-0" : "px-4"
              } ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Translator button at bottom */}
      <div className={`pb-6 ${collapsed ? "px-2" : "px-3"}`}>
        <button
          onClick={onTranslatorOpen}
          title={collapsed ? "Social Translator" : undefined}
          className={`flex items-center gap-3 w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity ${
            collapsed ? "justify-center px-0" : "px-4"
          }`}
        >
          <MessageSquare className="w-5 h-5 shrink-0" />
          {!collapsed && <span>Social Translator</span>}
        </button>
      </div>
    </aside>
  );
};

export default DesktopSidebar;
