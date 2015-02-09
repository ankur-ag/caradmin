class CreateReservations < ActiveRecord::Migration
  def change
    create_table :reservations do |t|
      t.integer :member_id
      t.integer :vehicle_id
      t.datetime :start_date
      t.datetime :end_date
      t.datetime :occupied_at
      t.datetime :scheduled_to_return_at
      t.datetime :returned_at

      t.timestamps null: false
    end
  end
end
