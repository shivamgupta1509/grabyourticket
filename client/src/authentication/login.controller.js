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
                if (data.status == 401) {
                    alert("Invalid Username or Password");
                    $location.path('login');
                } else if (data.login) {
                    $window.localStorage.setItem('username', loginCtrl.username);
                    alert("LoggedIn Successfully");
                    $location.path('home');
                }
            })
                .catch(error => {
                    if (error.status == 401) {
                        alert("Invalid Username or Password");
                    }
                })
        }
    }
})();