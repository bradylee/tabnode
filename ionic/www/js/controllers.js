angular.module('starter.controllers', [])
  .controller('AppCtrl', function($rootScope, $scope, $ionicModal, $timeout, $auth, $state) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      if  (toState.name !== 'login' && !$auth.isAuthenticated()){
        $state.go('login');
      }
    });

    $scope.logout = function() {
      $auth.logout().then(function() {
        $state.go('login');
      });
    };
  })

  .controller('LoginCtrl', function($scope, $ionicPopup, $auth, $state) {

    if ($auth.isAuthenticated())
      $state.go('app.home');

    $scope.login = function(username, password) {
      $auth.login({
        username: username,
        password: password
      }).then(function() {
          $ionicPopup.alert({
            title: 'Success',
            content: 'You have successfully logged in!'
          })
          $state.go('app.home');
        })
        .catch(function(response) {
          $ionicPopup.alert({
            title: 'Error',
            content: response.data ? response.data || response.data.message : response
          })

        });
    };

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function() {
          $ionicPopup.alert({
            title: 'Success',
            content: 'You have successfully logged in!'
          })
        })
        .catch(function(response) {
          $ionicPopup.alert({
            title: 'Error',
            content: response.data ? response.data || response.data.message : response
          })

        });
    };


    $scope.logout = function() {
      $auth.logout();
    };

    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
  })

  // controller for the open a new tab state
  .controller('TabCtrl', function($scope, TabService, FriendService) {
    $scope.friends = FriendService.query();
    $scope.showList = false;
    $scope.inviteList = [];

    // function to add user's selections to the list of invites
    $scope.addFriendToInviteList = function(friend) {
      inviteList.push(friend);
    };

    $scope.createTab = function() {

    };
  })


  