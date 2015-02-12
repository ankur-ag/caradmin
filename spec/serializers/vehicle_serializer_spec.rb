require 'rails_helper'


describe 'VehicleSerializer' do

    before(:each) do
        @vehicle = Fabricate.build(:vehicle)
    end

    subject do
        @vehicle.active_model_serializer.new(@vehicle)
    end

    it 'should have all the attributes' do
        expect(:name).to_not be_nil
        expect(:model).to_not be_nil
    end
end