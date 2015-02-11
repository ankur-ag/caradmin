class ReservationsController < ApplicationController
  before_action :set_reservation, only: [:show, :update, :destroy]

  # GET /reservations
  # GET /reservations.json
  def index
    @reservations = Reservation.all

    render json: @reservations
  end

  def history
    @history = PastReservation.includes([:vehicle, :member]).all
    render json: @history, each_serializer: PastReservationSerializer
  end

  # GET /reservations/1
  # GET /reservations/1.json
  def show
    render json: @reservation
  end

  # POST /reservations
  # POST /reservations.json
  def create
    @reservation = Reservation.new(reservation_params)

    if @reservation.save
      render json: @reservation, status: :created, location: @reservation
    else
      render json: @reservation.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /reservations/1
  # PATCH/PUT /reservations/1.json
  def update
    @reservation = Reservation.find(params[:id])
    if @reservation.update(reservation_params)
      head :no_content
    else
      render json: @reservation.errors, status: :unprocessable_entity
    end
  end

  # DELETE /reservations/1
  # DELETE /reservations/1.json
  def destroy
    @reservation.destroy

    head :no_content
  end

  private

    def set_reservation
      @reservation = Reservation.find(params[:id])
    end

    def reservation_params
      params.require(:reservation).permit(:member_id, :vehicle_id, :start_date, :end_date, :occupied_at, :scheduled_to_return_at, :returned_at)
    end
end
