(function () {
    'use strict';

    angular.module('GrabYourTicketApp')
        .service('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', 'ServerUrl', '$window'];
    function AuthenticationService($http, ServerUrl, $window) {
        var service = this;

        service.signup = function (fullName, username, password) {
            const data = {
                name: fullName,
                email: username,
                password: password
            };
            return $http.post(ServerUrl + '/signup', data)
                .then(response => {
                    return response.data;
                })
        }

        service.signin = function (username, password) {
            const data = {
                email: username,
                password: password
            };
            return $http.post(ServerUrl + '/login', data)
                .then(response => {
                    return response.data;
                })
        }

        service.getLoggedInUser = function () {
            return $window.localStorage.getItem('username');
        }
    }
})();