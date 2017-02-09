/**
 * Created by Adolfo on 2/6/2017.
 */

'use strict';
angular.module('main')
  .controller('LoginCtrl', function ($rootScope, $scope, $state, $ionicPopup, $ionicHistory, $ionicLoading, AuthService, $log, $http, $timeout, Main, Config, $cordovaDevice) {

    $scope.data = {};

    $scope.setCurrentUsername = function(name) {
      $scope.username = name;
    };

    $scope.login = function(data) {

      $ionicLoading.show({
        template: 'Entrando....'
      });



      AuthService.login(data.username, data.password).then(function(authenticated) {

        $scope.setCurrentUsername(data.username);

        $timeout(function () {
          $ionicLoading.hide();
          $ionicHistory.clearCache();
          $ionicHistory.clearHistory();
          $ionicHistory.nextViewOptions({
            disableBack: true,
            historyRoot: true
          });
          $state.go('main.list', {}, {reload: true});
        }, 30);

        $rootScope.$broadcast('user:logged', data.username);

      }, function(err) {
        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({
          title: 'Usuario incorrecto!',
          template: 'Revisa tus credenciales'
        });
      });
    };


  });
