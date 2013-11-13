class AddPositionToCards < ActiveRecord::Migration
  def change
    add_column :cards, :position, :integer, :null => false
    
    add_index :cards, :position
  end
end
