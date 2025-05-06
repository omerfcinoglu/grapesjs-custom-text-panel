export interface PropertyConfig {
  type: "numeric";
  value: any;
  label: string;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
}

export interface ApperanceStyle {
  scale: PropertyConfig;
  opacity: PropertyConfig;
  roundness: PropertyConfig;
  rotation: PropertyConfig;
}

export const defaultAppearanceProperties: ApperanceStyle = {
  scale: {
    type: "numeric",
    value: 1,
    label: "Scale",
    min: 0.1,
    max: 10,
    step: 0.1,
  },
  opacity: {
    type: "numeric",
    value: 100,
    label: "Opacity",
    min: 0,
    max: 100,
    step: 1,
  },
  roundness: {
    type: "numeric",
    value: 0,
    label: "Roundness",
    min: 0,
    max: 50,
    step: 1,
  },
  rotation: {
    type: "numeric",
    value: 0,
    label: "Rotation",
    min: -360,
    max: 360,
    step: 1,
  },
};
