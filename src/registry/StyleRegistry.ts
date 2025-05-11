import {
  StyleCategory,
  StyleRegistry,
  StylePanelConfig,
} from "../types/StyleProperties";

class StyleRegistryManager {
  private registry: StyleRegistry = {
    categories: {},
  };

  private panels: Record<string, StylePanelConfig> = {};

  registerCategory(category: StyleCategory) {
    this.registry.categories[category.id] = category;
  }

  registerPanel(config: StylePanelConfig) {
    this.panels[config.category.id] = config;
  }

  getCategory(id: string): StyleCategory | undefined {
    return this.registry.categories[id];
  }

  getPanel(categoryId: string): StylePanelConfig | undefined {
    return this.panels[categoryId];
  }

  getAllCategories(): StyleCategory[] {
    return Object.values(this.registry.categories).sort(
      (a, b) => a.order - b.order
    );
  }

  getAllPanels(): StylePanelConfig[] {
    return Object.values(this.panels);
  }
}

export const styleRegistry = new StyleRegistryManager();
