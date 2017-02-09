/**
 * Created by Adolfo on 2/3/2017.
 */
// this.$http.get('/api/things')
//   .then(response => {
//     console.log(response);
//     this.items = response.data;
//     this.socket.syncUpdates('thing', this.items);
//   });

'use strict';
angular.module('main')
  .controller('MainCtrl', function ($scope, $state, $ionicPopup, AuthService, $log, $http, $timeout, Main, Config, $cordovaDevice) {

    this.things = {};

    this.getThingsUrl = Config.ENV.DEV_SERVER_URL + '/api/things';
    this.mainUrl = Config.ENV.DEV_SERVER_URL;
    $log.log('Event controller:', this);

      $http.get(this.getThingsUrl)
        .then(function (response) {
          $log.log(response);
          this.things = response.data;
        }.bind(this))
        .then($timeout(function () {
          // this.proxyState = 'ready';
        }.bind(this), 6000));



    $scope.username = AuthService.username();

    $scope.$on(Config.ENV.NOT_AUTHORIZED, function(event) {
      var alertPopup = $ionicPopup.alert({
        title: 'Unauthorized!',
        template: 'You are not allowed to access this resource.'
      });
    });

    $scope.$on( Config.ENV.NOT_AUTHENTICATED, function(event) {
      AuthService.logout();
      $state.go('main.login');
      var alertPopup = $ionicPopup.alert({
        title: 'Tu sesion ha expirado!',
        template: 'Debes entrar de nuevo.'
      });
    });

    $scope.setCurrentUsername = function(name) {
      $scope.username = name;
    };


  });
