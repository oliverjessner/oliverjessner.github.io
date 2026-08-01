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
      placeholder = "___JEKYLL_MINIFY_HTML_BLOCK_#{index}___"

      # Use the block form so backslashes in scripts and code samples are
      # restored literally instead of being interpreted as gsub backreferences.
      html = html.gsub(placeholder) { block }
    end

    File.write(file_path, html)
  end
end
