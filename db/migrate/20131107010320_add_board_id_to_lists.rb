class AddBoardIdToLists < ActiveRecord::Migration
  def change
    add_column :lists, :board_id, :integer, :null => false
    
    add_index :lists, :board_id
  end
end
