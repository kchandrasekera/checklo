class UsersController < ApplicationController
  before_filter :require_current_user!
  before_filter :fetch_current_user!
  
  def show
    # if you were rendering json... though this is not preferred when so nested
    # render :json => @user.to_json(:include => {:boards => {:include => {:lists => {:include => :cards}}}})
    
    # not necessary when using RABL, but will prevent N+1 query
    # User.includes(:boards => {:lists => :cards}).find(current_user)
    
    # redirect_to "#/users/" + @user.id.to_s
    redirect_to :root
  end
end