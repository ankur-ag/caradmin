angular.module('angularApp.controllers').controller('ReservationFormCtrl', ReservationFormCtrl)
ReservationFormCtrl.$inject = ['$scope', 'VehicleService', 'ReservationService', 'MemberService', '$state', '$stateParams', 'ToastService']

function ReservationFormCtrl($scope, VehicleService, ReservationService, MemberService, $state, $stateParams, ToastService) {
  $scope.vehicle = {};
  $scope.member = {};
  $scope.reservation = {};

  VehicleService.getOne($stateParams.id).then(function(vehicle) {
    $scope.vehicle = vehicle;
    $scope.reservation.vehicle_id = vehicle.id;
    if ($stateParams.reservation_id) {
      $scope.reservation = vehicle.reservation;
      $scope.member = vehicle.reservation.member;
    }
  })

  $scope.validateEmail = function() {
    MemberService.getOneByEmail($scope.member.email).then(function(member) {
      $scope.member = member;
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
        $scope.vehicle.reservation = reservation;
        if (reservation.returned_at) {
          ToastService.show("Reservation completed!");
        } else {
          ToastService.show("Saved successfully!");
        }
        $state.go("vehicles");
      }, function(error) {
        ToastService.show(error.data);
      });
    }
  }

  $scope.closeView = function() {
    $state.go("vehicles");
  }
}