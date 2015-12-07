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

            deleteUser: function(user) {

                var deferred = $q.defer();

                $http.post(base + '/v1/user/delete', user)
                    .success(function (user) {
                        deferred.resolve(user);
                    })
                    .error(function (err) {
                        deferred.reject(err);
                    })
                ;

                return deferred.promise;

            },

            loadUsers: function() {
              var deferred = $q.defer();

              $http.get(base + '/v1/users')
                .success(function(users) {
                  deferred.resolve(users);
                })
                .error(function(err) {
                  deferred.reject(err);
                })
              ;

              return deferred.promise;
            },

            checkUserGroup: function(user) {
                var deferred = $q.defer();

                $http.post(base + '/v1/user/group', user)
                    .success(function(users) {
                        deferred.resolve(users);
                    })
                    .error(function(err) {
                        deferred.reject(err);
                    })
                ;

                return deferred.promise;
            },

            addUserToGroup: function(user) {
                var deferred = $q.defer();

                $http.post(base + '/v1/user/group/add', user)
                    .success(function(users) {
                        deferred.resolve(users);
                    })
                    .error(function(err) {
                        deferred.reject(err);
                    })
                ;

                return deferred.promise;
            },

            removeUserFromGroup: function(user) {
                var deferred = $q.defer();

                $http.post(base + '/v1/user/group/remove', user)
                    .success(function(users) {
                        deferred.resolve(users);
                    })
                    .error(function(err) {
                        deferred.reject(err);
                    })
                ;

                return deferred.promise;
            },

            loadGroupUsers: function(group) {
                var deferred = $q.defer();

                $http.post(base + '/v1/users/group', group)
                    .success(function(users) {
                        deferred.resolve(users);
                    })
                    .error(function(err) {
                        deferred.reject(err);
                    })
                ;

                return deferred.promise;
            },

            checkUserSubgroup: function(user) {
                var deferred = $q.defer();

                $http.post(base + '/v1/user/subgroup', user)
                    .success(function(users) {
                        deferred.resolve(users);
                    })
                    .error(function(err) {
                        deferred.reject(err);
                    })
                ;

                return deferred.promise;
            },

            addUserToSubgroup: function(user) {
                var deferred = $q.defer();

                $http.post(base + '/v1/user/subgroup/add', user)
                    .success(function(users) {
                        deferred.resolve(users);
                    })
                    .error(function(err) {
                        deferred.reject(err);
                    })
                ;

                return deferred.promise;
            },

            removeUserFromSubgroup: function(user) {
                var deferred = $q.defer();

                $http.post(base + '/v1/user/subgroup/remove', user)
                    .success(function(users) {
                        deferred.resolve(users);
                    })
                    .error(function(err) {
                        deferred.reject(err);
                    })
                ;

                return deferred.promise;
            },

            loadSubgroupUsers: function(subgroup) {
                var deferred = $q.defer();

                $http.post(base + '/v1/users/subgroup', subgroup)
                    .success(function(users) {
                        deferred.resolve(users);
                    })
                    .error(function(err) {
                        deferred.reject(err);
                    })
                ;

                return deferred.promise;
            },

            loadUser: function(user) {
                var deferred = $q.defer();

                $http.post(base + '/v1/user/load', user)
                    .success(function(newUser) {
                        deferred.resolve(newUser);
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
            },

            getMyGroups: function(user) {
                var deferred = $q.defer();

                $http.get(base + '/v1/groups/' + user._id)
                  .success(function (groups) {
                    deferred.resolve(groups);
                  })
                  .error(function(err) {
                    deferred.reject(err);
                  })
                ;

                return deferred.promise;
            },

            changeGroupName: function(group) {

                var deferred = $q.defer();

                $http.put(base + '/v1/group/name', group)
                    .success(function (msg) {
                        deferred.resolve(msg);
                    })
                    .error(function (err) {
                        deferred.reject(err);
                    })
                ;

                return deferred.promise;

            },

            leaveCurrentGroup: function(group) {

                var deferred = $q.defer();

                $http.post(base + '/v1/group/leave', group)
                    .success(function (msg) {
                        deferred.resolve(msg);
                    })
                    .error(function (err) {
                        deferred.reject(err);
                    })
                ;

                return deferred.promise;

            }
        }
    }])

    .factory('SubGroupFactory', ['$q', '$http', function($q, $http) {
          return {

              create: function (subgroup) {
                  var deferred = $q.defer();


                  $http.post(base + '/v1/subgroup', subgroup)
                      .success(function (subgroups) {
                          deferred.resolve(subgroups);
                      })
                      .error(function (err) {
                          deferred.reject(err);
                      })
                  ;

                  return deferred.promise;
              },

              getSubGroups: function (group) {
                  var deferred = $q.defer();

                  $http.post(base + '/v1/subgroups/group', group)
                      .success(function (msg) {
                          deferred.resolve(msg);
                      })
                      .error(function (err) {
                          deferred.reject(err);
                      })
                  ;

                  return deferred.promise;

              },

              changeSubGroupName: function(subgroup) {

                  var deferred = $q.defer();

                  $http.put(base + '/v1/subgroup/name', subgroup)
                      .success(function (msg) {
                          deferred.resolve(msg);
                      })
                      .error(function (err) {
                          deferred.reject(err);
                      })
                  ;

                  return deferred.promise;

              },

              leaveCurrentSubGroup: function(subgroup) {

                  var deferred = $q.defer();

                  $http.post(base + '/v1/subgroup/leave', subgroup)
                      .success(function (msg) {
                          deferred.resolve(msg);
                      })
                      .error(function (err) {
                          deferred.reject(err);
                      })
                  ;

                  return deferred.promise;

              }
          }
    }])

    .factory('ChatFactory', ['$q', '$http', function($q, $http) {
          return {

                addChat: function(chat) {
                      var deferred = $q.defer();

                      $http.post(base + '/chat/addChat', chat)
                            .success(function(message) {
                                deferred.resolve(message);
                            })
                            .error(function(err) {
                                deferred.reject(err);
                            })
                      ;

                      return deferred.promise;
                },

              // this is Parker's bit, I'm reluctant to delete it as I might need it later
              /*
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
                */

          }
    }])

    .factory('MeetupFactory', ['$q', '$http', function($q, $http) {
          return {

                all: function(subgroup) {
                      var deferred = $q.defer();

                      $http.post(base + '/v1/meetups', subgroup)
                            .success(function(meetups) {
                                deferred.resolve(meetups);
                            })
                            .error(function(err) {
                                deferred.reject(err);
                            })
                      ;

                      return deferred.promise;
                },

                create: function(meetup) {
                      var deferred = $q.defer();

                      $http.post(base + '/v1/meetup', meetup)
                          .success(function(meetup) {
                              deferred.resolve(meetup);
                          })
                          .error(function(err) {
                              deferred.reject(err);
                          })
                      ;

                      return deferred.promise;
                },

                deleteMeetup: function (meetup) {
                      var deferred = $q.defer();


                      $http.post(base + '/v1/meetup/delete', meetup)
                          .success(function (meetup) {
                              deferred.resolve(meetup);
                          })
                          .error(function (err) {
                              deferred.reject(err);
                          })
                      ;

                      return deferred.promise;
                },

                update: function(meetup) {

                      var deferred = $q.defer();

                      $http.put(base + '/v1/meetup', meetup)
                          .success(function (meetup) {
                              deferred.resolve(meetup);
                          })
                          .error(function (err) {
                              deferred.reject(err);
                          })
                      ;

                      return deferred.promise;

                }
          }
    }]);
