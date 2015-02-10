class ReservationSerializer < ActiveModel::Serializer
  attributes :id, :start_date, :end_date, :occupied_at, :scheduled_to_return_at, :returned_at
  has_one :member

  def end_date
  	object.end_date
  end

  def start_date
  	object.start_date
  end

  def occupied_at
  	object.occupied_at
  end

  def scheduled_to_return_at
  	object.scheduled_to_return_at
  end

  def returned_at
  	object.returned_at
  end
end
