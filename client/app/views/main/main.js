'use strict';

angular.module('epaRfiApp')
  .config(function($stateProvider) {
    $stateProvider
    	.state('main', {
        url  : '/',
        views: {
          '': {
            controllerAs: 'MainCtrl',
            controller  : 'MainCtrl',
            templateUrl : 'app/views/main/main.html'
          },
          'title@main': {
            controllerAs: 'TitleCtrl',
            controller: 'TitleCtrl',
            templateUrl: 'app/views/title/title.html'
          },
          'individual@main': {
            controllerAs: 'IndividualCtrl',
            controller: 'IndividualCtrl',
            templateUrl: 'app/views/individual/individual.html'
          },
          'state@main': {
            controllerAs: 'StateCtrl',
            controller: 'StateCtrl',
            templateUrl: 'app/views/state/state.html'
          },
          'timeline@main': {
            controllerAs: 'TimelineCtrl',
            controller: 'TimelineCtrl',
            templateUrl: 'app/views/timeline/timeline.html'
          },
          'statevstate@main': {
            controllerAs: 'StatevstateCtrl',
            controller: 'StatevstateCtrl',
            templateUrl: 'app/views/statevstate/statevstate.html'
          },
          'nation@main': {
            controllerAs: 'NationCtrl',
            controller: 'NationCtrl',
            templateUrl: 'app/views/nation/nation.html'
          }
        }
      });
  });

