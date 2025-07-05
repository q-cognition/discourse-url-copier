import { getOwner } from "@ember/application";

export default {
  shouldRender(attrs, component) {
    // Check if the plugin is enabled
    const siteSettings = getOwner(component).lookup("site-settings:main");
    if (!siteSettings.discourse_url_copier_enabled) {
      return false;
    }

    // Check if we have a topic
    if (!attrs.model || !attrs.model.category) {
      return false;
    }

    // Get the configured categories
    const configuredCategories = siteSettings.discourse_url_copier_categories;
    if (!configuredCategories || configuredCategories.length === 0) {
      return false;
    }

    // Check if current topic's category is in the configured categories
    const currentCategoryId = attrs.model.category.id;
    const categoryIds = configuredCategories.split('|').map(name => name.trim());
    
    return categoryIds.includes(currentCategoryId);
  },

  setupComponent(attrs, component) {
    const siteSettings = getOwner(component).lookup("site-settings:main");
    
    component.set('shouldShowButton', true);
    component.set('siteSettings', siteSettings);
  }
};
