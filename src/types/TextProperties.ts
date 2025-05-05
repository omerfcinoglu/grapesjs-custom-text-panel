export interface CharacterProperties {
  fontSize: string;
  fontWeight: string;
  fontFamily: string;
}

export interface FillProperties {
  color: string;
  opacity?: number;
}

export interface StrokeProperties {
  width: number;
  color: string;
  opacity?: number;
}

export interface ShadowProperties {
  offsetX: number;
  offsetY: number;
  blur: number;
  color: string;
  opacity?: number;
}

export interface TextStyle {
  character: CharacterProperties;
  fill: FillProperties;
  stroke: StrokeProperties;
  shadow: ShadowProperties;
}

export type PropertyType = "character" | "fill" | "stroke" | "shadow";
