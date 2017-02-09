'use strict';
angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router',
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider, $urlRouterProvider, Config) {

  // ROUTING with ui.router
  $urlRouterProvider.otherwise('/main/list');
  $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    .state('main', {
      url: '/main',
      abstract: true,
      templateUrl: 'main/templates/menu.html',
      controller: 'MenuCtrl as menu'
    })
      .state('main.list', {
        url: '/list',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/list.html',
            controller: 'MainCtrl as ctrl'
          }
        }
      })
    .state('main.login', {
      url: '/login',
      views: {
        'pageContent': {
          templateUrl: 'main/templates/login.html',
          controller: 'LoginCtrl as ctrl'
        }
      }
    })
    .state('main.logout', {
      url: '/logout',
      views: {
        'pageContent': {
          templateUrl: 'main/templates/logout.html',
          controller: 'LogoutCtrl as ctrl'
        }
      }
    })
      .state('main.listDetail', {
        url: '/list/detail/:id',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/list-detail.html',
            controller: 'DetailCtrl as ctrl'
          }
        }
      })
    .state('main.new', {
      url: '/new',
      views: {
        'pageContent': {
          templateUrl: 'main/templates/nueva-propuesta.html',
          controller: 'NewProposal as ctrl'
        }
      },
      data: {
        authorizedRoles: [Config.ENV.PUBLIC,  Config.ENV.ADMIN]
      }
    })
      .state('main.debug', {
        url: '/debug',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/debug.html',
            controller: 'DebugCtrl as ctrl'
          }
        },
        data: {
          authorizedRoles: [Config.ENV.ADMIN]
        }
      });
});
