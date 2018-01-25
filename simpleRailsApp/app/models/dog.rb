class Dog < ApplicationRecord
  validates :age, :name, presence: true
  
  # belongs_to :owner,
  # primary_key: :id,
  # foreign_key: :owner_id,
  # class_name: :Owner
end
