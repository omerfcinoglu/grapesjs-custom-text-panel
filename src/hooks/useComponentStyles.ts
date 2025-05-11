import { useState, useCallback } from "react";
import { ComponentStyles, StyleTransformer } from "../types/StyleProperties";
import { styleRegistry } from "../registry/StyleRegistry";

export const useComponentStyles = (
  initialStyles: ComponentStyles,
  transformer: StyleTransformer,
  onStylesChange?: (styles: Record<string, any>) => void
) => {
  const [styles, setStyles] = useState<ComponentStyles>(initialStyles);

  const updateCategoryStyle = useCallback(
    (categoryId: string, key: string, value: any) => {
      setStyles((prevStyles) => {
        const newStyles = {
          ...prevStyles,
          categories: {
            ...prevStyles.categories,
            [categoryId]: {
              ...prevStyles.categories[categoryId],
              [key]: value,
            },
          },
        };

        // Transform styles to GrapesJS format and notify
        if (onStylesChange) {
          const grapesStyles = transformer.toGrapesJS(newStyles);
          onStylesChange(grapesStyles);
        }

        return newStyles;
      });
    },
    [onStylesChange, transformer]
  );

  const getStylesForCategory = useCallback(
    (categoryId: string) => {
      return styles.categories[categoryId] || {};
    },
    [styles]
  );

  const getAllStyles = useCallback(() => {
    return transformer.toGrapesJS(styles);
  }, [styles, transformer]);

  const setStylesFromGrapesJS = useCallback(
    (grapesStyles: Record<string, any>) => {
      const newStyles = transformer.fromGrapesJS(grapesStyles);
      setStyles(newStyles);
    },
    [transformer]
  );

  return {
    styles,
    updateCategoryStyle,
    getStylesForCategory,
    getAllStyles,
    setStylesFromGrapesJS,
  };
};
