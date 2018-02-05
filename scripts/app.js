'use strict';
/*global angular */




/**
 * @ngdoc overview
 * @name tulipan-translate-app
 * @description
 * # tulipan-translate-app
 *
 * Main module of the application.
 */
angular
  .module('tulipanTranslateApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ]).config(['$compileProvider', function($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|whatsapp|file|tel):/);
  }])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/traducir', {
        templateUrl: 'views/deco.html',
        controller: 'DecoCtrl',
        controllerAs: 'deco'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
