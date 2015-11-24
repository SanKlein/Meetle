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

    .controller('GroupCtrl', ['$rootScope', '$scope', 'GroupFactory', '$window', '$ionicListDelegate', '$localstorage', 'UserFactory', function($rootScope, $scope, GroupFactory, $window, $ionicListDelegate, $localstorage, UserFactory) {

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

    .controller('SubGroupCtrl', ['$rootScope', '$scope', 'SubGroupFactory', '$window', '$ionicListDelegate', '$localstorage', function($rootScope, $scope, SubGroupFactory, $window, $ionicListDelegate, $localstorage) {

        $scope.user = $localstorage.getObject('currentUser');
        if (!$scope.user.username) $window.location.assign('#/login');

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

        $scope.remove = function(subgroup, index) {
            SubGroupFactory.deleteSubGroup(subgroup).then(function(subgroup) {
                $scope.subgroups.splice(index, 1);
                $ionicListDelegate.closeOptionButtons();
            });
        };
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

        //$scope.chatroom = {
        //    chats: currentSubGroup.chats,
        //    text: ''
        //};

        // upon creation, the chat window will cycle through this and display all the messages
        $scope.chats = currentSubGroup.chats;

        $scope.messageText = "";

        // Tries to connect to the server URl. Not sure if this address/port is correct. I got '3000' from the server.js file
        // If successful, the socket variable below will provide us with a TCP connection to our server
        var socket = io.connect('http://127.0.0.1:3000');

        // when addChat is called, emit an event called 'send message'
        // with the enclosed JSON object to the server,
        // where it will be stored in the database
        $scope.addChat = function() {
            socket.emit('store message', {
                username: $scope.user.username,
                message: messageText,
                room: $rootscope.currentSubGroup
            });
            messageText = "";
        }

        // when the server emits an event called 'new message', add it to our
        // chat array. Then force the part of our HTML that renders that
        // to run again, this time with the modified array
        socket.on('distribute message', function(data) {
            $rootScope.$apply(function () {
                $scope.chats.append(data);
            });
        });

        // todo
        // $scope.likeChat = function() {
        //
        // }
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