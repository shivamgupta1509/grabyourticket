(function () {
    'use strict';

    angular.module("GrabYourTicketApp")
        .controller('LoginController', LoginController);

    LoginController.$inject = ['AuthenticationService', '$location', '$scope', '$rootScope'];
    function LoginController(AuthenticationService, $location, $scope, $rootScope) {
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
                    // $window.localStorage.setItem('username', loginCtrl.username);
                    sessionStorage.user = data.user;
                    $rootScope.user = data.user;
                    swal("LoggedIn Successfully!", "Click the Below Button!", "success");
                    $location.path('home');
                }
            })
                .catch(error => {
                    if (error.status == 401) {
                        swal("Invalid Username or Password", "Click the below button :)", "error");
                    }
                })
        }
    }
})();