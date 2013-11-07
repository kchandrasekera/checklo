module StaticPagesHelper
  def after_sign_in_path_for(user)
    user_url(user)
  end
  
  def after_sign_out_path_for(user)
    new_user_session_url
  end
end
