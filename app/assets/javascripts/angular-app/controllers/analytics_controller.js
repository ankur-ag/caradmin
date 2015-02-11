angular.module('angularApp.controllers').controller('AnalyticsCtrl', AnalyticsCtrl);
AnalyticsCtrl.$inject = ['$scope', '$location'];

function AnalyticsCtrl($scope, $location) {
  $scope.$parent.path = $location.path();
}