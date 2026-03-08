import { useState, useCallback, useEffect } from "react";

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

  useEffect(() => {
    localStorage.setItem(TEXT_SIZE_KEY, textSize);
  }, [textSize]);

  const cycleTextSize = useCallback(() => {
    setTextSize((prev) => {
      if (prev === "x-large") return "normal";
      const currentIndex = sizes.indexOf(prev);
      return sizes[currentIndex + 1] ?? prev;
    });
  }, []);

  return { textSize, textSizeClass: sizeMap[textSize], cycleTextSize, isMaxSize: textSize === "x-large" };
};
