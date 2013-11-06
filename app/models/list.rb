class List < ActiveRecord::Base
  attr_accessible :list_name
  
  validates :list_name, :presence => true
  
  belongs_to :board
  has_many :cards
end
