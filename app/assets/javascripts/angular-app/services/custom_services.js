angular.module('angularApp.services')
  .factory('ToastService', ToastService);

ToastService.$inject = ['ngToast'];

function ToastService(ngToast) {
  return {
    show: function(message) {
      if (message != "") {
        if (typeof message == 'string') {
          ngToast.create({
            content: message
          });
        } else {
          angular.forEach(message, function(value, key) {
            var msg = key + ": " + value;
            ngToast.create({
              content: msg,
              className: "danger"
            });
          });
        }
      }
    }
  };
}