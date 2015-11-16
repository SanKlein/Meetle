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

    .state('groups', {
        cache: false,
        url: '/groups',
        templateUrl: 'templates/groups.html',
        controller: 'GroupCtrl'
    })

    .state('subGroups', {
      cache: false,
      url: '/subGroups',
      templateUrl: 'templates/subGroups.html',
      controller: 'SubGroupCtrl'
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
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

});
