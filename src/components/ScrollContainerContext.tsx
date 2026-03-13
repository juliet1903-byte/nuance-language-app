import { createContext, useContext } from "react";

export const ScrollContainerContext = createContext<React.RefObject<HTMLDivElement> | null>(null);
export const useScrollContainer = () => useContext(ScrollContainerContext);
