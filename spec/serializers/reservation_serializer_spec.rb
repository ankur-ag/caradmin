require 'rails_helper'


describe 'ReservationSerializer' do

    before(:each) do
        @reservation = Fabricate.build(:reservation)
    end

    subject do
        @reservation.active_model_serializer.new(@reservation)
    end

    it 'should have all the attributes' do
        expect(:start_date).to_not be_nil
        expect(:end_date).to_not be_nil
        expect(:occupied_at).to_not be_nil
        expect(:scheduled_to_return_at).to_not be_nil
        expect(:returned_at).to_not be_nil
    end
end