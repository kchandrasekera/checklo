class UsersController < ApplicationController
  def show
    @user = current_user

    # if you were rendering json... though this is not preferred when so nested
    # render :json => @user.to_json(:include => {:boards => {:include => {:lists => {:include => :cards}}}})
    
    # not necessary when using RABL
    # User.includes(:boards => {:lists => :cards}).find(@user)
    
    render :show
    
  end
end