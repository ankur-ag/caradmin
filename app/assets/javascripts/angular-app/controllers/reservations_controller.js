angular.module('angularApp.controllers').controller('ReservationsCtrl', ['$scope', 'VehicleService', 'ReservationService', 'MemberService', '$mdToast', '$state', '$stateParams', '$mdSidenav',
  function ReservationsCtrl($scope, VehicleService, ReservationService, MemberService, $mdToast, $state, $stateParams, $mdSidenav) {
    $scope.vehicle = {};
    $scope.member = {};
    $scope.reservation = {};

    VehicleService.getOne($stateParams.id).then(function(vehicle) {
      $scope.vehicle = vehicle;
      console.log(vehicle);
      $scope.reservation.vehicle_id = vehicle.id;
    })

    if ($stateParams.reservation_id) {
      $scope.reservation.id = $stateParams.reservation_id;
      ReservationService.getOne($scope.reservation.id).then(function(reservation) {
        $scope.reservation = reservation;
        return MemberService.getOne($scope.reservation.member_id);
      }).then(function(member) {
        $scope.member = member;
      });
    }

    $scope.validateEmail = function() {
      MemberService.getOneByEmail($scope.member.email).then(function(member) {
        $scope.reservation.member_id = member.id;
      }, function(error) {
        $mdToast.show({
          template: "<md-toast>Invalid Email!</md-toast>"
        });
      });
    }

    $scope.submit = function(valid) {
      if (valid) {
        ReservationService.save($scope.reservation).then(function(reservation) {
          $scope.reservation = reservation;
          VehicleService.getOne($scope.vehicle.id);
          if (reservation.returned_at) {
            $mdToast.show({
              template: "<md-toast>Reservation completed!</md-toast>"
            });
          } else {
            $mdToast.show({
              template: "<md-toast>Saved successfully!</md-toast>"
            });
          }
          $state.go("vehicles");
        }, function(error) {
          angular.forEach(error.data, function(value, key) {
            $mdToast.show({
              template: "<md-toast>" + key + ": " + value + "</md-toast>"
            });
          });
        });
      }
    }

    $scope.closeView = function() {
      $state.go("vehicles");
    }
  }
]);