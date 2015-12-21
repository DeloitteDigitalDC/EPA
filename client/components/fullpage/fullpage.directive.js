'use strict';
(function () {
  var normalScrollClass = 'normal-scroll'

  /**
   * Angular directive wrapper for fullpage.js
   * @link https://github.com/alvarotrigo/fullPage.js
   */
  angular.module('epaRfiApp').directive('fullpage', function ($timeout) {
    return {
      restrict: 'A',
      link    : function (scope, element) {
        //Wait for a digest cycle to complete so other helper directives complete
        $timeout(function () {
          $(element).fullpage(
            {
              normalScrollElements: '.' + normalScrollClass
            }
          );
        }, 0)
      }
    };
  });

  /**
   * Directive to add to elements with overflow (scrolling) to work correctly with fullpage.js
   */
  angular.module('epaRfiApp').directive('normalScroll', function () {
    return {
      restrict: 'A',
      link    : function (scope, element) {
        $(element).addClass(normalScrollClass)
      }
    };
  });

})();

