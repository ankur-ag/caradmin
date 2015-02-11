angular.module('angularApp.controllers').controller('HeaderCtrl', HeaderCtrl);
HeaderCtrl.$inject = ['$scope', '$location'];

function HeaderCtrl($scope, $location) {
  $scope.path = $location.path();
}