# frozen_string_literal: true

# Catalog is Gala’s root path
class CatalogController < ApplicationController
  include SelectionParams

  before_action :set_selection_params

  # @route [GET] `/`
  def home
    @cases = policy_scope(Case)
             .ordered

    render layout: 'with_header'
  end
end
