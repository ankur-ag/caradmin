class Vehicle < ActiveRecord::Base
	has_many :reservations

	def self.with_reservation_detail
		ActiveRecord::Base.connection.select_all(
			"
			SELECT v.id, v.name, m.id as member_id, m.first_name as member_first_name, m.last_name as member_last_name,
			m.email, r.id as reservation_id, r.start_date, r.occupied_at, r.scheduled_to_return_at, r.returned_at
			from vehicles v
			LEFT JOIN reservations r ON v.id = r.vehicle_id AND r.returned_at is null
			LEFT JOIN members m ON r.member_id = m.id
			"
		)
	end

	def self.find_with_reservation_detail id
		ActiveRecord::Base.connection.select_one(
			"
			SELECT v.id, v.name, m.id as member_id, m.first_name as member_first_name, m.last_name as member_last_name,
			m.email, r.id as reservation_id, r.start_date, r.occupied_at, r.scheduled_to_return_at, r.returned_at
			from vehicles v
			LEFT JOIN reservations r ON v.id = r.vehicle_id AND r.returned_at is null
			LEFT JOIN members m ON r.member_id = m.id
			WHERE v.id = #{id}
			"
		)
	end
end
