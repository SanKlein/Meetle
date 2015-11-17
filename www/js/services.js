var base = 'http://localhost:3000';

angular.module('meetle.services', [])

    // takes care of local storage for current user, other user, and current entry
    .factory('$localstorage', ['$window', function($window) {
        return {
            set: function(key, value) {
                $window.localStorage[key] = value;
            },
            get: function(key) {
                return $window.localStorage[key];
            },
            setObject: function(key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function(key) {
                return JSON.parse($window.localStorage[key] || '{}');
            }
        }
    }])


.factory('UserFactory', ['$q', '$http', function($q, $http) {
    return {

        login: function (user) {

            var deferred = $q.defer();

            $http.post(base + '/v1/user/login', user)
                .success(function (user) {
                    deferred.resolve(user);
                })
                .error(function (err) {
                    deferred.reject(err);
                })
            ;

            return deferred.promise;
        },

        signup: function(user) {

            var deferred = $q.defer();

            $http.post(base + '/v1/user', user)
                .success(function (user) {
                  deferred.resolve(user);
                })
                .error(function (err) {
                  deferred.reject(err);
                })
            ;

            return deferred.promise;

        },

        update: function(user) {

            var deferred = $q.defer();

            $http.put(base + '/v1/user', user)
                .success(function (user) {
                    deferred.resolve(user);
                })
                .error(function (err) {
                    deferred.reject(err);
                })
            ;

            return deferred.promise;

        },

        delete: function(user) {

            var deferred = $q.defer();

            $http.delete(base + '/v1/user', user)
                .success(function (user) {
                    deferred.resolve(user);
                })
                .error(function (err) {
                    deferred.reject(err);
                })
            ;

            return deferred.promise;

        },

        all: function() {
          var deferred = $q.defer();

          $http.post(base + '/users')
            .success(function(users) {
              deferred.resolve(users);
            })
            .error(function(err) {
              deferred.reject(err);
            })
          ;

          return deferred.promise;
        }
    }
}])

.factory('GroupFactory', ['$q', '$http', function($q, $http) {
    return {

        getMyGroups: function(user) {
        var deferred = $q.defer();

        $http.post(base + '/v1/user/groups', user)
          .success(function (groups) {
            deferred.resolve(groups);
          })
          .error(function(err) {
            deferred.reject(err);
          })
        ;

        return deferred.promise;
        },

        create: function(group) {
            var deferred = $q.defer();

            $http.post(base + '/v1/group', group)
                .success(function (groups) {
                    deferred.resolve(groups);
                })
                .error(function(err) {
                    deferred.reject(err);
                })
            ;

            return deferred.promise;
        }
    }
}])

.factory('SubGroupFactory', ['$q', '$http', function($q, $http) {
  return {

    getMySubGroups: function(group) {
      var deferred = $q.defer();

      $http.post(base + '/subgroup/group', group)
        .success(function(subgroups) {
          deferred.resolve(subgroups);
        })
        .error(function(err) {
          deferred.reject(err);
        })
      ;

      return deferred.promise;
    }

  }
}])

.factory('ChatFactory', ['$q', '$http', function($q, $http) {
  return {

    create: function(chat) {
      var deferred = $q.defer();

      $http.post(base + '/chat/add', chat)
        .success(function(message) {
          deferred.resolve(message);
        })
        .error(function(err) {
          deferred.reject(err);
        })
      ;

      return deferred.promise;
    },

    getChat: function() {
      var deferred = $q.defer();

      $http.post(base + '/chat/all')
        .success(function(chats) {
          deferred.resolve(chats);
        })
        .error(function(err) {
          deferred.reject(err);
        })
      ;

      return deferred.promise;
    }

  }
}])

.factory('MeetupFactory', ['$q', '$http', function($q, $http) {
  return {

    all: function() {
      var deferred = $q.defer();

      $http.post(base + '/meetups')
        .success(function(meetups) {
          deferred.resolve(meetups);
        })
        .error(function(err) {
          deferred.reject(err);
        })
      ;

      return deferred.promise;
    },


  }
}]);
