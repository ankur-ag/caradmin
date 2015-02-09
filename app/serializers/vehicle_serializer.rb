class VehicleSerializer < ActiveModel::Serializer
  attributes :id, :name, :model, :description

  has_one :reservation

  def name
  	object.name.titleize
  end
end
