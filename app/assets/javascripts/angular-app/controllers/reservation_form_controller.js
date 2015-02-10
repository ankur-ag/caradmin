angular.module('angularApp.controllers').controller('ReservationFormCtrl', ReservationFormCtrl)
ReservationFormCtrl.$inject = ['$scope', 'VehicleService', 'ReservationService', 'MemberService', '$state', '$stateParams', 'ToastService', '$modalInstance']

function ReservationFormCtrl($scope, VehicleService, ReservationService, MemberService, $state, $stateParams, ToastService, $modalInstance) {
  $scope.vehicle = {};
  $scope.member = {};
  $scope.reservation = {};

  VehicleService.getOne($stateParams.id).then(function(vehicle) {
    $scope.vehicle = vehicle;
    $scope.reservation.vehicle_id = $scope.vehicle.id;
    if ($stateParams.reservation_id) {
      $scope.reservation = angular.copy(vehicle.reservation);
      $scope.member = $scope.vehicle.reservation.member;
    }
  })

  $scope.validateEmail = function() {
    MemberService.getOneByEmail($scope.member.email).then(function(member) {
      $scope.member = member;
      $scope.reservation.member_id = member.id;
    }, function(error) {
      ToastService.show("Member not found!");
    });
  }

  $scope.submit = function(valid) {
    if (valid) {
      ReservationService.save($scope.reservation).then(function(reservation) {
        $scope.vehicle.reservation = reservation;
        VehicleService.getOne(reservation.vehicle_id);
        if (reservation.returned_at) {
          ToastService.show("Reservation completed!");
        } else {
          ToastService.show("Saved successfully!");
        }
        $modalInstance.dismiss('cancel');
      }, function(error) {
        ToastService.show(error.data);
      });
    }
  }

  $scope.open = function($event, opened) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope[opened] = true;
  };

  $scope.dateOptions = {
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}