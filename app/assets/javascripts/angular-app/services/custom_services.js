angular.module('angularApp.services')
  .factory('ToastService', ToastService);

function ToastService() {
  return {
    show: function(message) {
      if (message != "") {
        if (typeof message == 'string') {
          console.log({
            template: "<md-toast>" + message + "</md-toast>"
          });
        } else {
          angular.forEach(message, function(value, key) {
            console.log({
              template: "<md-toast>" + key + ": " + value + "</md-toast>"
            });
          });
        }
      }
    }
  };
}