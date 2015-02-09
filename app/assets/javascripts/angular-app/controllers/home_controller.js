angular.module('angularApp.controllers').controller('HomeCtrl', ['$scope', 'VehicleService', '$mdToast','$state','$mdSidenav',
  function HomeCtrl($scope, VehicleService, $mdToast, $state, $mdSidenav) {

    $scope.vehicles = {};

    VehicleService.getList().then(function(vehicles) {
      $scope.vehicles = vehicles;
    });

  }
]);