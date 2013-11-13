class Card < ActiveRecord::Base
  attr_accessible :card_name, :comment, :completed, :due_date, :list_id
  
  validates :card_name, :list_id, :presence => true
  
  belongs_to :list
end
