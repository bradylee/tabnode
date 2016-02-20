angular.module('starter.controllers', ['ionic', 'starter.factories'])

// controller for the base state
.controller('AppCtrl', function($scope, $ionicModal, $timeout, TabInfo) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // global tab info for base state footer
  $scope.tabIsActive;
  $scope.tabInfo;

  $scope.openTab = function() {
    $scope.tabIsActive = true;
    $scope.tabInfo = TabInfo;
  }

  // Create the notifications modal that we will use later
  $ionicModal.fromTemplateUrl('templates/notifications.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.notificationModal = modal;
  });

  // Open the notifications modal
  $scope.notifications = function() {
    $scope.notificationModal.show();
  };

  // Close the notifications modal
  $scope.closeNotifications = function() {
    $scope.notificationModal.hide();
  }
})


// controller for logging in (or checking if user is logged in)

.controller('LoginCtrl', function($scope, $state) {
  $scope.login = function(username, password) {
    window.localStorage.setItem("username", username);
    window.localStorage.setItem("password", password);
  };

  $scope.isLoggedIn = function() {
    if(window.localStorage.getItem("username") !== undefined && window.localStorage.getItem("password") !== undefined) {
      return true;
    } else {
      return false;
    }
  };

  $scope.logout = function() {
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("password");
  };

  if ($scope.isLoggedIn()) {
    $state.go('app.home');
  }
})


// controller for the find friends state
.controller('FindFriendsCtrl', function($scope, Users, Friends) {
  $scope.users = Users;
  $scope.friends = Friends;

  $scope.isFriend = function(user) {
    return (indexByName($scope.friends, user) != -1);
  }

  $scope.addFriend = function(user) {
    if (indexByName($scope.friends, user) == -1) {
      $scope.friends.push(user);
      $scope.$apply();

      // TODO: UPDATE THE DB!!!!
    }
  }

})


// controller for the open a new tab state
.controller('OpenNewTabCtrl', function($scope, Friends) {
  $scope.friends = Friends;
  $scope.showList = false;
  $scope.inviteList = [];

  // function to add user's selections to the list of invites
  $scope.addToInviteList = function(friend) {
    if (indexByName($scope.inviteList, friend) == -1) {
      $scope.inviteList.push(friend);
    }
  }

  // call that ^ function when user leaves this state
  $scope.$on("$destroy", function(){
        createTab(inviteList);
        console.log('hey');
  })
})


// controller for viewing the current tab
.controller('CurrentTabCtrl', function($scope, TabInfo, TabMembers) {
  $scope.tabInfo = TabInfo;
  $scope.members = TabMembers;
})


// controller for editing the members of the current tab
.controller('EditTabMembersCtrl', function($scope, TabMembers, Friends) {
  $scope.members = TabMembers;
  $scope.friends = Friends;
  $scope.showList = false;

  $scope.removeFriendFromTab = function(friend) {
    var index = indexByName($scope.members, friend);
    if (index > -1) {
      $scope.members.splice(index, 1);

      // TODO: UPDATE THE DATABASE
    }
  }

  $scope.addFriendToTab = function(friend) {
    if (indexByName($scope.members, friend) == -1) {
      $scope.members.push(friend);
      // TODO: UPDATE THE DATABASE
    }
  }
})


// controller for claiming items on the final bill
.controller('CurrentBillCtrl', function($scope, TabInfo, TabMembers, Bill) {
  $scope.tabInfo = TabInfo;
  $scope.tabMembers = TabMembers;
  $scope.bill = Bill;

  $scope.getItemPrice = function(price, quantity) {
    var res = parseFloat(price) * parseFloat(quantity);
    return parseFloat(Math.round(res * 100) / 100).toFixed(2);
  }
});



// utility function for checking whether user is in array
// using that user's name field
function indexByName(array, friend) {
  for(var i = 0; i < array.length; i += 1) {
    if(array[i].name === friend.name) {
      return i;
    }
  }
  return -1;
}
