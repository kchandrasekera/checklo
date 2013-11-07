class ApplicationController < ActionController::Base
  protect_from_forgery
  
  include UsersHelper
  include StaticPagesHelper
  
  before_filter :fetch_current_user!
end