class CreateLists < ActiveRecord::Migration
  def change
    create_table :lists do |t|
      t.string :list_name, :null => false

      t.timestamps
    end
  end
end
