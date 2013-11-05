TrelloClone::Application.routes.draw do
  root :to => "static_pages#root"
  
  devise_for :users
end
