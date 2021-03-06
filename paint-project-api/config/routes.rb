Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :artists, only: [:index]
  resources :palettes, only: [:index]
  resources :masterpieces, only: [:index, :show, :create]
end
