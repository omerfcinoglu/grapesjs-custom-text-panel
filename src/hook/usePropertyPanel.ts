import { useState, useCallback } from "react";
import { PropertyConfig } from "../types/TextProperties";

export const usePropertyPanel = (initialConfig: PropertyConfig) => {
  const [config, setConfig] = useState(initialConfig);

  const updateValue = useCallback((newValue: any) => {
    setConfig((prev) => ({ ...prev, value: newValue }));
  }, []);

  return {
    config,
    updateValue,
  };
};
