'use strict';
(function() {
  angular.module('epaRfiApp').filter('btuMagnitude', function () {
    return function (input) {
      if(input === 0) {
        return "";
      }

      var mag = String(numeral(input).format('0a'));
      mag = mag.substr(mag.length-1, 1);
      switch(mag) {
        case 'k':
          return 'Thousand';
        case 'm':
          return 'Million';
        case 'b':
          return 'Billion';
      };
    };
  });

  angular.module('epaRfiApp').filter('btuAmount', function () {
    return function (input) {
      console.log("filter", input);
      if(input === 0) {
        return 0;
      }
      var amount = String(numeral(input).format('0a'));
      return amount.substr(0, amount.length-1);
    };
  });

  angular.module('epaRfiApp').filter('btuHundreds', function () {
    return function (input) {
      var amount = String(numeral(input).format('0a'));
      if (amount.substr(0, amount.length-1).length > 2) {
        return "hundreds";
      } else {
        return "";
      }
    };
  })
})();

