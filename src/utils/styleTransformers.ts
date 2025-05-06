import { TextStyle } from "../types/TextProperties";
import {
  ComponentStyles,
  createDefaultComponentStyles,
} from "../types/ComponentStyles";

export const grapesToTextStyle = (style: any): TextStyle => {
  // Shadow değerlerini parse et
  const shadowValues = style["text-shadow"]?.match(
    /(-?\d+px)\s+(-?\d+px)\s+(-?\d+px)\s+(rgba?\(.*?\)|#[0-9A-Fa-f]{3,8})/
  );
  const strokeValues = style["-webkit-text-stroke"]?.match(
    /(\d+px)\s+(rgba?\(.*?\)|#[0-9A-Fa-f]{3,8})/
  );

  return {
    character: {
      fontFamily: {
        type: "dropdown",
        label: "Font Family",
        value: style["font-family"] || "Arial",
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
        value: parseInt(style["font-size"]) || 16,
        options: { min: 1, max: 200, step: 1 },
      },
      fontWeight: {
        type: "numeric",
        label: "Font Weight",
        value: parseInt(style["font-weight"]) || 400,
        options: { min: 100, max: 900, step: 100 },
      },
      case: {
        type: "radio",
        label: "Case",
        value: style["text-transform"] || "none",
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
        value: parseFloat(style["line-height"]) || 1.2,
        options: { min: 0, max: 10, step: 0.1 },
      },
      letterSpacing: {
        type: "numeric",
        label: "Letter Spacing",
        value: parseFloat(style["letter-spacing"]) || 0,
        options: { min: -5, max: 20, step: 0.1 },
      },
      textAlign: {
        type: "radio",
        label: "Text Align",
        value: style["text-align"] || "left",
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
        value:
          style["list-style-type"] === "disc"
            ? "bullet"
            : style["list-style-type"] === "decimal"
            ? "number"
            : "none",
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
        value: style["color"] || "#000000",
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
        value: parseFloat(style["opacity"]) || 1,
        options: { min: 0, max: 1, step: 0.01 },
      },
    },
    stroke: {
      color: {
        type: "color",
        label: "Stroke Color",
        value: strokeValues ? strokeValues[2] : "#000000",
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
        value: strokeValues ? parseInt(strokeValues[1]) : 0,
        options: { min: 0, max: 20, step: 0.5 },
      },
    },
    shadow: {
      color: {
        type: "color",
        label: "Shadow Color",
        value: shadowValues ? shadowValues[4] : "#000000",
        options: { modes: ["solid"] },
      },
      offsetX: {
        type: "numeric",
        label: "X Offset",
        value: shadowValues ? parseInt(shadowValues[1]) : 0,
        options: { min: -50, max: 50, step: 1 },
      },
      offsetY: {
        type: "numeric",
        label: "Y Offset",
        value: shadowValues ? parseInt(shadowValues[2]) : 0,
        options: { min: -50, max: 50, step: 1 },
      },
      blur: {
        type: "numeric",
        label: "Blur",
        value: shadowValues ? parseInt(shadowValues[3]) : 0,
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
        value: parseInt(style["filter"]?.match(/blur\((\d+)px\)/)?.[1] || "0"),
        options: { min: 0, max: 20, step: 0.5 },
      },
    },
  };
};

export const textStyleToGrapes = (textStyle: TextStyle): any => {
  return {
    "font-family": textStyle.character.fontFamily.value,
    "font-size": `${textStyle.character.fontSize.value}px`,
    "font-weight": textStyle.character.fontWeight.value,
    "text-transform":
      textStyle.character.case.value === "none"
        ? "none"
        : textStyle.character.case.value,
    "line-height": textStyle.character.lineHeight.value,
    "letter-spacing": `${textStyle.character.letterSpacing.value}px`,
    "text-align": textStyle.character.textAlign.value,
    "list-style-type":
      textStyle.character.listOrder.value === "none"
        ? "none"
        : textStyle.character.listOrder.value === "bullet"
        ? "disc"
        : "decimal",
    color: textStyle.fill.color.value,
    opacity: textStyle.fill.opacity.value,
    "-webkit-text-stroke": `${textStyle.stroke.width.value}px ${textStyle.stroke.color.value}`,
    "text-shadow": `${textStyle.shadow.offsetX.value}px ${textStyle.shadow.offsetY.value}px ${textStyle.shadow.blur.value}px ${textStyle.shadow.color.value}`,
    filter: `blur(${textStyle.blur.blur.value}px)`,
  };
};

// Converts GrapesJS style object to our ComponentStyles format
export const grapesToComponentStyles = (
  grapesStyles: Record<string, any>
): ComponentStyles => {
  const componentStyles = createDefaultComponentStyles();

  // Text styles
  if (grapesStyles["font-family"])
    componentStyles.text.character.fontFamily.value =
      grapesStyles["font-family"];
  if (grapesStyles["font-size"])
    componentStyles.text.character.fontSize.value = parseInt(
      grapesStyles["font-size"]
    );
  if (grapesStyles["font-weight"])
    componentStyles.text.character.fontWeight.value =
      grapesStyles["font-weight"];
  if (grapesStyles["line-height"])
    componentStyles.text.character.lineHeight.value =
      grapesStyles["line-height"];
  if (grapesStyles["letter-spacing"])
    componentStyles.text.character.letterSpacing.value = parseInt(
      grapesStyles["letter-spacing"]
    );
  if (grapesStyles["text-align"])
    componentStyles.text.character.textAlign.value = grapesStyles["text-align"];
  if (grapesStyles["text-transform"])
    componentStyles.text.character.case.value = grapesStyles["text-transform"];

  // Fill styles
  if (grapesStyles.color)
    componentStyles.text.fill.color.value = grapesStyles.color;
  if (grapesStyles.opacity)
    componentStyles.text.fill.opacity.value = grapesStyles.opacity;

  // Blur styles
  if (grapesStyles.filter) {
    const blurMatch = grapesStyles.filter.match(/blur\((\d+)px\)/);
    if (blurMatch)
      componentStyles.text.blur.blur.value = parseInt(blurMatch[1]);
  }

  // Shadow styles
  if (grapesStyles["text-shadow"] && grapesStyles["text-shadow"] !== "none") {
    const shadowMatch = grapesStyles["text-shadow"].match(
      /(-?\d+)px\s+(-?\d+)px\s+(\d+)px\s+rgba\(([\d,\s]+),\s*([\d.]+)\)/
    );
    if (shadowMatch) {
      componentStyles.text.shadow.offsetX.value = parseInt(shadowMatch[1]);
      componentStyles.text.shadow.offsetY.value = parseInt(shadowMatch[2]);
      componentStyles.text.shadow.blur.value = parseInt(shadowMatch[3]);
      const [r, g, b] = shadowMatch[4]
        .split(",")
        .map((n: string) => parseInt(n.trim()));
      componentStyles.text.shadow.color.value = `#${r
        .toString(16)
        .padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b
        .toString(16)
        .padStart(2, "0")}`;
      componentStyles.text.shadow.opacity.value = parseFloat(shadowMatch[5]);
    }
  }

  // Stroke styles
  if (grapesStyles.border && grapesStyles.border !== "none") {
    const borderMatch = grapesStyles.border.match(/(\d+)px\s+solid\s+(.+)/);
    if (borderMatch) {
      componentStyles.text.stroke.width.value = parseInt(borderMatch[1]);
      componentStyles.text.stroke.color.value = borderMatch[2];
    }
  }

  // Appearance styles
  if (grapesStyles.transform) {
    const scaleMatch = grapesStyles.transform.match(/scale\(([\d.]+)\)/);
    if (scaleMatch)
      componentStyles.appearance.scale.value = parseFloat(scaleMatch[1]);

    const rotateMatch = grapesStyles.transform.match(/rotate\(([-\d.]+)deg\)/);
    if (rotateMatch)
      componentStyles.appearance.rotation.value = parseFloat(rotateMatch[1]);
  }

  if (grapesStyles.opacity) {
    componentStyles.appearance.opacity.value =
      parseFloat(grapesStyles.opacity) * 100;
  }

  if (grapesStyles["border-radius"]) {
    componentStyles.appearance.roundness.value = parseInt(
      grapesStyles["border-radius"]
    );
  }

  return componentStyles;
};

// Utility function to convert hex to rgb
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
        result[3],
        16
      )}`
    : "0, 0, 0";
};

// Converts our ComponentStyles format to GrapesJS style object
export const componentStylesToGrapes = (
  componentStyles: ComponentStyles
): Record<string, any> => {
  const textStyle = componentStyles.text;
  const appearanceStyle = componentStyles.appearance;

  const textStyles = {
    "font-family": textStyle.character.fontFamily.value,
    "font-size": `${textStyle.character.fontSize.value}px`,
    "font-weight": textStyle.character.fontWeight.value,
    "line-height": textStyle.character.lineHeight.value,
    "letter-spacing": `${textStyle.character.letterSpacing.value}px`,
    "text-align": textStyle.character.textAlign.value,
    "text-transform": textStyle.character.case.value,
    color: textStyle.fill.color.value,
    opacity: textStyle.fill.opacity.value,
    filter: `blur(${textStyle.blur.blur.value}px)`,
    "text-shadow":
      textStyle.shadow.offsetX.value ||
      textStyle.shadow.offsetY.value ||
      textStyle.shadow.blur.value
        ? `${textStyle.shadow.offsetX.value}px ${
            textStyle.shadow.offsetY.value
          }px ${textStyle.shadow.blur.value}px rgba(${hexToRgb(
            textStyle.shadow.color.value
          )}, ${textStyle.shadow.opacity.value})`
        : "none",
    border: textStyle.stroke.width.value
      ? `${textStyle.stroke.width.value}px solid ${textStyle.stroke.color.value}`
      : "none",
  };

  const appearanceStyles = {
    transform: `scale(${appearanceStyle.scale.value}) rotate(${appearanceStyle.rotation.value}deg)`,
    opacity: `${appearanceStyle.opacity.value}%`,
    "border-radius": `${appearanceStyle.roundness.value}px`,
  };

  return {
    ...textStyles,
    ...appearanceStyles,
  };
};
