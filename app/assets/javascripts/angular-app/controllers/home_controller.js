angular.module('angularApp.controllers').controller('HomeCtrl', HomeCtrl);
HomeCtrl.$inject = ['$scope', 'VehicleService', '$state'];

function HomeCtrl($scope, VehicleService, $state) {

  $scope.vehicles = {};
  $scope.filterBy = "All";
  $scope.orderByField = 'name';

  VehicleService.getList().then(function(vehicles) {
    $scope.vehicles = vehicles;
  });

  $scope.filterFunction = function(vehicle){
  	if($scope.filterBy == "UnReserved" && !vehicle.reservation){
  		return true;
  	}else if($scope.filterBy == "Reserved" && vehicle.reservation){
  		return true;
	}else if($scope.filterBy == "PendingPickup" && vehicle.reservation && !vehicle.reservation.occupied_at){
  		return true;
  	}else if($scope.filterBy == "PendingReturn" && vehicle.reservation && !vehicle.reservation.scheduled_to_return_at){
  		return true;
  	}else if($scope.filterBy == "All"){
  		return true;
  	}else{
  		return false;
  	}
  }

}