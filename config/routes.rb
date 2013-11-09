TrelloClone::Application.routes.draw do
  root :to => "static_pages#root"
  
  devise_for :users
  resources :users, :only => :show
  
  resources :boards, :only => :create
  resources :lists, :only => :create
  resources :cards, :only => :create
end
