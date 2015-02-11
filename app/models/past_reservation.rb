class PastReservation < ActiveRecord::Base
	self.table_name = "reservations"
	belongs_to :member
	belongs_to :vehicle

	default_scope { where("returned_at is not null") }

	
end
