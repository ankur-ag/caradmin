class Member < ActiveRecord::Base
	has_many :reservations
	has_many :past_reservations
end
