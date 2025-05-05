// src/hooks/useComponentSelection.ts
import { useState, useEffect, useCallback } from "react";
import { TextStyle } from "../types/TextProperties";
import { defaultTextStyle } from "../constants/defaultStyles";
import {
  grapesToTextStyle,
  textStyleToGrapes,
} from "../utils/styleTransformers";

export const useComponentSelection = (editor: any) => {
  const [selectedComponent, setSelectedComponent] = useState<any>(null);
  const [componentStyles, setComponentStyles] = useState<
    Map<string, TextStyle>
  >(new Map());

  const handleSelect = useCallback((options: any) => {
    const component = options.component || options;
    console.log("Selected component:", component);

    if (!component || !component.is("text")) {
      setSelectedComponent(null);
      return;
    }

    setSelectedComponent(component);
    const componentId = component.getId();

    const currentStyles = component.getStyle();
    const textStyles = grapesToTextStyle(currentStyles);

    setComponentStyles((prev) => new Map(prev).set(componentId, textStyles));
  }, []);

  const handleDeselect = useCallback(() => {
    console.log("Component deselected");
    setSelectedComponent(null);
  }, []);

  useEffect(() => {
    if (!editor) return;

    console.log("Setting up selection listeners");

    // Component selection events
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
    (newStyles: TextStyle) => {
      if (!selectedComponent) return;

      const componentId = selectedComponent.getId();
      console.log("Updating styles for component:", componentId);

      setComponentStyles((prev) => new Map(prev).set(componentId, newStyles));

      const grapesStyles = textStyleToGrapes(newStyles);
      selectedComponent.setStyle(grapesStyles);
    },
    [selectedComponent]
  );

  const getSelectedComponentStyles = useCallback((): TextStyle => {
    if (!selectedComponent) return defaultTextStyle;

    const componentId = selectedComponent.getId();
    const styles = componentStyles.get(componentId);

    if (!styles) {
      const currentStyles = selectedComponent.getStyle();
      const textStyles = grapesToTextStyle(currentStyles);
      setComponentStyles((prev) => new Map(prev).set(componentId, textStyles));
      return textStyles;
    }

    return styles;
  }, [selectedComponent, componentStyles]);

  useEffect(() => {
    if (selectedComponent) {
      console.log("Selected Component ID:", selectedComponent.getId());
      console.log("Current Styles:", getSelectedComponentStyles());
    }
  }, [selectedComponent, getSelectedComponentStyles]);

  return {
    selectedComponent,
    updateComponentStyles,
    getSelectedComponentStyles,
  };
};
