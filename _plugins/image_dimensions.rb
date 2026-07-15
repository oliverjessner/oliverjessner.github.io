# frozen_string_literal: true

module Jekyll
  module ImageDimensionsFilter
    def image_dimensions(input)
      return nil if input.nil? || input.to_s.match?(%r{\Ahttps?://}i)

      site = @context.registers[:site]
      source = File.expand_path(site.source)
      relative_path = input.to_s.sub(%r{\A/}, '')
      image_path = File.expand_path(relative_path, source)
      return nil unless image_path.start_with?("#{source}#{File::SEPARATOR}") && File.file?(image_path)

      dimensions = read_dimensions(image_path)
      dimensions && { 'width' => dimensions[0], 'height' => dimensions[1] }
    rescue StandardError
      nil
    end

    private

    def read_dimensions(path)
      data = File.binread(path)

      if data.start_with?("\x89PNG\r\n\x1A\n".b)
        [data.byteslice(16, 4).unpack1('N'), data.byteslice(20, 4).unpack1('N')]
      elsif data.start_with?('GIF87a', 'GIF89a')
        data.byteslice(6, 4).unpack('v2')
      elsif data.start_with?("\xFF\xD8".b)
        jpeg_dimensions(data)
      elsif data.start_with?('RIFF') && data.byteslice(8, 4) == 'WEBP'
        webp_dimensions(data)
      end
    end

    def jpeg_dimensions(data)
      offset = 2
      sof_markers = [0xC0, 0xC1, 0xC2, 0xC3, 0xC5, 0xC6, 0xC7, 0xC9, 0xCA, 0xCB, 0xCD, 0xCE, 0xCF]

      while offset + 8 < data.bytesize
        offset += 1 while offset < data.bytesize && data.getbyte(offset) != 0xFF
        offset += 1 while offset < data.bytesize && data.getbyte(offset) == 0xFF
        marker = data.getbyte(offset)
        offset += 1
        next if marker.nil? || marker == 0xD8 || marker == 0xD9

        length = data.byteslice(offset, 2)&.unpack1('n')
        return nil unless length && length >= 2
        return [data.byteslice(offset + 5, 2).unpack1('n'), data.byteslice(offset + 3, 2).unpack1('n')] if sof_markers.include?(marker)

        offset += length
      end
    end

    def webp_dimensions(data)
      offset = 12

      while offset + 8 <= data.bytesize
        chunk_type = data.byteslice(offset, 4)
        chunk_size = data.byteslice(offset + 4, 4).unpack1('V')
        chunk = data.byteslice(offset + 8, chunk_size)
        return nil unless chunk

        case chunk_type
        when 'VP8X'
          return [1 + uint24_le(chunk, 4), 1 + uint24_le(chunk, 7)] if chunk.bytesize >= 10
        when 'VP8 '
          if chunk.bytesize >= 10 && chunk.byteslice(3, 3) == "\x9D\x01\x2A".b
            return [chunk.byteslice(6, 2).unpack1('v') & 0x3FFF, chunk.byteslice(8, 2).unpack1('v') & 0x3FFF]
          end
        when 'VP8L'
          if chunk.bytesize >= 5 && chunk.getbyte(0) == 0x2F
            b1, b2, b3, b4 = chunk.byteslice(1, 4).bytes
            return [1 + b1 + ((b2 & 0x3F) << 8), 1 + (b2 >> 6) + (b3 << 2) + ((b4 & 0x0F) << 10)]
          end
        end

        offset += 8 + chunk_size + (chunk_size.odd? ? 1 : 0)
      end
    end

    def uint24_le(data, offset)
      data.getbyte(offset) | (data.getbyte(offset + 1) << 8) | (data.getbyte(offset + 2) << 16)
    end
  end
end

Liquid::Template.register_filter(Jekyll::ImageDimensionsFilter)
