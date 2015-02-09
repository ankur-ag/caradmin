class CreateVehicles < ActiveRecord::Migration
  def change
    create_table :vehicles do |t|
      t.string :name
      t.text :description
      t.string :model
      t.integer :state_id

      t.timestamps null: false
    end
  end
end
