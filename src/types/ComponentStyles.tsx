import { TextStyle, defaultTextStyle } from "./TextProperties";
import { ApperanceStyle, defaultAppearanceProperties } from "./AppearanceProperties";

export interface ComponentStyles {
  text: TextStyle;
  appearance: ApperanceStyle;
}

export const createDefaultComponentStyles = (): ComponentStyles => ({
  text: defaultTextStyle,
  appearance: defaultAppearanceProperties
});
