class User < ApplicationRecord
  validates :name, presence: true

  scope :search, ->q{where "name LIKE ?", "%#{q}%"}
end
