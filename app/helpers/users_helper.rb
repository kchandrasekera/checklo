module UsersHelper
  def require_current_user!
    redirect_to new_user_session_url unless user_signed_in?
  end
  
  def fetch_current_user!
    if user_signed_in?
      @user = User.includes(:boards => {:lists => :cards}).find(current_user)
    else
      @user = nil
    end
  end
end