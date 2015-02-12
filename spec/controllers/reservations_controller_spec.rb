require 'rails_helper'

RSpec.describe ReservationsController, type: :controller do

  let!(:reservation) { Fabricate.build(:reservation)}
  let!(:reservations) { 3.times {Fabricate.build(:reservation)}}

  describe 'index' do
    context 'with a json request' do
      it 'should return a json list of reservations' do
      	allow(Reservation).to receive(:all).and_return(reservations)
        get :index, :format => :json
        expect(response.headers["Content-Type"].match /json/).not_to be_nil
      end
    end
  end

  describe 'show' do
    context 'with a json request' do
    	before(:each) do
      	controller.params[:id] = reservation.id
    	end

      it 'should return a json reservation' do
        get :index, :format => :json
        expect(response.headers["Content-Type"].match /json/).not_to be_nil
      end
    end
  end

end
