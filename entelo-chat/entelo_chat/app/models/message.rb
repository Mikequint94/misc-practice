class Message < ApplicationRecord
  validates :body, :user, presence: true
end
