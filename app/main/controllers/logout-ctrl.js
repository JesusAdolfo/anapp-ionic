/**
 * Created by Adolfo on 2/7/2017.
 */
'use strict';
angular.module('main')
  .controller('LogoutCtrl', function ($rootScope, $scope, $state, $ionicPopup, $ionicHistory, $ionicLoading, AuthService, $log, $http, $timeout, Main, Config, $cordovaDevice) {

    (function () {
      $ionicLoading.show({
        template: 'Saliendo...'
      });

        console.log("logout...");
        AuthService.logout();


        $timeout(function () {
          $ionicLoading.hide();
          // $ionicHistory.clearCache();
          // $ionicHistory.clearHistory();
          $ionicHistory.nextViewOptions({
            disableBack: true,
            historyRoot: true
          });
          $state.go('main.list');
        }, 30);

      $rootScope.$broadcast('user:loggedout', "");
    })();

    $scope.btnLogout = function(data) {
      $timeout(function () {
        $ionicLoading.hide();
        // $ionicHistory.clearCache();
        // $ionicHistory.clearHistory();
        $ionicHistory.nextViewOptions({
          disableBack: true,
          historyRoot: true
        });
        $state.go('main.list');
      }, 30);

      $rootScope.$broadcast('user:loggedout', "");
    };





  });
