import { useNavigate } from "react-router-dom";
import type { Module } from "@/data/modules";

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
};

const ModuleCard = ({ module }: { module: Module }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/module/${module.id}`)}
      className="shrink-0 w-36 text-left"
    >
      <div className="w-36 h-36 rounded-2xl overflow-hidden bg-muted mb-2">
        <img
          src={imageMap[module.image] || moduleMeeting}
          alt={module.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <p className="text-sm font-semibold leading-tight">{module.title}</p>
    </button>
  );
};

export default ModuleCard;
