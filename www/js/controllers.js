angular.module('meetle.controllers', [])

    .controller('MeetleCtrl', ['$rootScope', '$ionicSideMenuDelegate', '$window', '$localstorage', function($rootScope, $ionicSideMenuDelegate, $window, $localstorage) {

        $rootScope.currentUser = '';
        $rootScope.meetups = [];

        $rootScope.logout = function() {
            $rootScope.currentUser = null;
            $localstorage.set('currentUser', '');
            $localstorage.set('currentGroup', '');
            $localstorage.set('currentSubGroup', '');
            $localstorage.set('currentMeetup', '');

            $window.location.assign('#/login');
        };

        $rootScope.openMenu = function () {
            $ionicSideMenuDelegate.toggleLeft();
        };

        $rootScope.goBack = function(){
            $window.history.back();
        }

    }])

    .controller('LoginCtrl', ['$rootScope', '$scope', 'UserFactory', '$window', '$localstorage', '$ionicSideMenuDelegate', function($rootScope, $scope, UserFactory, $window, $localstorage, $ionicSideMenuDelegate) {

        // cannot open side menu when on login or signup
        $ionicSideMenuDelegate.canDragContent(false);

        $scope.user = {
            username: '',
            password: '',
            error: ''
        };

        $scope.login = function() {
            UserFactory.login($scope.user).then(function(user) {
                $localstorage.setObject('currentUser', user);
                $rootScope.currentUser = user; // used to keep track of current user

                // successful login now we can open up the side menu
                $ionicSideMenuDelegate.canDragContent(true);

                $window.location.assign('#/groups');
            }, function(err) {
                console.log('error');
                // error to be presented to user on failed signup
                $scope.user.error = err;
            });
        };
    }])

    .controller('SignupCtrl', ['$rootScope', '$scope', 'UserFactory', '$window', '$localstorage', '$ionicSideMenuDelegate', function($rootScope, $scope, UserFactory, $window, $localstorage, $ionicSideMenuDelegate) {

        // cannot open side menu when on login or signup
        $ionicSideMenuDelegate.canDragContent(false);

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

                    // successful login now we can open up the side menu
                    $ionicSideMenuDelegate.canDragContent(true);

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
        if (!$scope.user.username) $window.location.assign('#/login');

        $scope.editProfile = function() {
            UserFactory.update($scope.user).then(function(user) {
                $localstorage.setObject('currentUser', $scope.user);
                $window.location.assign('#/groups');
            });
        };

        $scope.deleteAccount = function() {
            UserFactory.deleteUser($scope.user).then(function(user) {
                $localstorage.set('currentUser', '');
                $localstorage.set('currentGroup', '');
                $localstorage.set('currentSubGroup', '');
                $localstorage.set('currentMeetup', '');
                $window.location.assign('#/login');
            });
        };
    }])

    .controller('GroupCtrl', ['$rootScope', '$scope', 'GroupFactory', '$window', '$ionicListDelegate', '$localstorage', 'UserFactory', 'SubGroupFactory', function($rootScope, $scope, GroupFactory, $window, $ionicListDelegate, $localstorage, UserFactory, SubGroupFactory) {

        $scope.user = $localstorage.getObject('currentUser');
        if (!$scope.user.username) $window.location.assign('#/login');

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

        $scope.leaveGroup = function(group, index) {
            group.user = $localstorage.getObject('currenUser')._id;
            SubGroupFactory.leaveCurrentGroup(group).then(function(msg) {
                console.log('Left Group');
                $scope.groups.splice(index, 1);
                $ionicListDelegate.closeOptionButtons();
            });
        }
    }])

    .controller('GroupSettingsCtrl', ['$rootScope', '$scope', 'SubGroupFactory', '$window', '$ionicListDelegate', '$localstorage', function($rootScope, $scope, SubGroupFactory, $window, $ionicListDelegate, $localstorage) {

        $rootScope.currentGroup = $localstorage.getObject('currentGroup');
        $rootScope.currentGroup.user = $localstorage.getObject('currentUser')._id;
        $scope.group = $rootScope.currentGroup;

        $scope.leaveGroup = function() {
            SubGroupFactory.leaveCurrentGroup($scope.group).then(function(msg) {
                $localstorage.set('currentGroup', '');
                $window.location.assign('#/groups');
            });
        }
    }])

    .controller('NewGroupCtrl', ['$rootScope', '$scope', 'GroupFactory', '$window', '$ionicListDelegate', '$localstorage', 'UserFactory', 'SubGroupFactory', function($rootScope, $scope, GroupFactory, $window, $ionicListDelegate, $localstorage, UserFactory, SubGroupFactory) {

        $scope.user = $localstorage.getObject('currentUser');
        if (!$scope.user.username) $window.location.assign('#/login');

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

    .controller('GroupNameCtrl', ['$rootScope', '$scope', 'GroupFactory', '$window', '$ionicListDelegate', '$localstorage', 'UserFactory', 'SubGroupFactory', function($rootScope, $scope, GroupFactory, $window, $ionicListDelegate, $localstorage, UserFactory, SubGroupFactory) {

        $rootScope.currentGroup = $localstorage.getObject('currentGroup');
        $rootScope.currentGroup.user = $localstorage.getObject('currentUser')._id;
        $scope.group = $localstorage.getObject('currentGroup');

        $scope.editGroupName = function() {
            SubGroupFactory.changeGroupName($scope.group).then(function(msg) {
                console.log(msg);
                $localstorage.setObject('currentGroup', $scope.group);
                $window.location.assign('#/groupSettings');
            });
        };

    }])

    .controller('SubGroupCtrl', ['$rootScope', '$scope', 'SubGroupFactory', '$window', '$ionicListDelegate', '$localstorage', function($rootScope, $scope, SubGroupFactory, $window, $ionicListDelegate, $localstorage) {

        $scope.user = $localstorage.getObject('currentUser');
        if (!$scope.user.username) $window.location.assign('#/login');

        $scope.subgroups = [];

        $rootScope.currentGroup = $localstorage.getObject('currentGroup');
        $rootScope.currentGroup.user = $localstorage.getObject('currentUser')._id;
        $scope.group = $localstorage.getObject('currentGroup');

        SubGroupFactory.getSubGroups($rootScope.currentGroup).then(function(subgroups) {
            $scope.subgroups = subgroups;
        });

        $scope.loadSubGroup = function(subgroup) {
            $localstorage.setObject('currentSubGroup', subgroup);
            $rootScope.currentSubGroup = subgroup;
            $window.location.assign('#/tab/chat');
        };

        $scope.remove = function(subgroup, index) {
            SubGroupFactory.deleteSubGroup(subgroup).then(function(subgroup) {
                $scope.subgroups.splice(index, 1);
                $ionicListDelegate.closeOptionButtons();
            });
        };

        $scope.editGroupName = function() {
            SubGroupFactory.changeGroupName($scope.group).then(function(msg) {
                console.log(msg);
                $localstorage.setObject('currentGroup', $scope.group);
                $window.location.assign('#/groupSettings');
            });
        };

        $scope.leaveGroup = function() {
            SubGroupFactory.leaveCurrentGroup($scope.group, $scope.user).then(function(msg) {
                $localstorage.set('currentGroup', '');
                $window.location.assign('#/groups');
            });
        }
    }])

    .controller('NewSubGroupCtrl', ['$rootScope', '$scope', 'GroupFactory', '$window', '$ionicListDelegate', '$localstorage', 'UserFactory', 'SubGroupFactory', function($rootScope, $scope, GroupFactory, $window, $ionicListDelegate, $localstorage, UserFactory, SubGroupFactory) {

        $scope.user = $localstorage.getObject('currentUser');
        if (!$scope.user.username) $window.location.assign('#/login');

        $scope.subgroup = {
            subgroup_title: '',
            _id: $localstorage.getObject('currentGroup')._id,
            user_id: $localstorage.getObject('currentUser')._id
        };

        $scope.createSubGroup = function() {
            SubGroupFactory.create($scope.subgroup).then(function(subgroup) {
                $window.location.assign('#/subGroups');
            });
        };
    }])

    .controller('ChatCtrl', ['$rootScope', '$scope', 'ChatFactory', '$window', '$localstorage', function($rootScope, $scope, ChatFactory, $window, $localstorage) {

        $scope.user = $localstorage.getObject('currentUser');
        if (!$scope.user.username) $window.location.assign('#/login');

        $rootScope.currentSubGroup = $localstorage.getObject('currentSubGroup');

        $scope.chatroom = {
            chats: [],
            text: ''
        };
    }])

    .controller('MeetupsCtrl', ['$rootScope', '$scope', 'MeetupFactory', '$window', '$localstorage', '$ionicListDelegate', function($rootScope, $scope, MeetupFactory, $window, $localstorage, $ionicListDelegate) {

        $scope.user = $localstorage.getObject('currentUser');
        if (!$scope.user.username) $window.location.assign('#/login');

        $rootScope.currentSubGroup = $localstorage.getObject('currentSubGroup');

        $scope.meetups = [];

        var subgroup = $localstorage.getObject('currentSubGroup');
        subgroup.user_id = $localstorage.getObject('currentUser')._id;

        MeetupFactory.all(subgroup).then(function(meetups) {
            if (meetups) {
                $scope.meetups = meetups;
            }
        });

        $scope.remove = function(meetup, index) {
            MeetupFactory.deleteMeetup(meetup).then(function(meetup) {
                $scope.meetups.splice(index, 1);
                $ionicListDelegate.closeOptionButtons();
            });
        };

        $scope.loadMeetup = function(meetup) {
            $localstorage.setObject('currentMeetup', meetup);
            $window.location.assign('#/editMeetup');
        };
    }])

    .controller('NewMeetupCtrl', ['$rootScope', '$scope', 'MeetupFactory', '$window', '$localstorage', function($rootScope, $scope, MeetupFactory, $window, $localstorage) {

        $scope.user = $localstorage.getObject('currentUser');
        if (!$scope.user.username) $window.location.assign('#/login');

        $scope.meetup = {
            date: '',
            time: '',
            location: '',
            user_id: $localstorage.getObject('currentUser')._id,
            subgroup_id: $localstorage.getObject('currentSubGroup')._id
        };

        $scope.createMeetup = function() {
            MeetupFactory.create($scope.meetup).then(function(meetup) {
                $window.location.assign('#/tab/meetups');
            })
        };

    }])

    .controller('EditMeetupCtrl', ['$rootScope', '$scope', 'MeetupFactory', '$window', '$localstorage', function($rootScope, $scope, MeetupFactory, $window, $localstorage) {

        $scope.user = $localstorage.getObject('currentUser');
        if (!$scope.user.username) $window.location.assign('#/login');

        $scope.meetup = $localstorage.getObject('currentMeetup');

        $scope.editMeetup = function() {
            MeetupFactory.update($scope.meetup).then(function(meetup) {
                $localstorage.setObject('currentMeetup', $scope.meetup);
                $window.location.assign('#/tab/meetups');
            });
        };

    }]);