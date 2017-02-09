/**
 * Created by Adolfo on 2/9/2017.
 */
/**
 * Created by Adolfo on 2/7/2017.
 */
'use strict';
angular.module('main')
  .controller('NewProposal', function ($rootScope, $scope, $state, $ionicPopup, $ionicHistory, $ionicLoading, AuthService, $log, $http, $timeout, Main, Config, $cordovaDevice) {

    $log.log("new proposal controller");


    //   $timeout(function () {
    //     $ionicLoading.hide();
    //     // $ionicHistory.clearCache();
    //     // $ionicHistory.clearHistory();
    //     $ionicHistory.nextViewOptions({
    //       disableBack: true,
    //       historyRoot: true
    //     });
    //     $state.go('main.list');
    //   }, 30);
    //
    //   $rootScope.$broadcast('user:loggedout', "");
    // })();






  });
