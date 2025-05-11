import { useState, useEffect, useCallback } from "react";

export interface TextStyles {
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  textCase: "none" | "uppercase" | "lowercase" | "capitalize";
  lineHeight: number;
  letterSpacing: number;
  textAlign: "left" | "center" | "right" | "justify";
  listStyle: "none" | "bullet" | "number";
}

const defaultTextStyles: TextStyles = {
  fontFamily: "Arial",
  fontSize: 16,
  fontWeight: 400,
  textCase: "none",
  lineHeight: 1.2,
  letterSpacing: 0,
  textAlign: "left",
  listStyle: "none",
};

interface UseTextStylesProps {
  component: any; // GrapesJS component
  onChange?: (styles: Partial<TextStyles>) => void;
}

export const useTextStyles = ({ component, onChange }: UseTextStylesProps) => {
  const [styles, setStyles] = useState<TextStyles>(defaultTextStyles);

  // Extract text styles from component when it changes
  useEffect(() => {
    if (component) {
      const componentStyles = component.getStyle();
      const textStyles: Partial<TextStyles> = {
        fontFamily: componentStyles["font-family"],
        fontSize:
          parseInt(componentStyles["font-size"]) || defaultTextStyles.fontSize,
        fontWeight:
          parseInt(componentStyles["font-weight"]) ||
          defaultTextStyles.fontWeight,
        textCase:
          componentStyles["text-transform"] || defaultTextStyles.textCase,
        lineHeight:
          parseFloat(componentStyles["line-height"]) ||
          defaultTextStyles.lineHeight,
        letterSpacing:
          parseFloat(componentStyles["letter-spacing"]) ||
          defaultTextStyles.letterSpacing,
        textAlign: componentStyles["text-align"] || defaultTextStyles.textAlign,
        listStyle:
          componentStyles["list-style-type"] || defaultTextStyles.listStyle,
      };
      setStyles((prev) => ({ ...prev, ...textStyles }));
    }
  }, [component]);

  // Update a single style property
  const updateStyle = useCallback(
    (key: keyof TextStyles, value: any) => {
      setStyles((prev) => {
        const newStyles = { ...prev, [key]: value };

        // Convert style key to CSS property name
        const cssProperties: Record<keyof TextStyles, string> = {
          fontFamily: "font-family",
          fontSize: "font-size",
          fontWeight: "font-weight",
          textCase: "text-transform",
          lineHeight: "line-height",
          letterSpacing: "letter-spacing",
          textAlign: "text-align",
          listStyle: "list-style-type",
        };

        // Apply style to component
        if (component) {
          const cssKey = cssProperties[key];
          const cssValue = key === "fontSize" ? `${value}px` : value;
          component.setStyle({ [cssKey]: cssValue });
        }

        // Notify parent of change
        if (onChange) {
          onChange({ [key]: value });
        }

        return newStyles;
      });
    },
    [component, onChange]
  );

  return {
    styles,
    updateStyle,
  };
};
