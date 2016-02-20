// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.factories'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  // base menu state
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  // login state
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  // home state
  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html'
      }
    }
  })

  // state for connecting your bank account
  .state('app.link_bank_account', {
    url: '/link_bank_account',
    views: {
      'menuContent': {
        templateUrl: 'templates/link_bank_account.html'
      }
    }
  })

  // state for managing your account settings
  .state('app.manage_account', {
    url: '/manage_account',
    views: {
      'menuContent': {
        templateUrl: 'templates/manage_account.html'
      }
    }
  })

  // state to see all of your bills
  .state('app.bill_history', {
    url: '/bill_history',
    views: {
      'menuContent': {
        templateUrl: 'templates/bill_history.html'
      }
    }
  })

  // state to search for friends
  .state('app.find_friends', {
    url: '/find_friends',
    views: {
      'menuContent': {
        templateUrl: 'templates/find_friends.html',
        controller: 'FindFriendsCtrl'
      }
    }
  })

  // state to open a new tab
  .state('app.open_tab', {
    url: '/open_tab',
    views: {
      'menuContent': {
        templateUrl: 'templates/open_tab.html',
        controller: 'OpenNewTabCtrl'
      }
    }
  })

  // state to view the current tab:
  //  - restaurant, owner, members
  .state('app.current_tab', {
    url: '/current_tab',
    views: {
      'menuContent': {
        templateUrl: 'templates/current_tab.html',
        controller: 'CurrentTabCtrl'
      }
    }
  })

  // state to edit the members of the current tab
  .state('app.edit_tab_members', {
    url: '/edit_tab_members',
    views: {
      'menuContent': {
        templateUrl: 'templates/edit_tab_members.html',
        controller: 'EditTabMembersCtrl'
      }
    }
  })

  // state to view an invite to a tab
  .state('app.view_invite', {
    url: '/view_invite',
    views: {
      'menuContent': {
        templateUrl: 'templates/view_invite.html'
      }
    }
  })

  // state to find an open tab to join
  .state('app.view_available_tabs', {
    url: '/view_available_tabs',
    views: {
      'menuContent': {
        templateUrl: 'templates/view_available_tabs.html'
      }
    }
  })

  // state to view the current bill:
  //  - dishes and live-updating assignments
  //  - tap a dish to assign yourself, tap again to remove
  .state('app.current_bill', {
    url: '/current_bill',
    views: {
      'menuContent': {
        templateUrl: 'templates/current_bill.html',
        controller: 'CurrentBillCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/login');
});
