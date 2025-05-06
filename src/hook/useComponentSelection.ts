// src/hooks/useComponentSelection.ts
import { useState, useEffect, useCallback } from "react";
import {
  ComponentStyles,
  createDefaultComponentStyles,
} from "../types/ComponentStyles";
import {
  grapesToComponentStyles,
  componentStylesToGrapes,
} from "../utils/styleTransformers";

export const useComponentSelection = (editor: any) => {
  const [selectedComponent, setSelectedComponent] = useState<any>(null);
  const [componentStyles, setComponentStyles] = useState<
    Map<string, ComponentStyles>
  >(new Map());

  const handleSelect = useCallback((options: any) => {
    const component = options.component || options;
    console.log("Selected component:", component);

    if (!component) {
      setSelectedComponent(null);
      return;
    }

    setSelectedComponent(component);
    const componentId = component.getId();

    const currentStyles = component.getStyle();
    const styles = grapesToComponentStyles(currentStyles);

    setComponentStyles((prev) => new Map(prev).set(componentId, styles));
  }, []);

  const handleDeselect = useCallback(() => {
    console.log("Component deselected");
    setSelectedComponent(null);
  }, []);

  useEffect(() => {
    if (!editor) return;

    console.log("Setting up selection listeners");

    editor.on("component:selected", handleSelect);
    editor.on("component:deselect", handleDeselect);
    editor.on("component:update", (component: any) => {
      if (component === selectedComponent) {
        handleSelect(component);
      }
    });

    return () => {
      editor.off("component:selected", handleSelect);
      editor.off("component:deselect", handleDeselect);
      editor.off("component:update");
    };
  }, [editor, handleSelect, handleDeselect, selectedComponent]);

  const updateComponentStyles = useCallback(
    (newStyles: ComponentStyles) => {
      if (!selectedComponent) return;

      const componentId = selectedComponent.getId();
      console.log("Updating styles for component:", componentId);

      setComponentStyles((prev) => new Map(prev).set(componentId, newStyles));

      const grapesStyles = componentStylesToGrapes(newStyles);
      selectedComponent.setStyle(grapesStyles);
    },
    [selectedComponent]
  );

  const getSelectedComponentStyles = useCallback((): ComponentStyles => {
    if (!selectedComponent) return createDefaultComponentStyles();

    const componentId = selectedComponent.getId();
    const styles = componentStyles.get(componentId);

    if (!styles) {
      const currentStyles = selectedComponent.getStyle();
      const componentStyles = grapesToComponentStyles(currentStyles);
      setComponentStyles((prev) =>
        new Map(prev).set(componentId, componentStyles)
      );
      return componentStyles;
    }

    return styles;
  }, [selectedComponent, componentStyles]);

  return {
    selectedComponent,
    updateComponentStyles,
    getSelectedComponentStyles,
  };
};
