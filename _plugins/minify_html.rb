Jekyll::Hooks.register :site, :post_write do |site|
  next unless site.config.fetch('minify_html', true)

  destination = site.dest
  pattern = File.join(destination, '**', '*.html')

  Dir.glob(pattern).each do |file_path|
    html = File.read(file_path)
    protected_blocks = []

    html = html.gsub(%r{<(script|style|pre|textarea)\b[^>]*>.*?</\1>}mi) do |block|
      protected_blocks << block
      "___JEKYLL_MINIFY_HTML_BLOCK_#{protected_blocks.length - 1}___"
    end

    html = html
      .gsub(/<!--(?!\[if|\s*<!|\s*\[endif).*?-->/m, '')
      .gsub(/>\s+</m, '><')
      .gsub(/[ \t]{2,}/, ' ')
      .strip

    protected_blocks.each_with_index do |block, index|
      html = html.gsub("___JEKYLL_MINIFY_HTML_BLOCK_#{index}___", block)
    end

    File.write(file_path, html)
  end
end
