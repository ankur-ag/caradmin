angular.module('customServices', ['ngMaterial'])
  .factory('ToastService', ['$mdToast',
    function($mdToast) {
      return {
        show: function(message) {
          if (message != "") {
            if (typeof message == 'string') {
              $mdToast.show({
                template: "<md-toast>" + message + "</md-toast>"
              });
            } else {
              angular.forEach(message, function(value, key) {
                $mdToast.show({
                  template: "<md-toast>" + key + ": " + value + "</md-toast>"
                });
              });
            }
          }
        }
      };
    }
  ]);