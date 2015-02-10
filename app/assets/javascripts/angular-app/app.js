angular.module('angularApp', [
    'templates',
    'ngMaterial',
    'ngMessages',
    'ui.router',
    'ui.utils',
    'restangular',
    'angularApp.controllers',
    'angularApp.services',
    'angularApp.directives',
    'angularApp.filters',
    'customServices'
  ])
  .config(['$stateProvider', '$urlRouterProvider', '$mdThemingProvider', 'RestangularProvider',
    function($stateProvider, $urlRouterProvider, $mdThemingProvider, RestangularProvider) {
      RestangularProvider.setRequestSuffix('.json');
      $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('light-blue');

      $urlRouterProvider.otherwise("/vehicles");
      $stateProvider
        .state('vehicles', {
          url: "/vehicles",
          templateUrl: "index.html",
          controller: "HomeCtrl"
        })
        .state('vehicles.reservation', {
          url: "/:id/reservations/:reservation_id",
          templateUrl: "reservation_form.html",
          controller: "ReservationFormCtrl"
        })
    }
  ]);

angular.module('angularApp.directives', []);
angular.module('angularApp.controllers', []);
angular.module('angularApp.services', ['restangular']);
angular.module('angularApp.filters',[])
.filter('formatDate', ['$filter', function($filter){
  return function(text){
    var  tempdate = new Date(text.substring(0,10));
    return $filter('date')(tempdate, "MM-dd-yyyy");
  }
}]);