import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import type { Module } from "@/data/modules";
import { useAuth } from "@/components/AuthContext";
import { useProgress } from "@/hooks/useProgress";

import moduleMeeting from "@/assets/module-meeting.jpg";
import moduleNavigate from "@/assets/module-navigate.jpg";
import moduleCultures from "@/assets/module-cultures.jpg";
import moduleStartingStrong from "@/assets/module-starting-strong.png";
import moduleMeetingRoom from "@/assets/module-meeting-room.png";
import moduleAcrossCultures from "@/assets/module-across-cultures.png";
import moduleManagingUp from "@/assets/module-managing-up.png";
import moduleDifficultConvos from "@/assets/module-difficult-convos.png";
import moduleCareerMoves from "@/assets/module-career-moves.png";
import moduleDei from "@/assets/module-dei.png";
import moduleCommonMistakes from "@/assets/module-common-mistakes.png";

const imageMap: Record<string, string> = {
  "module-meeting": moduleMeeting,
  "module-navigate": moduleNavigate,
  "module-cultures": moduleCultures,
  "module-starting-strong": moduleStartingStrong,
  "module-meeting-room": moduleMeetingRoom,
  "module-across-cultures": moduleAcrossCultures,
  "module-managing-up": moduleManagingUp,
  "module-difficult-convos": moduleDifficultConvos,
  "module-career-moves": moduleCareerMoves,
  "module-dei": moduleDei,
  "module-common-mistakes": moduleCommonMistakes
};

const ModuleCard = ({ module }: {module: Module;}) => {
  const navigate = useNavigate();
  const { isGuest, user } = useAuth();
  const { completedLessons, completedModules } = useProgress();

  const isLoggedIn = !isGuest && !!user;
  const allLessonsDone = isLoggedIn && module.lessons.length > 0 && module.lessons.every((l) => completedLessons.has(l.id));
  const isModuleDone = isLoggedIn && (completedModules.has(module.id) || allLessonsDone);
  const doneLessons = isLoggedIn ? module.lessons.filter((l) => completedLessons.has(l.id)).length : 0;
  const hasProgress = isLoggedIn && doneLessons > 0 && !isModuleDone;

  return (
    <button
      onClick={() => navigate(`/module/${module.id}`)}
      className="shrink-0 w-36 text-left">
      
      <div className="w-36 h-36 rounded-2xl overflow-hidden bg-card p-3 mb-2 relative">
        <img
          src={imageMap[module.image] || moduleMeeting}
          alt={module.title}
          className="w-full h-full object-cover"
          loading="lazy" />
        
        {isModuleDone &&
        <div className="absolute top-2 right-2">
            <Check className="w-4 h-4 text-foreground/70" strokeWidth={2.5} />
          </div>
        }
      </div>
      <p className="lg:text-base leading-tight text-base font-medium">{module.title}</p>
      {hasProgress &&
      <p className="text-xs mt-0.5 text-muted-foreground">{doneLessons}/{module.lessons.length} lessons</p>
      }
    </button>);

};

export default ModuleCard;