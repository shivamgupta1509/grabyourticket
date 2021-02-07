(function () {
    'use strict';

    angular.module('GrabYourTicketApp')
        .controller('SignupController', SignupController);

    SignupController.$inject = ['AuthenticationService', '$location'];
    function SignupController(AuthenticationService, $location) {
        var signupCtrl = this;
        signupCtrl.fullName = "";
        signupCtrl.username = "";
        signupCtrl.password = "";
        signupCtrl.confirmPassword = "";

        signupCtrl.register = function () {
            var response = AuthenticationService.signup(signupCtrl.fullName, signupCtrl.username, signupCtrl.confirmPassword);
            response.then(data => {
                console.log("Data: ", data);
                if (data.successLogin) {
                    $location.path("login");
                } else {
                    $location.path("signup")
                }
            })
                .catch(error => {
                    console.log(error);
                });
        }
    }
})();