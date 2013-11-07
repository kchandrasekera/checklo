class UsersController < ApplicationController
  def show
    @user = current_user
    @user.includes(:boards => [])
    
    render :show
  end
end