class VehiclesController < ApplicationController
  before_action :set_vehicle, only: [:show, :update, :destroy]

  # GET /vehicles
  # GET /vehicles.json
  def index
    @vehicles = Vehicle.all

    render json: @vehicles
  end

  # GET /vehicles/1
  # GET /vehicles/1.json
  def show
    render json: @vehicle
  end

  # POST /vehicles
  # POST /vehicles.json
  def create
    @vehicle = Vehicle.new(vehicle_params)

    if @vehicle.save
      render json: @vehicle, status: :created, location: @vehicle
    else
      render json: @vehicle.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /vehicles/1
  # PATCH/PUT /vehicles/1.json
  def update
    @vehicle = Vehicle.find(params[:id])

    if @vehicle.update(vehicle_params)
      head :no_content
    else
      render json: @vehicle.errors, status: :unprocessable_entity
    end
  end

  # DELETE /vehicles/1
  # DELETE /vehicles/1.json
  def destroy
    @vehicle.destroy

    head :no_content
  end

  private

    def set_vehicle
      @vehicle = Vehicle.find(params[:id])
    end

    def vehicle_params
      params[:vehicle]
    end
end
