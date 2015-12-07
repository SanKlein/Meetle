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

    .controller('GroupCtrl', ['$rootScope', '$scope', 'GroupFactory', '$window', '$ionicListDelegate', '$localstorage', function($rootScope, $scope, GroupFactory, $window, $ionicListDelegate, $localstorage) {

        $scope.user = $localstorage.getObject('currentUser');
        if (!$scope.user.username) $window.location.assign('#/login');

        $localstorage.set('currentGroup', '');
        $localstorage.set('currentSubGroup', '');
        $localstorage.set('currentMeetup', '');

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
            group.user = $localstorage.getObject('currentUser')._id;
            GroupFactory.leaveCurrentGroup(group).then(function(msg) {
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

    .controller('GroupSettingsCtrl', ['$rootScope', '$scope', 'GroupFactory', '$window', '$ionicListDelegate', '$localstorage', function($rootScope, $scope, GroupFactory, $window, $ionicListDelegate, $localstorage) {

        $rootScope.currentGroup = $localstorage.getObject('currentGroup');
        $rootScope.currentGroup.user = $localstorage.getObject('currentUser')._id;
        $scope.group = $rootScope.currentGroup;

        $scope.leaveGroup = function() {
            GroupFactory.leaveCurrentGroup($scope.group).then(function(msg) {
                $window.location.assign('#/groups');
            });
        };
    }])

    .controller('AddGroupMembersCtrl', ['$rootScope', '$scope', 'GroupFactory', '$window', '$ionicListDelegate', '$localstorage', 'UserFactory', 'SubGroupFactory', function($rootScope, $scope, GroupFactory, $window, $ionicListDelegate, $localstorage, UserFactory, SubGroupFactory) {

        $scope.members = {
            users: [],
            search: ''
        };

        $rootScope.currentUser = $localstorage.getObject('currentUser');

        // load all users
        UserFactory.loadUsers().then(function(users) {
            if (users) {
                for (var i = 0; i < users.length; i++) {
                    (function(index) {
                        // check if user is current user
                        if (users[index]._id == $rootScope.currentUser._id) {
                            // do not show current user in the list
                        } else {
                            users[index].group = $localstorage.getObject('currentGroup')._id;
                            // check if current user has been added
                            UserFactory.checkUserGroup(users[index]).then(function(result) {
                                if (result) {
                                    users[index].status = 'remove';
                                    $scope.members.users.push(users[index]);
                                } else {
                                    users[index].status = 'add';
                                    $scope.members.users.push(users[index]);
                                }
                            });
                        }
                    })(i);
                }
            }
        });

        $scope.add = function(user, index) {
            UserFactory.addUserToGroup(user).then(function(result) {
                $scope.members.users[index].status = 'remove';
            });
        };
    }])

    .controller('RemoveGroupMembersCtrl', ['$rootScope', '$scope', 'GroupFactory', '$window', '$ionicListDelegate', '$localstorage', 'UserFactory', 'SubGroupFactory', function($rootScope, $scope, GroupFactory, $window, $ionicListDelegate, $localstorage, UserFactory, SubGroupFactory) {

        $scope.members = {
            users: [],
            search: ''
        };

        $rootScope.currentUser = $localstorage.getObject('currentUser');

        // load all users in group
        UserFactory.loadGroupUsers($localstorage.getObject('currentGroup')).then(function(users) {
            var users = users[0].members;
            if (users) {
                for (var i = 0; i < users.length; i++) {
                    (function(index) {
                        // check if user is current user
                        if (users[index] == $rootScope.currentUser._id) {
                            // do not show current user in the list
                        } else {
                            var user = {
                                id: users[index]
                            };
                            // load user information
                            UserFactory.loadUser(user).then(function(user) {
                                $scope.members.users.push(user[0]);
                            });
                        }
                    })(i);
                }
            }
        });

        $scope.remove = function(user, index) {
            user.group = $localstorage.getObject('currentGroup')._id;
            UserFactory.removeUserFromGroup(user).then(function(result) {
                $scope.members.users.splice(index, 1);
            });
        };
    }])

    .controller('GroupNameCtrl', ['$rootScope', '$scope', 'GroupFactory', '$window', '$ionicListDelegate', '$localstorage', function($rootScope, $scope, GroupFactory, $window, $ionicListDelegate, $localstorage) {

        $rootScope.currentGroup = $localstorage.getObject('currentGroup');
        $rootScope.currentGroup.user = $localstorage.getObject('currentUser')._id;
        $scope.group = $localstorage.getObject('currentGroup');

        $scope.editGroupName = function() {
            GroupFactory.changeGroupName($scope.group).then(function(msg) {
                $localstorage.setObject('currentGroup', $scope.group);
                $window.location.assign('#/groupSettings');
            });
        };

    }])

    .controller('SubGroupCtrl', ['$rootScope', '$scope', 'SubGroupFactory', '$window', '$ionicListDelegate', '$localstorage', function($rootScope, $scope, SubGroupFactory, $window, $ionicListDelegate, $localstorage) {

        $scope.user = $localstorage.getObject('currentUser');
        if (!$scope.user.username) $window.location.assign('#/login');

        $localstorage.set('currentSubGroup', '');
        $localstorage.set('currentMeetup', '');

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

        $scope.leaveSubGroup = function(subgroup, index) {
            subgroup.user = $localstorage.getObject('currentUser')._id;
            SubGroupFactory.leaveCurrentSubGroup(subgroup).then(function(msg) {
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

    .controller('SubGroupSettingsCtrl', ['$rootScope', '$scope', 'SubGroupFactory', '$window', '$ionicListDelegate', '$localstorage', function($rootScope, $scope, SubGroupFactory, $window, $ionicListDelegate, $localstorage) {

        $rootScope.currentSubGroup = $localstorage.getObject('currentSubGroup');
        $rootScope.currentSubGroup.user = $localstorage.getObject('currentUser')._id;
        $scope.subGroup = $rootScope.currentSubGroup;

        $scope.leaveSubGroup = function() {
            SubGroupFactory.leaveCurrentSubGroup($scope.subGroup).then(function(msg) {
                $window.location.assign('#/subGroups');
            });
        }
    }])

    .controller('AddSubGroupMembersCtrl', ['$rootScope', '$scope', 'GroupFactory', '$window', '$ionicListDelegate', '$localstorage', 'UserFactory', 'SubGroupFactory', function($rootScope, $scope, GroupFactory, $window, $ionicListDelegate, $localstorage, UserFactory, SubGroupFactory) {

        $scope.members = {
            users: [],
            search: ''
        };

        $rootScope.currentUser = $localstorage.getObject('currentUser');

        // load all users
        UserFactory.loadGroupUsers($localstorage.getObject('currentGroup')).then(function(users) {
            var users = users[0].members;
            if (users) {
                for (var i = 0; i < users.length; i++) {
                    (function(index) {
                        // check if user is current user
                        if (users[index] == $rootScope.currentUser._id) {
                            // do not show current user in the list
                        } else {
                            var user = {
                                id: users[index]
                            };
                            // load user information
                            UserFactory.loadUser(user).then(function(user) {
                                user[0].subgroup = $localstorage.getObject('currentSubGroup')._id;
                                UserFactory.checkUserSubgroup(user[0]).then(function(result) {
                                    if (result) {
                                        user[0].status = 'remove';
                                        $scope.members.users.push(user[0]);
                                    } else {
                                        user[0].status = 'add';
                                        $scope.members.users.push(user[0]);
                                    }
                                });
                            });
                        }
                    })(i);
                }
            }
        });

        $scope.add = function(user, index) {
            UserFactory.addUserToSubgroup(user).then(function(result) {
                $scope.members.users[index].status = 'remove';
            });
        };
    }])

    .controller('RemoveSubGroupMembersCtrl', ['$rootScope', '$scope', 'GroupFactory', '$window', '$ionicListDelegate', '$localstorage', 'UserFactory', 'SubGroupFactory', function($rootScope, $scope, GroupFactory, $window, $ionicListDelegate, $localstorage, UserFactory, SubGroupFactory) {

        $scope.members = {
            users: [],
            search: ''
        };

        $rootScope.currentUser = $localstorage.getObject('currentUser');

        // load all users in group
        UserFactory.loadSubgroupUsers($localstorage.getObject('currentSubGroup')).then(function(users) {
            var users = users[0].members;
            if (users) {
                for (var i = 0; i < users.length; i++) {
                    (function(index) {
                        // check if user is current user
                        if (users[index] == $rootScope.currentUser._id) {
                            // do not show current user in the list
                        } else {
                            var user = {
                                id: users[index]
                            };
                            // load user information
                            UserFactory.loadUser(user).then(function(user) {
                                $scope.members.users.push(user[0]);
                            });
                        }
                    })(i);
                }
            }
        });

        $scope.remove = function(user, index) {
            user.subgroup = $localstorage.getObject('currentSubGroup')._id;
            UserFactory.removeUserFromSubgroup(user).then(function(result) {
                $scope.members.users.splice(index, 1);
            });
        };
    }])

    .controller('SubGroupNameCtrl', ['$rootScope', '$scope', 'SubGroupFactory', '$window', '$ionicListDelegate', '$localstorage', function($rootScope, $scope, SubGroupFactory, $window, $ionicListDelegate, $localstorage) {

        $rootScope.currentSubGroup = $localstorage.getObject('currentSubGroup');
        $rootScope.currentSubGroup.user = $localstorage.getObject('currentUser')._id;
        $scope.subgroup = $localstorage.getObject('currentSubGroup');

        $scope.editSubGroupName = function() {
            SubGroupFactory.changeSubGroupName($scope.subgroup).then(function(msg) {
                $localstorage.setObject('currentSubGroup', $scope.subgroup);
                $window.location.assign('#/subGroupSettings');
            });
        };

    }])

    .controller('ChatCtrl', ['$rootScope', '$scope', 'ChatFactory', '$window', '$localstorage', '$interval', function($rootScope, $scope, ChatFactory, $window, $localstorage, $interval) {

        $scope.chatroom = {
            chats: [],
            text: '',
            user_username: $localstorage.getObject('currentUser').username,
            user_id: $localstorage.getObject('currentUser')._id,
            subgroup: $localstorage.getObject('currentSubGroup')._id,
            subgroup_title: $localstorage.getObject('currentSubGroup').title
        };

        $scope.user = $localstorage.getObject('currentUser');
        if (!$scope.user.username) $window.location.assign('#/login');

        //$interval(function() {
            //$scope.$apply(function () {
                ChatFactory.getChat($scope.chatroom).then(function(chats) {
                    $scope.chatroom.chats = chats;
                });
            //});
        //}, 1000);

        $scope.addChat = function() {
            var newChat = {
                text: $scope.chatroom.text,
                user_id: $scope.chatroom.user_id,
                user_username: $scope.chatroom.user_username,
                subgroup: $scope.chatroom.subgroup
            };

            ChatFactory.create(newChat).then(function(chat) {
                if ($scope.chatroom.chats) {
                    $scope.chatroom.chats.push(chat);
                } else {
                    $scope.chatroom.chats = [chat];
                }
            });

            $scope.chatroom.text = '';
        };

        $scope.likeChat = function(chat, index) {
            ChatFactory.likeChat(chat).then(function(newChat) {
                newChat.liked = !newChat.liked;
                $scope.chatroom.chats[index] = newChat;
            });
        };
    }])

    .controller('MeetupsCtrl', ['$rootScope', '$scope', 'MeetupFactory', '$window', '$localstorage', '$ionicListDelegate', function($rootScope, $scope, MeetupFactory, $window, $localstorage, $ionicListDelegate) {

        $scope.user = $localstorage.getObject('currentUser');
        if (!$scope.user.username) $window.location.assign('#/login');

        $localstorage.set('currentMeetup', '');

        $rootScope.currentSubGroup = $localstorage.getObject('currentSubGroup');

        $scope.meetups = [];

        var subgroup = $localstorage.getObject('currentSubGroup');
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

        $scope.remove = function() {
            MeetupFactory.deleteMeetup($scope.meetup).then(function(meetup) {
                $localstorage.setObject('currentMeetup', '');
                $window.location.assign('#/tab/meetups');
            });
        };

    }]);