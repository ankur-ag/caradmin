class Vehicle < ActiveRecord::Base
	has_one :reservation
	has_many :past_reservations
end
