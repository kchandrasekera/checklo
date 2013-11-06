class Card < ActiveRecord::Base
  attr_accessible :card_name, :comment, :completed, :due_date
  
  validates :card_name, :presence => true
  
  belongs_to :list
end
