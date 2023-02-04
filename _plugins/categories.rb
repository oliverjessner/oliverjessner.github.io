module Jekyll
  class CategoryPageGenerator < Generator
    safe true

    def generate(site)
      if site.layouts.key? 'category'
        dir = site.config['category_dir'] || 'x'
        site.categories.each_key do |category|
          category_slug = category.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
          site.pages << CategoryPage.new(site, site.source, File.join(dir, category_slug), category)
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