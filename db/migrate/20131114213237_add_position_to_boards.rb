class AddPositionToBoards < ActiveRecord::Migration
  def change
    add_column :boards, :position, :integer, :null => false
    
    add_index :boards, :position
  end
end