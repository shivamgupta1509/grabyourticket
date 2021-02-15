(function () {
    'use strict';

    angular.module('GrabYourTicketApp')
        .config(routesConfig);

    routesConfig.$inject = ['$stateProvider'];
    function routesConfig($stateProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'src/home/home.template.html'
            })
            .state('flight-search', {
                url: '/flight-search',
                templateUrl: 'src/flights/flight-search.template.html'
            })
            .state('train-search', {
                url: '/train-search',
                templateUrl: 'src/trains/train-search.template.html',
                controller: 'TrainController as trainCtrl'
            })
            .state('get-trains', {
                url: '/get-trains',
                templateUrl: 'src/trains/train-show.template.html',
                controller: 'GetTrainController as getTrainCtrl'
            })
            .state('bus-search', {
                url: '/bus-search',
                templateUrl: 'src/bus/bus-search.template.html'
            })
            .state('hotel-search', {
                url: '/hotel-search',
                templateUrl: 'src/hotels/hotel-search.template.html'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'src/authentication/login.template.html',
                controller: 'LoginController as loginCtrl'
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'src/authentication/signup.template.html',
                controller: 'SignupController as signupCtrl',
            });
    }
})();