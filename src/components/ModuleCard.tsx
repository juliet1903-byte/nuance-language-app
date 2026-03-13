import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import type { Module } from "@/data/modules";
import { useAuth } from "@/hooks/useAuth";
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
  "module-common-mistakes": moduleCommonMistakes,
};

const ModuleCard = ({ module }: { module: Module }) => {
  const navigate = useNavigate();
  const { isGuest, user } = useAuth();
  const { completedLessons, completedModules } = useProgress();

  const isLoggedIn = !isGuest && !!user;
  const allLessonsDone =
    isLoggedIn &&
    module.lessons.length > 0 &&
    module.lessons.every((l) => completedLessons.has(l.id));
  const isModuleDone = isLoggedIn && (completedModules.has(module.id) || allLessonsDone);
  const doneLessons = isLoggedIn
    ? module.lessons.filter((l) => completedLessons.has(l.id)).length
    : 0;
  const hasProgress = isLoggedIn && doneLessons > 0 && !isModuleDone;

  return (
    <button onClick={() => navigate(`/module/${module.id}`)} className="group w-36 shrink-0 text-left">
      <div className="relative mb-2 h-36 w-36 overflow-hidden rounded-2xl bg-card p-3">
        <img
          src={imageMap[module.image] || moduleMeeting}
          alt={module.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {isModuleDone && (
          <div className="absolute right-2 top-2">
            <Check className="h-4 w-4 text-foreground/70" strokeWidth={2.5} />
          </div>
        )}
      </div>
      <p className="text-base font-medium leading-tight lg:text-base">{module.title}</p>
      {hasProgress && (
        <p className="mt-0.5 text-xs text-muted-foreground">
          {doneLessons}/{module.lessons.length} lessons
        </p>
      )}
    </button>
  );
};

export default ModuleCard;
