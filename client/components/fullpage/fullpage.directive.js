'use strict';
(function () {
  var normalScrollClass = 'normal-scroll'

  /**
   * Angular directive wrapper for fullpage.js
   * @link https://github.com/alvarotrigo/fullPage.js
   */
  angular.module('epaRfiApp').directive('fullpage', function ($timeout, $rootScope) {
    return {
      restrict: 'A',
      scope   : {
        fullpageInterface: "="
      },
      link    : function (scope, element) {
        init();

        function init() {
          $timeout(function () {
            buildFullPage();
          }, 0);
        }

        //Wait for a digest cycle to complete so other helper directives complete
        function buildFullPage() {
          $(element).fullpage(
            {
              normalScrollElements: '.' + normalScrollClass,
              afterRender: function(){
                $rootScope.$broadcast('fullpageReady');
              },
              onLeave: function (index, nextIndex, direction) {
                $rootScope.$broadcast('slideChanged', { 'nextIndex': nextIndex, 'direction': direction } );
              }
            }
          );
        }

        function destroyFullPage() {
          $.fn.fullpage.destroy();
        }

        scope.fullpageInterface = {
          rebuildFullpage: function () {
            destroyFullPage();
            init();
          }
        };
      }
    }
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

  /**
   * Directive to add click event to move to the next slide
   */
  angular.module('epaRfiApp').directive('moveSlideDownClick', function () {
    return {
      restrict: 'A',
      link    : function (scope, element) {
        $(element).on('click', function() {
          $.fn.fullpage.moveSectionDown();
        });
      }
    };
  });

})();

