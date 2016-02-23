// MODULE
var weatherApp = angular.module('weatherApp',['ngRoute','ngResource']);

// ROUTES
weatherApp.config(function($routeProvider){

  $routeProvider

  .when('/',{
    templateUrl:  'views/homepage.html',
    controller: 'mainController'
  })

  .when('/forecast',{
    templateUrl:  'views/forecast.html',
    controller: 'forecastController'
  })
  .when('/forecast/:days',{
    templateUrl:  'views/forecast.html',
    controller: 'forecastController'
  })

});
// CUSTOM SERVICES
weatherApp.service('cityService',function(){
  this.city = "Toronto, ON";
});
// CONTROLLERS
weatherApp.controller('mainController',['$scope','cityService',function($scope,cityService){
  $scope.city = cityService.city;
  $scope.$watch('city',function(){
    cityService.city = $scope.city;
  })
}]);

weatherApp.controller('forecastController',['$scope','$resource','$routeParams','cityService',function($scope,$resource,$routeParams,cityService){

  $scope.city = cityService.city;

  $scope.days = $routeParams.days || 2;

  $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily",{
    callback: "JSON_CALLBACK"},{ get: {method: "JSONP"}});

    $scope.weatherResult =  $scope.weatherAPI.get({q: $scope.city, cnt: $scope.days, appid: '44db6a862fba0b067b1930da0d769e98'});
    $scope.convertToCelsius = function(degC){
      return Math.round(degC - 273.15);
    };
    $scope.convertToDate = function(dt){
      return new Date(dt * 1000);
    };
}]);
