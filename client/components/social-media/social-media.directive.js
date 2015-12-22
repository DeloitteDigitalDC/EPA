'use strict';

angular.module('epaRfiApp')
  .directive('socialMedia', function (appConfig) {
    return {
      templateUrl: 'components/social-media/social-media.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      	scope.socialMedia = appConfig.SOCIAL_MEDIA;
      }
    };
  });
