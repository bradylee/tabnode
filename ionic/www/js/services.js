angular.module('starter.services', [])
  .factory('TabService', function($http, BASE_URI) {
    return {
      getById: function(id) {
        return $http.get(BASE_URI + '/tab/' + id);
      }
    };
  })

  .factory('FriendService', function($auth, $http, BASE_URI) {
    return {
      query: function() {
        var username = window.localStorage.getItem('username', '');
        var token = $auth.getToken();
        return $http.get(BASE_URI + '/users/'+ username +'/friends', {
          'Authorization': token
        });
      }
    };
  })