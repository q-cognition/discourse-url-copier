import { withPluginApi } from "discourse/lib/plugin-api";
import { h } from "virtual-dom";

export default {
  name: "discourse-url-copier",
  initialize() {
    withPluginApi("0.8.7", (api) => {
      const allowedCategories = settings.url_copier_categories.split("|").map(c => c.trim());

      api.decorateWidget("topic-title:after", (helper) => {
        const category = helper.getModel().category?.slug;

        if (!category || !allowedCategories.includes(category)) return;

        return h("button.copy-url-button.btn.btn-default", {
          onclick: () => {
            const topicUrl = window.location.href;
            const newUrl = topicUrl
              .replace(window.location.hostname, settings.url_copier_domain)
              .replace(/(#.*)?$/, settings.url_copier_append);

            navigator.clipboard.writeText(newUrl).then(() => {
              api.addGlobalNotice("Copied to clipboard", "success", 3000);
            });
          },
          title: "Copy generated URL",
          style: "margin-left: 1em;"
        }, "Copy Link");
      });
    });
  },
};
