class Vehicle < ActiveRecord::Base
	has_one :reservation
end
