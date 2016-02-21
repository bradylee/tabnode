angular.module('starter', ['ionic', 'satellizer', 'starter.controllers', 'starter.services'])
  .constant('BASE_URI', 'http://localhost:3000')

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      })
      .state('app', {
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })
      // home state
      .state('app.home', {
        url: '/home',
        views: {
          menuContent: {
            templateUrl: 'templates/home.html'
            //controller: 'HomeCtrl'
          }
        }
      })
      // state to open a new tab
      .state('app.open_tab', {
        url: '/open_tab',
        views: {
          menuContent: {
            templateUrl: 'templates/open_tab.html',
            controller: 'TabCtrl'
          }
        }
      })

    $urlRouterProvider.otherwise('/home');
  })

  .config(function($authProvider) {
    var commonConfig = {
      popupOptions: {
        location: 'no',
        toolbar: 'no',
        width: window.screen.width,
        height: window.screen.height
      }
    };

    if (ionic.Platform.isIOS() || ionic.Platform.isAndroid()) {
      $authProvider.cordova = true;
      commonConfig.redirectUri = 'http://localhost/';
    }

    $authProvider.facebook(angular.extend({}, commonConfig, {
      clientId: '603122136500203',
      url: 'http://localhost:3000/auth/facebook'
    }));

    $authProvider.twitter(angular.extend({}, commonConfig, {
      url: 'http://localhost:3000/auth/twitter'
    }));

    $authProvider.google(angular.extend({}, commonConfig, {
      clientId: '631036554609-v5hm2amv4pvico3asfi97f54sc51ji4o.apps.googleusercontent.com',
      url: 'http://localhost:3000/auth/google'
    }));
  })
  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  });
