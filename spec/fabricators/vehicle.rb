Fabricator(:vehicle) do
  name { Faker::Internet.user_name }
  model {"Toyota Prius"}
end