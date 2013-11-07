module UsersHelper
  def fetch_current_user!
    if user_signed_in?
      @user = User.includes(:boards => {:lists => :cards}).find(current_user)
    else
      @user = nil
    end
  end
end
