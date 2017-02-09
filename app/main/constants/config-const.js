'use strict';
angular.module('main')
.constant('Config', {

  // gulp environment: injects environment vars
  ENV: {
    /*inject-env*/
    'DEV_SERVER_URL': 'http://localhost:9000',
    'SERVER_URL': 'https://DEVSERVER/api',
    'SOME_OTHER_URL': '/postman-proxy',
    'NOT_AUTHENTICATED': 'auth-not-authenticated',
    'NOT_AUTHORIZED': 'auth-not-authorized',
    'ADMIN': 'admin_role',
    'PUBLIC': 'public_role'
    /*endinject*/
  },

  // gulp build-vars: injects build vars
  BUILD: {
    /*inject-build*/
    /*endinject*/
  }

});
