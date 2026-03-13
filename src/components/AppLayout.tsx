import { ReactNode, useState, useRef } from "react";
import DesktopSidebar from "@/components/DesktopSidebar";
import BottomNav from "@/components/BottomNav";
import SocialTranslator from "@/components/SocialTranslator";
import { useSidebar } from "@/components/SidebarContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollContainerContext } from "@/components/ScrollContainerContext";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [translatorOpen, setTranslatorOpen] = useState(false);
  const { collapsed } = useSidebar();
  const isMobile = useIsMobile();
  const scrollRef = useRef<HTMLDivElement>(null);

  const sidebarWidth = collapsed ? 68 : 220;

  return (
    <ScrollContainerContext.Provider value={scrollRef}>
      <div className="min-h-screen bg-background md:flex">
        <DesktopSidebar onTranslatorOpen={() => setTranslatorOpen(true)} />

        <div
          ref={scrollRef}
          className="flex-1 pb-24 md:pb-8 md:h-screen md:overflow-y-auto transition-all duration-200"
          style={!isMobile ? { marginLeft: sidebarWidth } : undefined}
        >
          {children}
        </div>

        <BottomNav onTranslatorOpen={() => setTranslatorOpen(true)} />
        <SocialTranslator open={translatorOpen} onClose={() => setTranslatorOpen(false)} />
      </div>
    </ScrollContainerContext.Provider>
  );
};

export default AppLayout;
