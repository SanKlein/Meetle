var base = 'http://localhost:3000';

angular.module('classCollaboration.services', [])

.factory('UserFactory', ['$q', '$http', function($q, $http) {
    return {

        login: function (user) {

            var deferred = $q.defer();

            $http.post(base + '/login', user)
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

.factory('CourseFactory', ['$q', '$http', function($q, $http) {
    return {

      getAllCourses: function() {
        var deferred = $q.defer();

        $http.post(base + '/course/all')
          .success(function (courses) {
            deferred.resolve(courses);
          })
          .error(function (err) {
            deferred.reject(err);
          })
        ;

        return deferred.promise;
      },

      getMyCourses: function(user) {
        var deferred = $q.defer();

        $http.post(base + '/course/my', user)
          .success(function (courses) {
            deferred.resolve(courses);
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

    getMyGroups: function(course) {
      var deferred = $q.defer();

      $http.post(base + '/group/course', course)
        .success(function(groups) {
          deferred.resolve(groups);
        })
        .error(function(err) {
          deferred.reject(err);
        })
      ;

      return deferred.promise;
    },

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
