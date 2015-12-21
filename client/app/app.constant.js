(function(angular, undefined) {
'use strict';

angular.module('epaRfiApp.constants', [])

.constant('appConfig', {
	userRoles:['guest','user','admin'],
	yearTimeline: [1960, 1970, 1980, 1990, 2000, 2010]
})

;
})(angular);