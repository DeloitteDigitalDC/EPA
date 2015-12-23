'use strict';

angular.module('epaRfiApp', [
  'epaRfiApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'ui.select',
  'djds4rce.angular-socialshare'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  })
  .run(function($FB, appConfig) {
    $FB.init(appConfig.SOCIAL_MEDIA.FACEBOOK.APP_ID);
  });

