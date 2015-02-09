class Member < ActiveRecord::Base
	has_many :reservations
end
