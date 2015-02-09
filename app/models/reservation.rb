class Reservation < ActiveRecord::Base
	belongs_to :member
	belongs_to :vehicle

	default_scope { where("returned_at is null") }
end
