import { PropertyConfig } from "./TextProperties";

// Base interface for all style categories
export interface StyleCategory {
  id: string;
  label: string;
  icon?: string;
  order: number;
  properties: Record<string, PropertyConfig>;
}

// Registry to keep track of all style categories
export interface StyleRegistry {
  categories: Record<string, StyleCategory>;
}

// Style panel configuration
export interface StylePanelConfig {
  id: string;
  component: React.ComponentType<StylePanelProps>;
  category: StyleCategory;
}

// Props for style panels
export interface StylePanelProps {
  properties: Record<string, PropertyConfig>;
  onChange: (key: string, value: any) => void;
}

// Complete style state
export interface ComponentStyles {
  categories: Record<string, Record<string, any>>;
}

// Style transformer interface
export interface StyleTransformer {
  toGrapesJS: (styles: ComponentStyles) => Record<string, any>;
  fromGrapesJS: (styles: Record<string, any>) => ComponentStyles;
}
