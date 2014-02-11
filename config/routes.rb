TrelloClone::Application.routes.draw do
  root :to => "static_pages#root"
  get "/about", to: "static_pages#about", as: "about_page"

  devise_for :users
  resources :users, :only => :show

  resources :boards, :only => [:create, :update, :destroy]
  resources :lists, :only => [:create, :update, :destroy]
  resources :cards, :only => [:create, :update, :destroy]
end
