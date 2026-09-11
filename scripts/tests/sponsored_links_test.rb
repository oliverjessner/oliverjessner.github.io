require 'jekyll'
require 'nokogiri'
source = File.expand_path('../..', __dir__)
site = Jekyll::Site.new(Jekyll.configuration('source' => source, 'quiet' => true))
site.read
fixture = Jekyll::PageWithoutAFile.new(site, source, 'sponsored-link-fixture', 'index.html')
fixture.content = <<~LIQUID
  {% include framework/blocks/components/button.html text="Paid button" url="https://example.org/paid" external=true sponsored=true %}
  {% include framework/blocks/components/button.html text="Ordinary button" url="https://example.org/ordinary" external=true %}
  {% include theme/cards/card-editorial.html title="Paid card" url="https://example.org/card" external=true sponsored=true link_rel="nofollow noopener" %}
  {% include theme/cards/card-editorial.html title="Ordinary card" url="https://example.org/ordinary-card" external=true link_rel="noopener" %}
  {% include framework/blocks/components/link-list.html links=page.test_links %}
LIQUID
fixture.data['test_links'] = [
  { 'title' => 'Paid list link', 'url' => 'https://example.org/list', 'sponsored' => true },
  { 'title' => 'Ordinary list link', 'url' => 'https://example.org/ordinary-list' }
]
fixture.render(site.layouts, site.site_payload)
doc = Nokogiri::HTML(fixture.output)
%w[paid card list].each do |path|
  raise "Missing sponsored rel: #{path}" unless doc.at_css("a[href='https://example.org/#{path}']")['rel'].split.include?('sponsored')
end
%w[ordinary ordinary-card ordinary-list].each do |path|
  raise "Ordinary link changed: #{path}" if doc.at_css("a[href='https://example.org/#{path}']")['rel'].to_s.split.include?('sponsored')
end
card_rel = doc.at_css("a[href='https://example.org/card']")['rel'].split
raise "Existing rel tokens lost: #{card_rel.inspect}" unless (%w[nofollow noopener sponsored] - card_rel).empty?
puts 'OK: Paid links are sponsored; ordinary links and existing rel tokens preserved.'
