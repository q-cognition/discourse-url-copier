# name: discourse-url-copier
# about: Button on topics in certain categories to copy a modified URL
# version: 0.1
# authors: Project Zenki

enabled_site_setting :url_copier_enabled

after_initialize do
  add_to_serializer(:topic_view, :url_copier_category) do
    object.topic&.category&.slug
  end
end