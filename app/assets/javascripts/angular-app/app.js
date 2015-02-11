angular.module('angularApp', [
    'templates',
    'ngMessages',
    'ui.router',
    'ui.utils',
    'restangular',
    'angularApp.controllers',
    'angularApp.services',
    'angularApp.directives',
    'angularApp.filters',
    'ui.bootstrap',
    'ui.bootstrap.showErrors'
  ])
  .config(['$stateProvider', '$urlRouterProvider', 'RestangularProvider',
    function($stateProvider, $urlRouterProvider, RestangularProvider) {
      RestangularProvider.setRequestSuffix('.json');

      $urlRouterProvider.otherwise("/vehicles");
      $stateProvider
        .state('vehicles', {
          url: "/vehicles",
          templateUrl: "index.html",
          controller: "VehicleListCtrl",
          resolve: {
            vehicles: ['VehicleService', function(VehicleService){
              return VehicleService.getList();
            }]
          }
        })
        .state('vehicles.reservation', {
          url: "/:id/reservations/:reservation_id",
          onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
            $modal.open({
              templateUrl: "reservation_form.html",
              controller: ReservationFormCtrl,
              resolve: {
                vehicle: ['VehicleService', function(VehicleService) {
                  return VehicleService.getOne($stateParams.id);
                }]
              }
            }).result.finally(function() {
              $state.go('^');
            });
          }]
        })
        .state('history', {
          url: "/history",
          templateUrl: "history.html",
          controller: "PastReservationsCtrl",
          resolve: {
            reservations: ['ReservationService', function(ReservationService) {
              return ReservationService.history();
            }]
          }
        })
        .state('analytics', {
          url: "/analytics",
          templateUrl: "analytics.html",
          controller: "AnalyticsCtrl"
        })
    }
  ]);

angular.module('angularApp.directives', []);
angular.module('angularApp.controllers', []);
angular.module('angularApp.services', ['restangular', 'ngToast']);
angular.module('angularApp.filters', [])
  .filter('formatDate', ['$filter', function($filter) {
    return function(input) {
      if (input == null) {
        return "";
      }
      var _date = $filter('date')(new Date(input), 'MM-dd-yyyy');
      return _date;
    };
  }]);