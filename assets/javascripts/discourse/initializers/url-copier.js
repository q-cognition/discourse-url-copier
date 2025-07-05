import { withPluginApi } from "discourse/lib/plugin-api";

export default function initializeUrlCopier() {
  withPluginApi("0.8.7", (api) => {
    api.decorateWidget("topic-title:after", (helper) => {
      const settings = helper.widget.siteSettings;
      if (
        !settings.url_copier_replace_hostname ||
        !settings.url_copier_append_string ||
        !settings.url_copier_categories
      ) {
        return;
      }

      // CATEGORY FILTERING
      let allowedCategories = settings.url_copier_categories
        .split(",")
        .map((c) => c.trim().toLowerCase());
      let topicCategorySlug = (helper.attrs.categorySlug || "").toLowerCase();
      if (!allowedCategories.includes(topicCategorySlug)) {
        return;
      }

      return helper.h(
        "button",
        {
          attributes: {
            style:
              "margin-left:10px; padding:3px 10px; border-radius:6px; border:1px solid #ccc; background:#f5f5f5; cursor:pointer;",
            onclick: () => {
              const url =
                location.protocol +
                "//" +
                settings.url_copier_replace_hostname +
                location.pathname +
                location.search +
                settings.url_copier_append_string;
              navigator.clipboard.writeText(url);
              api.showBanner("Copied to clipboard", { type: "success", duration: 1500 });
            },
            title:
              "Copy this topic’s URL with modified domain and appended string"
          }
        },
        "Copy Modified URL"
      );
    });
  });
  // For debug only
  console.log("URL Copier loaded (clean version, Discourse 3.5+ style)");
}
