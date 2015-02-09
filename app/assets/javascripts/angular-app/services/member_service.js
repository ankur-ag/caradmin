angular.module('angularApp.services')
.factory('MemberService', ['Restangular', '$q','$filter',
  function(Restangular, $q, $filter) {
    var service = Restangular.service('members');
    var members = {};

    return {
      getList: function() {
        var list = [];
        var deferred = $q.defer();
        service.getList().then(function(members) {
          members = members;
          deferred.resolve(members);
        });
        return deferred.promise;
      },
      getOne: function(id) {
        var deferred = $q.defer();
        if (members[id]) {
          deferred.resolve(members[id]);
        } else {
          service.one(id).get().then(function(member) {
            members[member.id] = member;
            deferred.resolve(member);
          }, function(response) {
            deferred.reject(response);
          })
        }
        return deferred.promise;
      },
      getOneByEmail: function(email) {
        var deferred = $q.defer();
        Restangular.all('members').customGET("show_by_email", {email: email}).then(function(member) {
          members[member.id] = member;
          deferred.resolve(member);
        }, function(response) {
          deferred.reject(response);
        })
        return deferred.promise;
      },
      save: function(member) {
        if (member.id) {
          return member.put().then(function(member) {
            members[member.id] = member;
            return member;
          });
        } else {
          return service.post(member).then(function(new_user) {
            members[new_user.id] = new_user;
            return new_user;
          })
        }
      },
      delete: function(id) {
        return service.remove(id);
      }
    };
  }
])