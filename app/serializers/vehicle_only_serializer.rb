class VehicleOnlySerializer < ActiveModel::Serializer
  attributes :id, :name, :model, :description

  def name
  	object.name.titleize
  end
end
