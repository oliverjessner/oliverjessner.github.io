module Jekyll
  class ThemeClusterPageGenerator < Generator
    safe true

    def generate(site)
      clusters = site.data.dig('categories_cluster', 'clusters') || {}
      generated_dirs = {}
      layout_path = File.join(site.source, '_layouts', 'theme-cluster.html')
      return unless File.exist?(layout_path)

      clusters.each do |cluster_key, cluster|
        next unless cluster.is_a?(Hash)

        slug = ThemeClusterPage.cluster_slug(cluster_key, cluster)
        next if slug.empty?

        cluster_dir = File.join('themen', slug)
        next if generated_dirs[cluster_dir]

        generated_dirs[cluster_dir] = true
        site.pages << ThemeClusterPage.new(site, site.source, cluster_dir, cluster_key, slug, cluster)
      end
    end
  end

  class ThemeClusterPage < Page
    def self.cluster_slug(cluster_key, cluster)
      raw_slug = cluster['slug'] || cluster_key
      raw_slug.to_s.strip.gsub(%r{\A/+|/+\z}, '')
    end

    def initialize(site, base, dir, cluster_key, cluster_slug, cluster)
      @site = site
      @base = base
      @dir  = dir
      @name = 'index.html'

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'theme-cluster.html')

      self.data['theme_cluster_key'] = cluster_key
      self.data['theme_cluster_slug'] = cluster_slug
      self.data['theme_cluster'] = cluster
      self.data['title'] = cluster['stylised_name'] || cluster_key
      self.data['description'] = cluster['description']
      self.data['meta_title'] = cluster['meta_title'] || self.data['title']
      self.data['meta_description'] = cluster['meta_description'] || self.data['description']
    end
  end
end
