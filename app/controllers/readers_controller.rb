# frozen_string_literal: true

class ReadersController < ApplicationController
  before_action :authenticate_reader!
  before_action :set_reader, only: %i[show edit update destroy]
  layout 'window'

  authorize_actions_for Case, only: %i[index destroy]

  # GET /readers
  # GET /readers.json
  def index
    @readers = FindReaders.by(**search_params)
                          .page(params[:page])
                          .preload(:roles)

    @roles = Role.where(name: %w[editor invisible])

    render layout: 'admin'
  end

  def show; end

  # GET /readers/1/edit
  def edit
    authorize_action_for @reader
  end

  # PATCH/PUT /readers/1
  # PATCH/PUT /readers/1.json
  def update
    authorize_action_for @reader
    respond_to do |format|
      if @reader.update(reader_params)
        bypass_sign_in @reader if reader_params.key? :password
        format.html do
          redirect_to edit_profile_path,
                      notice: 'Reader was successfully updated.'
        end
        format.json { render :show, status: :ok, location: @reader }
      else
        format.html { render :edit }
        format.json do
          render json: @reader.errors, status: :unprocessable_entity
        end
      end
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_reader
    @reader = if params[:id].blank?
                current_reader
              else
                Reader.find(params[:id])
              end
  end

  def search_params
    params.permit(:name, :role).to_h.symbolize_keys
  end

  def reader_params
    unless defined? @reader_can_set_password
      @reader_can_set_password = @reader && !@reader.created_password
    end

    permitted = %i[name initials email locale send_reply_notifications
                   active_community_id]
    permitted << :password if @reader_can_set_password

    params.require(:reader).permit(*permitted)
  end
end
