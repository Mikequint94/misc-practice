Rails.application.routes.draw do
  
  root to: 'messages#app'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :messages, only: [:index, :create]

end
