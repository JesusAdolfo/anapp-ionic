'use strict';
angular.module('anappIonic', [
  // load your modules here
  'main', // starting with the main module

])
  .run(function ($rootScope, $state, AuthService, Config, $log) {
    $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {

      if ('data' in next && 'authorizedRoles' in next.data) {
        var authorizedRoles = next.data.authorizedRoles;
        if (!AuthService.isAuthorized(authorizedRoles)) {
          event.preventDefault();
          $state.go($state.current, {}, {reload: true});
          $rootScope.$broadcast(Config.ENV.NOT_AUTHORIZED);
        }
      }

      // if (AuthService.isAuthenticated()) {
      //   if (next.name !== 'login') {
      //     $log.log("--");
      //     $state.go('main.login');
      //   }
      // }
    });
  });
