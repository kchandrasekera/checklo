class Board < ActiveRecord::Base
  attr_accessible :board_name, :user_id
  
  validates :board_name, :user_id, :presence => true
  
  belongs_to :user
  has_many :lists, :dependent => :destroy
  has_many :cards, :through => :lists, :dependent => :destroy
end
