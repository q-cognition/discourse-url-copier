import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { computed } from "@ember/object";
import { apiInitializer } from "discourse/lib/api";
import { withPluginApi } from "discourse/lib/plugin-api";

export default Controller.extend({
  siteSettings: service(),

  showUrlCopier: computed("model.topic.url_copier_category", function () {
    if (!this.siteSettings.url_copier_enabled) return false;
    const allowed = this.siteSettings.url_copier_categories
      .split(",")
      .map((c) => c.trim().toLowerCase());
    return (
      this.model.topic.url_copier_category &&
      allowed.includes(this.model.topic.url_copier_category.toLowerCase())
    );
  }),

  actions: {
    copyUrl() {
      const location = window.location;
      const path = location.pathname + location.search;
      const hostname = this.siteSettings.url_copier_replace_hostname;
      const append = this.siteSettings.url_copier_append_string;
      const newUrl = `${location.protocol}//${hostname}${path}${append}`;
      navigator.clipboard.writeText(newUrl);
      bootbox.alert("Copied to clipboard");
    },
  },
});

apiInitializer("0.11.1", (api) => {
  api.decorateWidget("topic-title:after", (helper) => {
    const controller = helper.widget.parentWidget.parentView.controller;
    if (controller && controller.showUrlCopier) {
      return helper.attach("url-copier");
    }
  });
});