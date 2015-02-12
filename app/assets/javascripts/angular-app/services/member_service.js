angular.module('angularApp.services')
  .factory('MemberService', ['Restangular', '$q', '$filter',
    function(Restangular, $q, $filter) {
      var service = Restangular.service('members');

      return {
        getOneByEmail: function(email) {
          var deferred = $q.defer();
          Restangular.all('members').customGET("show_by_email", {
            email: email
          }).then(function(member) {
            deferred.resolve(member);
          }, function(response) {
            deferred.reject(response);
          })
          return deferred.promise;
        }
      };
    }
  ])