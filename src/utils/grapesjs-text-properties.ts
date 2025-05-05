import { TextStyle } from "../types/TextProperties";
import { textStyleToGrapes } from "./styleTransformers";

export const applyTextProperties = (component: any, properties: TextStyle) => {
  if (!component || !component.is("text")) return;

  const styles = textStyleToGrapes(properties);
  component.setStyle(styles);
};

export const setupTextComponents = (editor: any) => {
  editor.DomComponents.addType("text", {
    model: {
      defaults: {
        tagName: "div",
        draggable: true,
        droppable: false,
        stylable: true,
        editable: true,
      },
    },
  });
};
