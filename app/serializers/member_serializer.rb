class MemberSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :name

  def name
  	"#{first_name} #{last_name}"
  end
end

