// src/hooks/useColorPicker.ts
import { useState, useCallback } from "react";

interface ColorPickerOptions {
  allowGradient?: boolean;
  defaultMode?: "solid" | "gradient";
}

export const useColorPicker = (
  initialColor: string,
  onChange: (color: string) => void,
  options: ColorPickerOptions = {}
) => {
  const [color, setColor] = useState(initialColor);
  const [mode, setMode] = useState<"solid" | "gradient">(
    options.defaultMode || "solid"
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleColorChange = useCallback(
    (newColor: string) => {
      setColor(newColor);
      onChange(newColor);
    },
    [onChange]
  );

  const togglePicker = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleModeChange = useCallback((newMode: "solid" | "gradient") => {
    setMode(newMode);
  }, []);

  return {
    color,
    mode,
    isOpen,
    handleColorChange,
    togglePicker,
    handleModeChange,
  };
};
