angular.module('angularApp.controllers').controller('HomeCtrl', HomeCtrl);
HomeCtrl.$inject = ['$scope', 'VehicleService', '$state'];

function HomeCtrl($scope, VehicleService, $state) {

  $scope.vehicles = {};

  VehicleService.getList().then(function(vehicles) {
    $scope.vehicles = vehicles;
  });

}