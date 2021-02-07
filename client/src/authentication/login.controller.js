(function () {
    'use strict';

    angular.module("GrabYourTicketApp")
        .controller('LoginController', LoginController);

    LoginController.$inject = ['AuthenticationService', '$location', '$window'];
    function LoginController(AuthenticationService, $location, $window) {
        var loginCtrl = this;

        loginCtrl.username = "";
        loginCtrl.password = "";

        loginCtrl.login = function () {
            var response = AuthenticationService.signin(loginCtrl.username, loginCtrl.password);
            response.then(data => {
                if (data.successLogin) {
                    $window.localStorage.setItem('username', loginCtrl.username);
                    $location.path('home');
                } else {
                    $location.path('login');
                }
            })
                .catch(error => {
                    console.log(error);
                })
        }
    }
})();