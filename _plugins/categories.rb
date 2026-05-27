module Jekyll
  class CategoryPageGenerator < Generator
    safe true

    def generate(site)
      if site.layouts.key? 'category'
        dir = site.config['category_dir'] || 'x'
        category_names = site.categories.keys
        data_categories = site.data.dig('categories', 'categories') || {}
        category_names.concat(data_categories.keys)

        generated_dirs = {}
        category_names.each do |category|
          next if category.nil?
          category_name = category.to_s
          category_slug = category_name.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
          category_dir = File.join(dir, category_slug)
          next if generated_dirs[category_dir]
          generated_dirs[category_dir] = true
          site.pages << CategoryPage.new(site, site.source, category_dir, category_name)
        end
      end
    end
  end

  # A Page subclass used in the `CategoryPageGenerator`
  class CategoryPage < Page
    def initialize(site, base, dir, category)
      @site = site
      @base = base
      @dir  = dir
      @name = 'index.html'

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'category.html')
      self.data['category'] = category

      category_title_prefix = site.config['category_title_prefix'] || ''
      self.data['title'] = "#{category_title_prefix}#{category}"
    end
  end
end
