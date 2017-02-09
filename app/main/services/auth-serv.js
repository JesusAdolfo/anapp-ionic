/**
 * Created by Adolfo on 2/6/2017.
 */
'use strict';

angular.module('main')
  .service('AuthService', function($rootScope, $q, $http, Config) {
    var LOCAL_TOKEN_KEY = 'yourTokenKey';
    var username = '';
    var isAuthenticated = false;
    var role = '';
    var authToken;
    var currentUser = {};


    function loadUserCredentials() {
      console.log("getting stored items locally...");
      var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
      if (token) {
        useCredentials(token);
      }
    }


    function storeUserCredentials(token) {
      console.log("storing locally...");
      window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
      useCredentials(token);
    }

    function useCredentials(token) {

      isAuthenticated = true;
      authToken = token;

      // Set the token as header for your requests!
      $http.defaults.headers.common['Authorization'] = 'Bearer ' + token;

    }

    function storeUserInfo(currentUser) {
      $rootScope.currentUser = currentUser;
      username = currentUser.name;

      if (currentUser.role == 'admin') {
        role = Config.ENV.ADMIN
      }
      if (currentUser.role == 'user') {
        role = Config.ENV.PUBLIC
      }
    }

    function destroyUserCredentials() {
      authToken = undefined;
      username = '';
      isAuthenticated = false;
      $http.defaults.headers.common['Authorization'] = undefined;
      window.localStorage.removeItem(LOCAL_TOKEN_KEY);
      delete $rootScope.currentUser;
    }

    var login = function(name, pw) {
      console.log("logging in now to ", Config.ENV.DEV_SERVER_URL + '/auth/local');
      return $q(function(resolve, reject) {

        $http.post(Config.ENV.DEV_SERVER_URL + '/auth/local', {email: name, password: pw})
          .then
          (function (res) {
            console.log("res =", res);
            storeUserCredentials(res.data.token);
          })
          .then(function () {
            // console.log("auth-->", authToken);
            $http.get(Config.ENV.DEV_SERVER_URL + '/api/users/me')
              .then(function (res) {
                console.log("user response", res);
                var currentUser = res.data;
                storeUserInfo(currentUser);
                resolve("User logged in");
              })


              })
          .catch
          (function (err) {
            reject('Login Failed.');

          });


        // //login
        // if ((name == 'admin' && pw == '1') || (name == 'user' && pw == '1')) {
        //   // Make a request and receive your auth token from your server
        //   //pasarle aqui el token
        //   storeUserCredentials(name + '.yourServerToken');
        //   resolve('Login success.');
        // } else {
        //   reject('Login Failed.');
        // }
      });
    };

    var logout = function() {
      destroyUserCredentials();
    };

    var isAuthorized = function(authorizedRoles) {
      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }
      return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
    };

    loadUserCredentials();

    return {
      login: login,
      logout: logout,
      isAuthorized: isAuthorized,
      isAuthenticated: function() {return isAuthenticated;},
      username: function() {return username;},
      role: function() {return role;}
    };
  })

  .factory('AuthInterceptor', function ($rootScope, $q, Config) {
    return {
      responseError: function (response) {
        $rootScope.$broadcast({
          401: Config.ENV.NOT_AUTHENTICATED,
          403: Config.ENV.NOT_AUTHORIZED
        }[response.status], response);
        return $q.reject(response);
      }
    };
  })

  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  });
