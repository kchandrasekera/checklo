class List < ActiveRecord::Base
  attr_accessible :list_name, :board_id
  
  validates :list_name, :board_id, :presence => true
  
  belongs_to :board
  has_many :cards
end
