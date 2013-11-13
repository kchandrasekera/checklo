class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.string :card_name, :null => false
      t.date :due_date
      t.boolean :completed, :default => false
      t.text :comment

      t.timestamps
    end
  end
end
