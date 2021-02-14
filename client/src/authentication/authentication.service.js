(function () {
    'use strict';

    angular.module('GrabYourTicketApp')
        .service('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', 'ServerUrl', '$window'];
    function AuthenticationService($http, ServerUrl, $window) {
        var service = this;

        service.signup = function (fullName, username, password, confirmPassword) {
            const data = {
                name: fullName,
                email: username,
                password1: password,
                password2: confirmPassword
            };
            return $http.post(ServerUrl + '/register', data)
                .then(response => {
                    return response.data;
                })
        }

        service.signin = function (username, password) {
            const data = {
                username: username,
                password: password
            };
            return $http.post(ServerUrl + '/login', data)
                .then(response => {
                    return response.data;
                })
        }

        service.logout = function () {
            return $http.get(ServerUrl + '/logout')
                .then(response => {
                    return response.data;
                });
        }

        service.getLoggedInUser = function () {
            return $window.localStorage.getItem('username');
        }
    }
})();