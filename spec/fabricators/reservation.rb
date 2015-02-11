def random_date from = Date.new(2014), to = Time.now.to_date
  Random.rand(from..to)
end

Fabricator(:reservation) do
  member
  vehicle
  start_date { random_date }
  occupied_at { |attrs| attrs[:start_date] + Random.rand(7).days}
  scheduled_to_return_at { |attrs| attrs[:occupied_at] + Random.rand(30..300).days}
  returned_at { |attrs| attrs[:scheduled_to_return_at] + Random.rand(3).days}
end