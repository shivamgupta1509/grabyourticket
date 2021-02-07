(function () {
    "use strict";

    angular.module("GrabYourTicketApp", ['ui.router'])
        .constant('ServerUrl', 'http://localhost:5000')
        .config(config);

    config.$inject = ["$urlRouterProvider", "$httpProvider"];
    function config($urlRouterProvider, $httpProvider) {
        $httpProvider.interceptors.push('spinnerHttpInterceptor');
        $urlRouterProvider.otherwise("/home");
    }
})();