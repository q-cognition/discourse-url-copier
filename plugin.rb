# frozen_string_literal: true

# name: discourse-url-copier
# about: Adds a button to copy modified URLs from topics in specified categories
# meta_topic_id: TODO
# version: 1.0.0
# authors: Project Zenki
# url: https://github.com/q-cognition/discourse-url-copier
# required_version: 2.7.0

enabled_site_setting :discourse_url_copier_enabled

module ::MyPluginModule
  PLUGIN_NAME = "discourse-url-copier"
end

require_relative "lib/my_plugin_module/engine"

after_initialize do
  # Code which should run after Rails has finished booting
end
