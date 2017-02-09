'use strict';
angular.module('main')
.controller('MenuCtrl', function ($scope, $state, $stateParams, $http, $ionicPopup, AuthService, $log, Config) {

  $log.log('Hello from your Controller: MenuCtrl in module main:. This is your controller:', this);
  $scope.username = "";
  $scope.isAdmin = false;
  $scope.isLoggedIn = false;

  //evento que se dispara cuando algun user se logea
  $scope.$on('user:logged', function(event,data) {
    $scope.isLoggedIn = true;
    $scope.username = AuthService.username();

    //si es admin
    if(AuthService.isAuthorized()) { $scope.isAdmin = true; } else { $scope.isAdmin = false; }
  });

  //evento que se dispara cuando algun user se DESlogea
  $scope.$on('user:loggedout', function(event,data) {
    $scope.isLoggedIn = false;
    $scope.username = "";

    $scope.isAdmin = false;
  });

    // modificar el menu dependiendo si esta auth o no
    //esta autenticado, tons se puede salir
    if (AuthService.isAuthenticated()) {
      $scope.isLoggedIn = true;
      console.log("si esta auth", AuthService.isAuthenticated());
      $scope.username = AuthService.username();
      console.log(AuthService.username());

      //si es admin
      if(AuthService.isAuthorized()) { $scope.isAdmin = true; }
    }else{
      //de lo contrario no mostrar ese boton
      $scope.isLoggedIn = false;
      console.log("no esta auth", AuthService.isAuthenticated());
    }

});
