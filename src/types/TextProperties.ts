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
