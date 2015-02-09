angular.module('angularApp.controllers').controller('HomeCtrl', ['$scope', 'VehicleService', '$mdToast','$state','$mdSidenav',
  function HomeCtrl($scope, VehicleService, $mdToast, $state, $mdSidenav) {

    $scope.vehicles = [];
    $scope.dateFormat = 'MM-dd-yyyy';

    VehicleService.getList().then(function(vehicles) {
      $scope.vehicles = vehicles;
    });

    $scope.openReservationForm = function(){
      $state.go("vehicles.index.new");
    };
  }
]);