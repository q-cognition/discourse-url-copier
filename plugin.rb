# name: discourse-url-copier
# about: Adds a button to copy modified URLs from topics in specified categories
# version: 1.0.0
# authors: Project Zenki
# url: https://github.com/q-cognition/discourse-url-copier

enabled_site_setting :discourse_url_copier_enabled

register_asset "stylesheets/discourse-url-copier.scss"

after_initialize do
  # Add the plugin's JavaScript assets
  register_asset "javascripts/discourse/components/url-copier-button.js"
  register_asset "javascripts/discourse/connectors/topic-above-post-stream/url-copier-button.js"
end

# Register site settings

# Site settings configuration
