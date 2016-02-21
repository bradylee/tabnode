angular.module('starter.controllers', [])
  .controller('AppCtrl', function($rootScope, $scope, $ionicModal, $timeout, $auth, $state) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      if  (toState.name !== 'login' && !$auth.isAuthenticated()){
        $state.go('login');
      }
    });

    $scope.logout = function() {
      window.localStorage.setItem('username', undefined);
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
          window.localStorage.setItem('username', username);
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
      window.localStorage.setItem('username', undefined);
      $auth.logout();
    };

    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
  })

  // controller for the open a new tab state
  .controller('TabCtrl', function($scope, TabService, FriendService) {
    FriendService.query().then(function(res) {
      $scope.friends = res.data;
      console.log($scope.friends);
    });

    $scope.inviteList = [];

    // function to add user's selections to the list of invites
    $scope.addFriendToInviteList = function(friend) {
      var index = $scope.friends.indexOf(friend);
      if (index >= 0)
        $scope.friends.splice(index, 1);

      $scope.inviteList.push(friend);
    };

    $scope.createTab = function() {

    };
  })


  