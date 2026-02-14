import { useNavigate } from "react-router-dom";
import type { Module } from "@/data/modules";

import moduleMeeting from "@/assets/module-meeting.jpg";
import moduleNavigate from "@/assets/module-navigate.jpg";
import moduleCultures from "@/assets/module-cultures.jpg";

const imageMap: Record<string, string> = {
  "module-meeting": moduleMeeting,
  "module-navigate": moduleNavigate,
  "module-cultures": moduleCultures,
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
