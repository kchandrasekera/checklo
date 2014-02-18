class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :username, :email, :password, :password_confirmation, :remember_me

  validates :username, :uniqueness => true, :length => { :minimum => 6, :too_short => "minimum length is 6 characters" }

  has_many :boards, :order => :position
  has_many :lists, :through => :boards
  has_many :cards, :through => :lists
end
