angular.module('meetle.controllers', [])

  .controller('MeetleCtrl', ['$rootScope', '$ionicSideMenuDelegate', '$window', '$localstorage', function($rootScope, $ionicSideMenuDelegate, $window, $localstorage) {

        $rootScope.currentUser = '';
        $rootScope.meetups = [];

          $rootScope.logout = function() {
              $rootScope.currentUser = null;
              $localstorage.set('currentUser', '');

              $window.location.assign('#/login');
          };

          $rootScope.openMenu = function () {
              $ionicSideMenuDelegate.toggleLeft();
          };

          $rootScope.goBack = function(){
            $window.history.back();
          }

      }
  ])

  .controller('LoginCtrl', ['$rootScope', '$scope', 'UserFactory', '$window', '$localstorage', function($rootScope, $scope, UserFactory, $window, $localstorage) {

      $scope.user = {
          username: '',
          password: '',
          error: ''
      };

      $scope.login = function() {
          UserFactory.login($scope.user).then(function(user) {
              $localstorage.setObject('currentUser', user);
              $rootScope.currentUser = user; // used to keep track of current user

              $window.location.assign('#/groups');
          }, function(err) {
            console.log('error');
            // error to be presented to user on failed signup
            $scope.user.error = err;
          });
      };
  }])

  .controller('SignupCtrl', ['$rootScope', '$scope', 'UserFactory', '$window', '$localstorage', function($rootScope, $scope, UserFactory, $window, $localstorage) {

      $scope.user = {
        username: '',
        password1: '',
        password2: '',
        first_name: '',
        last_name: '',
        error: ''
      };

      $scope.signup = function() {
          if ($scope.user.password1 !== $scope.user.password2) {
            $scope.user.error = "Passwords do not match";
          } else {
            UserFactory.signup($scope.user).then(function(user) {
              $localstorage.setObject('currentUser', user);
              $rootScope.currentUser = user; // used to keep track of current user

              $window.location.assign('#/groups');
            }, function(err) {
              console.log('error');
              // error to be presented to user on failed signup
              $scope.user.error = err;
            });
          }
      };
  }])

  .controller('ProfileCtrl', ['$rootScope', '$scope', 'UserFactory', '$window', '$localstorage', function($rootScope, $scope, UserFactory, $window, $localstorage) {

      $scope.user = $localstorage.getObject('currentUser');

      $scope.editProfile = function() {
        UserFactory.update($scope.user).then(function(user) {
          $localstorage.setObject('currentUser', $scope.user);
          $window.location.assign('#/groups');
        });
      };

      $scope.deleteAccount = function() {
        UserFactory.deleteUser($scope.user).then(function(user) {
          $localstorage.set('currentUser', '');
          $window.location.assign('#/login');
        });
      };
  }])

  .controller('GroupCtrl', ['$rootScope', '$scope', 'GroupFactory', '$window', '$ionicListDelegate', '$localstorage', 'UserFactory', function($rootScope, $scope, GroupFactory, $window, $ionicListDelegate, $localstorage, UserFactory) {
    $scope.groups = [];

    GroupFactory.getMyGroups($localstorage.getObject('currentUser')).then(function(groups) {
      if (groups) {
        $scope.groups = groups;
      } else {
        console.log('no groups found');
      }
    });

    $scope.loadGroup = function(group) {
      $localstorage.setObject('currentGroup', group);
      $rootScope.currentGroup = group;
      $window.location.assign('#/subGroups');
    };

    $scope.remove = function(group, index) {
      console.log('group to remove');
      console.log(group);
      GroupFactory.deleteGroup(group).then(function(deletedGroup) {
        console.log(deletedGroup);
        $scope.groups.splice(index, 1);
        $ionicListDelegate.closeOptionButtons();
      });
    };
  }])

  .controller('NewGroupCtrl', ['$rootScope', '$scope', 'GroupFactory', '$window', '$ionicListDelegate', '$localstorage', 'UserFactory', 'SubGroupFactory', function($rootScope, $scope, GroupFactory, $window, $ionicListDelegate, $localstorage, UserFactory, SubGroupFactory) {
    $scope.group = {
      title: '',
      user_id: $localstorage.getObject('currentUser')._id
    };

    $scope.createGroup = function() {
      GroupFactory.create($scope.group).then(function(group) {
        group.user_id = $scope.group.user_id;
        group.subgroup_title = 'Entire Group';
        SubGroupFactory.create(group).then(function(subgroup) {
          $window.location.assign('#/groups');
        });
      });
    };
  }])

  .controller('SubGroupCtrl', ['$rootScope', '$scope', 'SubGroupFactory', '$window', '$ionicListDelegate', '$localstorage', function($rootScope, $scope, SubGroupFactory, $window, $ionicListDelegate, $localstorage) {
    $scope.subgroups = [];

    $rootScope.currentGroup = $localstorage.getObject('currentGroup');
    $rootScope.currentGroup.user = $localstorage.getObject('currentUser')._id;

    SubGroupFactory.getSubGroups($rootScope.currentGroup).then(function(subgroups) {
      $scope.subgroups = subgroups;
    });

    $scope.loadSubGroup = function(subgroup) {
      $localstorage.setObject('currentSubGroup', subgroup);
      $rootScope.currentSubGroup = subgroup;
      $window.location.assign('#/tab/chat');
    };

    $scope.remove = function(post, index) {
      $scope.subgroups.splice(index, 1);
      $ionicListDelegate.closeOptionButtons();
    };
  }])

  .controller('ChatCtrl', ['$rootScope', '$scope', 'ChatFactory', '$window', function($rootScope, $scope, ChatFactory, $window) {

    $scope.chatroom = {
      chats: [],
      text: ''
    };

    ChatFactory.getChat().then(function(chats) {
      if (chats.length) {
        for (var i = 0; i < chats.length; i++) {
          (function(index) {
            chats[index].liked = false;
            $scope.chatroom.chats.push(chats[index]);
          })(i);
        }
      }
    });

    $scope.likeChat = function(chat, index) {
      $scope.chatroom.chats[index].liked = !chat.liked;
    };

    $scope.addChat = function() {
      console.log('add chat clicked');
      var newChat = {
        text: $scope.chatroom.text,
        user_id: $rootScope.currentUser._id,
        user_username: $rootScope.currentUser.username,
        course : $rootScope.currentCourse._id,
        group: $rootScope.currentGroup._id
      };

      ChatFactory.create(newChat).then(function(chat) {
        console.log(chat);
        if ($scope.chatroom.chats) {
          $scope.chatroom.chats.push(chat);
        } else {
          $scope.chatroom.chats = [chat];
        }
      });

      $scope.chatroom.text = '';
    };
  }])

  .controller('MeetupsCtrl', ['$rootScope', '$scope', 'MeetupFactory', '$window', function($rootScope, $scope, MeetupFactory, $window) {
    $scope.meetups = [];

    MeetupFactory.all().then(function(meetups) {
      console.log('all meetups found');
      console.log(meetups);
      if (meetups) {
        $scope.meetups = meetups;
      }
    });

  }])