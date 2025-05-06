export type InputType = "numeric" | "color" | "dropdown" | "radio";

export interface PropertyConfig {
  type: InputType;
  label: string;
  value: any;
  options?: {
    min?: number;
    max?: number;
    step?: number;
    items?: Array<{ value: string; label: string }>;
    modes?: Array<string>;
    // Add these for ColorPicker
    allowGradient?: boolean;
    defaultMode?: "solid" | "gradient";
  };
}

export interface CharacterProperties {
  fontFamily: PropertyConfig;
  fontSize: PropertyConfig;
  fontWeight: PropertyConfig;
  case: PropertyConfig;
  grown: PropertyConfig;
  lineHeight: PropertyConfig;
  letterSpacing: PropertyConfig;
  textAlign: PropertyConfig;
  listOrder: PropertyConfig;
}

export interface FillProperties {
  color: PropertyConfig;
  mode: PropertyConfig;
  opacity: PropertyConfig;
}

export interface StrokeRow {
  color: PropertyConfig;
  mode: PropertyConfig;
  width: PropertyConfig;
}

export interface ShadowRow {
  color: PropertyConfig;
  offsetX: PropertyConfig;
  offsetY: PropertyConfig;
  blur: PropertyConfig;
  opacity: PropertyConfig;
}

export interface BlurProperties {
  blur: PropertyConfig;
}

export interface TextStyle {
  character: CharacterProperties;
  fill: FillProperties;
  stroke: StrokeRow;
  shadow: ShadowRow;
  blur: BlurProperties;
}

export const defaultTextStyle: TextStyle = {
  character: {
    fontFamily: {
      type: "dropdown",
      label: "Font Family",
      value: "Arial",
      options: {
        items: [
          { value: "Arial", label: "Arial" },
          { value: "Helvetica", label: "Helvetica" },
          { value: "Times New Roman", label: "Times New Roman" },
          { value: "Georgia", label: "Georgia" },
          { value: "Verdana", label: "Verdana" },
        ],
      },
    },
    fontSize: {
      type: "numeric",
      label: "Font Size",
      value: 16,
      options: { min: 1, max: 200, step: 1 },
    },
    fontWeight: {
      type: "numeric",
      label: "Font Weight",
      value: 400,
      options: { min: 100, max: 900, step: 100 },
    },
    case: {
      type: "radio",
      label: "Case",
      value: "none",
      options: {
        items: [
          { value: "none", label: "None" },
          { value: "uppercase", label: "Uppercase" },
          { value: "lowercase", label: "Lowercase" },
          { value: "capitalize", label: "Capitalize" },
        ],
      },
    },
    grown: {
      type: "radio",
      label: "Growth",
      value: "none",
      options: {
        items: [
          { value: "none", label: "None" },
          { value: "vertical", label: "Vertical" },
          { value: "horizontal", label: "Horizontal" },
        ],
      },
    },
    lineHeight: {
      type: "numeric",
      label: "Line Height",
      value: 1.2,
      options: { min: 0, max: 10, step: 0.1 },
    },
    letterSpacing: {
      type: "numeric",
      label: "Letter Spacing",
      value: 0,
      options: { min: -5, max: 20, step: 0.1 },
    },
    textAlign: {
      type: "radio",
      label: "Text Align",
      value: "left",
      options: {
        items: [
          { value: "left", label: "Left" },
          { value: "center", label: "Center" },
          { value: "right", label: "Right" },
          { value: "justify", label: "Justify" },
        ],
      },
    },
    listOrder: {
      type: "radio",
      label: "List Order",
      value: "none",
      options: {
        items: [
          { value: "none", label: "None" },
          { value: "bullet", label: "Bullet" },
          { value: "number", label: "Number" },
        ],
      },
    },
  },
  fill: {
    color: {
      type: "color",
      label: "Color",
      value: "#000000",
      options: { modes: ["solid", "gradient"] },
    },
    mode: {
      type: "dropdown",
      label: "Mode",
      value: "solid",
      options: {
        items: [
          { value: "solid", label: "Solid" },
          { value: "gradient", label: "Gradient" },
        ],
      },
    },
    opacity: {
      type: "numeric",
      label: "Opacity",
      value: 1,
      options: { min: 0, max: 1, step: 0.01 },
    },
  },
  stroke: {
    color: {
      type: "color",
      label: "Stroke Color",
      value: "#000000",
      options: { modes: ["solid", "gradient"] },
    },
    mode: {
      type: "dropdown",
      label: "Mode",
      value: "solid",
      options: {
        items: [
          { value: "solid", label: "Solid" },
          { value: "gradient", label: "Gradient" },
        ],
      },
    },
    width: {
      type: "numeric",
      label: "Width",
      value: 1,
      options: { min: 0, max: 20, step: 0.5 },
    },
  },
  shadow: {
    color: {
      type: "color",
      label: "Shadow Color",
      value: "#000000",
      options: { modes: ["solid"] },
    },
    offsetX: {
      type: "numeric",
      label: "X Offset",
      value: 0,
      options: { min: -50, max: 50, step: 1 },
    },
    offsetY: {
      type: "numeric",
      label: "Y Offset",
      value: 0,
      options: { min: -50, max: 50, step: 1 },
    },
    blur: {
      type: "numeric",
      label: "Blur",
      value: 0,
      options: { min: 0, max: 50, step: 1 },
    },
    opacity: {
      type: "numeric",
      label: "Shadow Opacity",
      value: 1,
      options: { min: 0, max: 1, step: 0.01 },
    },
  },
  blur: {
    blur: {
      type: "numeric",
      label: "Blur",
      value: 0,
      options: { min: 0, max: 20, step: 0.5 },
    },
  },
};
