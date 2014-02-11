class StaticPagesController < ApplicationController
  # before_filter :require_current_user!
  before_filter :fetch_current_user!

  def root
    render :root
  end

  def about
    render :about
  end
end
