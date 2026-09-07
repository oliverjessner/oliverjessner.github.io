module Jekyll
  module RelatedYouTubeShort
    # Require a concrete editorial topic; broad categories alone are insufficient.
    def related_youtube_short(post, shorts)
      categories = Array(post['categories'])
      title_words = video_title_words(post['title'])
      title = " #{normalize_video_topic(post['title'])} "
      category_topics = categories.map { |category| normalize_video_topic(category) }

      Array(shorts).select do |short|
        Array(short['related_topics']).any? do |topic|
          normalized_topic = normalize_video_topic(topic)
          !normalized_topic.empty? &&
            (category_topics.include?(normalized_topic) || title.include?(" #{normalized_topic} "))
        end
      end.max_by do |short|
        [
          (title_words & video_title_words(short['title'])).size,
          (categories & Array(short['categories'])).size,
          short['date'].to_s
        ]
      end
    end

    private

    def video_title_words(title)
      normalize_video_topic(title).split.select { |word| word.length > 3 }.uniq
    end

    def normalize_video_topic(value)
      value.to_s.unicode_normalize(:nfkd).gsub(/\p{Mn}/, '').downcase
           .gsub(/[^[:alnum:]]+/, ' ').strip
    end
  end
end

Liquid::Template.register_filter(Jekyll::RelatedYouTubeShort)
