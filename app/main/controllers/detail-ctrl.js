/**
 * Created by Adolfo on 2/6/2017.
 */
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
  .controller('DetailCtrl', function ($log, $http, $timeout, Main, Config, $stateParams, $cordovaDevice) {

    this.getSingleThingUrl = Config.ENV.DEV_SERVER_URL + '/api/things/' + $stateParams.id;
    $log.log(this.getSingleThingUrl);
    this.mainUrl = Config.ENV.DEV_SERVER_URL;
    $log.log('Event controller:', this);

    $http.get(this.getSingleThingUrl)
      .then(function (response) {
        $log.log(response);
        this.thing = response.data;
      }.bind(this))
      .then($timeout(function () {
        // this.proxyState = 'ready';
      }.bind(this), 6000));


  });
