class PastReservationSerializer < ActiveModel::Serializer
  attributes :id, :start_date, :end_date, :occupied_at, :scheduled_to_return_at, :returned_at

  has_one :member
  has_one :vehicle, serializer: VehicleOnlySerializer

end
