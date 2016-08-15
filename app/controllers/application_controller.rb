class ApplicationController < ActionController::Base
  before_action :store_current_location, :unless => :devise_controller?
  before_action :set_locale

  def default_url_options(options = {})
    options[:locale] = params[:locale]
    options
  end

  private

  def set_locale
    if params[:locale]
      I18n.locale = params[:locale]
    elsif reader_signed_in? && !current_reader.locale.blank?
      I18n.locale = current_reader.locale
    else
      logger.debug "User preferred languages: #{http_accept_language.user_preferred_languages}"
      I18n.locale = http_accept_language.compatible_language_from I18n.available_locales
      logger.debug "Locale set to #{I18n.locale}"
    end
  end

  def authenticate_reader_from_token!
    reader_email = params[:reader_email].presence
    reader = reader_email && Reader.find_by_email(reader_email)
    if reader && Devise.secure_compare(reader.authentication_token, params[:reader_token])
      sign_in reader, store: false
    end
  end

  def current_user
    current_reader || AnonymousUser.new
  end

  def store_current_location
    store_location_for(:user, request.url)
  end

  def after_sign_in_path_for(resource_or_scope)
    path = request.env['omniauth.origin']
    path ||= stored_location_for(resource_or_scope)
    path ||= signed_in_root_path(resource_or_scope)
  end

end
