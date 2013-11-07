class AddListIdToCards < ActiveRecord::Migration
  def change
    add_column :cards, :list_id, :integer, :null => false
    
    add_index :cards, :list_id
  end
end
