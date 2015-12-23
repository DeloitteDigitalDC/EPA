(function(angular, undefined) {
'use strict';

angular.module('epaRfiApp.constants', [])

.constant('appConfig', {YEAR_TIMELINE:[1960,1970,1980,1990,2000,2010],ENERGY_TYPES:{COAL:{name:'Coal',abbr:'Co',desc:'A readily combustible black or brownish-black rock whose composition, including inherent moisture, consists of more than 50 percent by weight and more than 70 percent by volume of carbonaceous material. It is formed from plant remains that have been compacted, hardened, chemically altered, and metamorphosed by heat and pressure over geologic time.'},NATURAL_GAS:{name:'Natural Gas',abbr:'Na',desc:'A gaseous mixture of hydrocarbon compounds, the primary one being methane.'},SOLAR:{name:'Solar',abbr:'So',desc:'The radiant energy of the sun, which can be converted into other forms of energy, such as heat or electricity.'},WIND:{name:'Wind',abbr:'Wi',desc:'Kinetic energy present in Wind motion that can be converted to mechanical energy for driving pumps, mills, and electric power generators.'},NUCLEAR:{name:'Nuclear',abbr:'Nu',desc:'Electricity generated by the use of the thermal energy released from the fission of nuclear fuel in a reactor.'},MOTOR_GASOLINE:{name:'Motor Gasoline',abbr:'Ga',desc:'A complex mixture of relatively volatile hydrocarbons with or without small quantities of additives, blended to form a fuel suitable for use in spark-ignition engines.'}},SOCIAL_MEDIA:{url:'http://epa-rfi-ecselastic-tu9y9j5je7k4-1565253159.us-east-1.elb.amazonaws.com/',title:'The Power of You',description:'The power of you description',image:'http://www.deloittedigital.com/assets/img/common/footer-map-us-desktop-2x.jpg',TWITTER:{account:'DeloitteDIGI_US',tweet:'Check out this cool site'},LINKEDIN:{summary:'Check out this on linkedin'},FACEBOOK:{APP_ID:996945267036042}},FOOTER_LINKS:{DeloitteDigital:'http://www.deloittedigital.com/',EPA:'http://www3.epa.gov/',EIA:'http://www.eia.gov/'}})

;
})(angular);