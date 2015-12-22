'use strict';
(function () {
  angular.module('epaRfiApp').directive('deeThree', deeThree);

  function deeThree($timeout, $rootScope) {
    return {
      restrict: 'EA',
      scope   : {
        deeThree                   : "=",
        deeThreeFillColor          : "=",
        deeThreeLabelColor         : "=",
        deeThreeElementPadding     : "=",
        deeThreeOuterCircleOffset  : "=",
        deeThreeEnergyClickCallback: "=",
        deeThreeInterface          : "="
      },
      link    : function (scope, element) {
        //Waiting for a digest cycle to complete so fullpage can update the layout and set the height correctly.
        $timeout(function () {
          if(scope.deeThree === []) {
            return false;
          }

          $rootScope.$on('fullpageReady', function() {
            linkFunction(scope, element, $timeout);
          });
        }, 0);
      }
    }
  }

  function linkFunction(scope, element, $timeout) {
    var width             = element.width(),
        height            = element.height(),
        padding           = scope.deeThreeElementPadding || 20,
        outerCircleOffset = scope.deeThreeOuterCircleOffset || 5,
        fillColor         = scope.deeThreeFillColor || '#fef7ca',
        labelColor        = scope.deeThreeLabelColor || '#A58F9F';
    function d3Destroy() {
      element.empty();
    }

    function d3Init() {
      var force = d3.layout.force()
      .nodes(scope.deeThree)
      .size([width, height])
      .gravity(0.1)
      .charge(0)
      .on("tick", tick)
      .start();

      var svg = d3.select(element[0]).append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("class", "d3");

      var filter = svg.append("defs")
      .append("filter")
      .attr("id", "blur")
      .append("feGaussianBlur")
      .attr("stdDeviation", "0.8");

      var circle = svg.selectAll("g")
      .data(scope.deeThree)
      .enter()
      .append("g")
      .on("click", function (d) {
        scope.deeThreeEnergyClickCallback(d);
      });

      svg.selectAll("g").append("circle")
      .attr("r", function (d) {
        d.radius = getRadiusFromUsage(d);
        return d.radius;
      })
      .style("fill", fillColor)
      .call(force.drag);

      svg.selectAll("g").append("circle").attr("r", function (d) {
        return d.radius + outerCircleOffset;
      })
      .style("fill", 'none')
      .attr("filter", "url(#blur)")
      .style("stroke", fillColor);

      svg.selectAll("g").append("rect")
      .attr("width", 23)
      .attr("height", 23)
      .style("fill", 'none')
      .style("stroke", labelColor)
      .style("stroke-width", 2)
      .attr("transform", "translate(0 -16) rotate(45)")

      svg.selectAll("g").append('text')
      .attr('text-anchor', 'middle')
      .text(function (d) {
        return d.energyType.abbr;
      })
      .attr("font-family", "Raleway")
      .attr("font-size", "14px")
      .attr("fill", labelColor)
      .attr("transform", "translate(0 5)");

      function tick(e) {
        circle.each(cluster(1 * e.alpha * e.alpha))
        .each(collide(0.75))
        .attr("transform", function (d) {
          return "translate(" + d.x + "," + d.y + ")";
        })
      }
    }

    function getRadiusFromUsage(d) {
      return 80;
      var btu = d.usage;
      if(btu < 100) {
        return 20;
      } else
      if(btu < 999) {
        return 30;
      } else
      if(btu < 9999) {
        return 40;
      } else
      if(btu < 99999) {
        return 50;
      } else
      if(btu < 999999) {
        return 60;
      } else
      if(btu < 999999999) {
        return 70;
      } else
      if(btu > 999999999) {
        return 80;
      }
      else {
        return 0;
      }
    }

    /**
       * Make svg objects want to stick together
     * @param alpha
     * @returns {Function}
     */
    function cluster(alpha) {
      return function (d) {
        var cluster = {x: width / 2, y: height / 2, radius: -d.radius};
        var k       = .1 * Math.sqrt(d.radius);

        var x = d.x - cluster.x,
            y = d.y - cluster.y,
            l = Math.sqrt(x * x + y * y),
            r = d.radius + cluster.radius + outerCircleOffset;
        if (l != r) {
          l = (l - r) / l * alpha * k;
          d.x -= x *= l;
          d.y -= y *= l;
          cluster.x += x;
          cluster.y += y;
        }
      };
    }

    /**
     * Detect collisons between grouped objects
     * @param alpha
     * @returns {Function}
     */
    function collide(alpha) {
      var quadtree = d3.geom.quadtree(scope.deeThree);
      return function (d) {
        var r   = d.radius + padding + outerCircleOffset + 20,
            nx1 = d.x - r,
            nx2 = d.x + r,
            ny1 = d.y - r,
            ny2 = d.y + r;
        quadtree.visit(function (quad, x1, y1, x2, y2) {
          if (quad.point && (quad.point !== d)) {
            var x = d.x - quad.point.x,
                y = d.y - quad.point.y,
                l = Math.sqrt(x * x + y * y),
                r = d.radius + quad.point.radius + padding;
            if (l < r) {
              l = (l - r) / l * alpha;
              d.x -= x *= l;
              d.y -= y *= l;
              quad.point.x += x;
              quad.point.y += y;
            }
          }
          return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
        });
      };
    }

    scope.deeThreeInterface = {
      refresh: function () {
        d3Destroy();
        $timeout(function() {
          d3Init();
        });

      }
    };

    d3Init();

  }

})();
