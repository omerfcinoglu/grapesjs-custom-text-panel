import { useState, useCallback } from "react";

interface NumericInputOptions {
  min?: number;
  max?: number;
  step?: number;
}

export const useNumericInput = (
  initialValue: number,
  onChange: (value: number) => void,
  options: NumericInputOptions = {}
) => {
  const { min, max, step = 1 } = options;
  const [displayValue, setDisplayValue] = useState(String(initialValue));

  const validateValue = useCallback(
    (value: number): number => {
      let validValue = value;
      if (min !== undefined) validValue = Math.max(min, validValue);
      if (max !== undefined) validValue = Math.min(max, validValue);
      return validValue;
    },
    [min, max]
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayValue(e.target.value);
  }, []);

  const handleBlur = useCallback(() => {
    const numericValue = parseFloat(displayValue);
    if (isNaN(numericValue)) {
      setDisplayValue(String(initialValue));
      return;
    }

    const validValue = validateValue(numericValue);
    setDisplayValue(String(validValue));
    onChange(validValue);
  }, [displayValue, initialValue, onChange, validateValue]);

  const increment = useCallback(() => {
    const currentValue = parseFloat(displayValue);
    if (isNaN(currentValue)) return;

    const newValue = validateValue(currentValue + step);
    setDisplayValue(String(newValue));
    onChange(newValue);
  }, [displayValue, step, onChange, validateValue]);

  const decrement = useCallback(() => {
    const currentValue = parseFloat(displayValue);
    if (isNaN(currentValue)) return;

    const newValue = validateValue(currentValue - step);
    setDisplayValue(String(newValue));
    onChange(newValue);
  }, [displayValue, step, onChange, validateValue]);

  return {
    displayValue,
    handleChange,
    handleBlur,
    increment,
    decrement,
  };
};
