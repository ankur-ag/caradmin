class WelcomeController < ApplicationController
	http_basic_authenticate_with name: "caradmin", password: "breeze"

	def index	
	end
end
