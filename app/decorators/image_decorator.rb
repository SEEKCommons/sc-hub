# frozen_string_literal: true

# Optimize, resize, and prepare urls for attached images
class ImageDecorator < ApplicationDecorator
  DARK_BLUE_PIXEL =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADU' \
    'lEQVR42mOUtY/7DwAC9gG7VNK2ygAAAABJRU5ErkJggg=='

  RED_PIXEL =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAFoEvQfAAAABG' \
    'dBTUEAALGPC/xhBQAAAA1JREFUCB1juOtg/x8ABbYCXHCMAk8AAAAASUVORK5CYII='

  def resized_path(**options)
    return DARK_BLUE_PIXEL unless attached?
    return RED_PIXEL unless variable?
    polymorphic_path resized(options), only_path: true
  end

  def resized_file(**options)
    return nil unless attached?
    # rubocop:disable Security/Open
    open(resized(options).processed.service_url).read
    # rubocop:enable Security/Open
  rescue ArgumentError
    nil
  end

  private

  def resized(width: nil, height: nil, **options)
    transforms = resize_options(width, height).merge options.merge optimizations
    variant transforms
  end

  def optimizations
    return jpeg_optimizations if jpeg?
    base_optimizations
  end

  def jpeg_optimizations
    base_optimizations
      .merge 'sampling-factor': '4:2:0',
             quality: '85',
             colorspace: 'sRGB',
             interlace: 'line' # Must be last to work
  end

  def base_optimizations
    { strip: true }
  end

  def resize_options(width, height)
    return {} if width.blank?
    height ||= width
    { resize: "#{width}x#{height}^" }
  end

  def jpeg?
    return false unless attached?
    content_type.include? 'jpeg'
  end
end
