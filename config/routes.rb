Rails.application.routes.draw do
  resources :users
  resources :searches, only: [:index]
end
