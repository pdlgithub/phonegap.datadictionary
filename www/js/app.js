var appAngular=angular.module('appAngular', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);	// NOTE: add ['ngRoute'] for SPA

   // configure our routes
appAngular.config(['$routeProvider', function ($routeProvider) {
   // console.log('$routeProvider=' + JSON.stringify($routeProvider));

      $routeProvider
          .when('/report',{
                templateUrl: 'dictionary.html',
                controller: 'dictionaryController'
          })
          .when('/term/:param',{
                templateUrl: 'term.html',
                controller: 'termController'
          })
        .when('/glossary', {
            templateUrl: 'glossary.html',
            controller: 'glossaryController'
        })

           .when('/information',{
                templateUrl: 'information.html',
                controller: 'informationController'
           })
            .otherwise({
                redirectTo: '/report'
            });
}]);

appAngular.run(['$location', 'globalConfigService', function ($location, globalConfigService) {
    // initialize our  service containing global variables
    globalConfigService.init();

    // alternately set app.constant
    var endpoint = "" + $location.protocol() + "://" + $location.host() + ":" + $location.port();// + "/";    //  + $location.path();
    appAngular.constant('globalVariables',
        { "serviceEndpoint": endpoint });

}]);

