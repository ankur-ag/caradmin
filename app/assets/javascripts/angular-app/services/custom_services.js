angular.module('angularApp.services')
  .factory('ToastService', ToastService);

function ToastService() {
  return {
    show: function(message) {
      if (message != "") {
        if (typeof message == 'string') {
          alert({
            template: "<md-toast>" + message + "</md-toast>"
          });
        } else {
          angular.forEach(message, function(value, key) {
            alert({
              template: "<md-toast>" + key + ": " + value + "</md-toast>"
            });
          });
        }
      }
    }
  };
}