import { useState, useCallback, useEffect, useRef } from "react";

export type TextSize = "normal" | "large" | "x-large";

const TEXT_SIZE_KEY = "nuance-text-size";

const sizeMap: Record<TextSize, string> = {
  normal: "",
  large: "text-size-large",
  "x-large": "text-size-xlarge",
};

const sizes: TextSize[] = ["normal", "large", "x-large"];

export const useTextSize = () => {
  const [textSize, setTextSize] = useState<TextSize>(() => {
    const saved = localStorage.getItem(TEXT_SIZE_KEY);
    return (saved as TextSize) || "normal";
  });

  const directionRef = useRef<"up" | "down">("up");

  useEffect(() => {
    localStorage.setItem(TEXT_SIZE_KEY, textSize);
    if (textSize === "x-large") directionRef.current = "down";
    if (textSize === "normal") directionRef.current = "up";
  }, [textSize]);

  const cycleTextSize = useCallback(() => {
    setTextSize((prev) => {
      const currentIndex = sizes.indexOf(prev);
      if (directionRef.current === "up") {
        return sizes[currentIndex + 1] ?? prev;
      } else {
        return sizes[currentIndex - 1] ?? prev;
      }
    });
  }, []);

  return { textSize, textSizeClass: sizeMap[textSize], cycleTextSize, isMaxSize: textSize === "x-large" };
};
