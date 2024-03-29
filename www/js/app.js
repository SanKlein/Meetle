// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('meetle', ['ionic', 'meetle.controllers', 'meetle.services'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleLightContent();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    .state('login', {
        cache: false,
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
    })

    .state('signup', {
        cache: false,
        url: '/signup',
        templateUrl: 'templates/signup.html',
        controller: 'SignupCtrl'
    })

    .state('profile', {
        cache: false,
        url: '/profile',
        templateUrl: 'templates/profile.html',
        controller: 'ProfileCtrl'
    })

    .state('groups', {
        cache: false,
        url: '/groups',
        templateUrl: 'templates/groups.html',
        controller: 'GroupCtrl'
    })

    .state('newGroup', {
        cache: false,
        url: '/group/new',
        templateUrl: 'templates/newGroup.html',
        controller: 'NewGroupCtrl'
    })

    .state('groupSettings', {
        cache: false,
        url: '/groupSettings',
        templateUrl: 'templates/groupSettings.html',
        controller: 'GroupSettingsCtrl'
    })

    .state('addGroupMembers', {
        cache: false,
        url: '/group/addMembers',
        templateUrl: 'templates/AddGroupMembers.html',
        controller: 'AddGroupMembersCtrl'
    })

    .state('removeGroupMembers', {
        cache: false,
        url: '/group/removeMembers',
        templateUrl: 'templates/RemoveGroupMembers.html',
        controller: 'RemoveGroupMembersCtrl'
    })

    .state('editGroupName', {
        cache: false,
        url: '/editGroupName',
        templateUrl: 'templates/editGroupName.html',
        controller: 'GroupNameCtrl'
    })

    .state('subGroups', {
      cache: false,
      url: '/subGroups',
      templateUrl: 'templates/subGroups.html',
      controller: 'SubGroupCtrl'
    })

    .state('newSubGroup', {
        cache: false,
        url: '/subgroup/new',
        templateUrl: 'templates/newSubGroup.html',
        controller: 'NewSubGroupCtrl'
    })

    .state('subGroupSettings', {
        cache: false,
        url: '/subGroupSettings',
        templateUrl: 'templates/subGroupSettings.html',
        controller: 'SubGroupSettingsCtrl'
    })

    .state('addSubGroupMembers', {
        cache: false,
        url: '/subGroup/addMembers',
        templateUrl: 'templates/AddSubGroupMembers.html',
        controller: 'AddSubGroupMembersCtrl'
    })

    .state('removeSubGroupMembers', {
        cache: false,
        url: '/subGroup/removeMembers',
        templateUrl: 'templates/RemoveSubGroupMembers.html',
        controller: 'RemoveSubGroupMembersCtrl'
    })

    .state('editSubGroupName', {
        cache: false,
        url: '/editSubGroupName',
        templateUrl: 'templates/editSubGroupName.html',
        controller: 'SubGroupNameCtrl'
    })

    // setup an abstract state for the tabs directive
        .state('tab', {
          cache: false,
          url: '/tab',
          abstract: true,
          templateUrl: 'templates/tabs.html'
    })

    // Each tab has its own nav history stack:

    .state('tab.chat', {
        cache: false,
        url: '/chat',
        views: {
            'tab-chat': {
                templateUrl: 'templates/tab-chat.html',
                controller: 'ChatCtrl'
            }
        }
    })

    .state('tab.meetups', {
        cache: false,
        url: '/meetups',
        views: {
            'tab-meetups': {
                templateUrl: 'templates/tab-meetups.html',
                controller: 'MeetupsCtrl'
            }
        }
    })

    .state('newMeetup', {
        cache: false,
        url: '/newMeetup',
        templateUrl: 'templates/newMeetup.html',
        controller: 'NewMeetupCtrl'
    })

    .state('editMeetup', {
        cache: false,
        url: '/editMeetup',
        templateUrl: 'templates/editMeetup.html',
        controller: 'EditMeetupCtrl'
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

});
