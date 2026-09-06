# Use the configured spelling before Jekyll indexes categories or generates pages.
# Otherwise names such as "startups" and "Startups" compete for the same URL.
Jekyll::Hooks.register :site, :post_read do |site|
  categories = site.data.dig('categories', 'categories') || {}
  canonical_names = categories.keys.to_h { |name| [name.downcase, name] }

  normalize_categories = lambda do |data|
    next unless data['categories'].is_a?(Array)

    data['categories'] = data['categories'].map do |name|
      canonical_names.fetch(name.to_s.downcase, name)
    end.uniq
  end

  site.posts.docs.each { |post| normalize_categories.call(post.data) }

  # External articles and videos use the same category filters as blog posts.
  %w[links videos].each do |collection|
    (site.data[collection] || {}).each_value do |records|
      next unless records.is_a?(Array)

      records.each do |record|
        normalize_categories.call(record) if record.is_a?(Hash)
      end
    end
  end
end
