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
            if (signupCtrl.password === signupCtrl.confirmPassword) {
                var response = AuthenticationService.signup(signupCtrl.fullName, signupCtrl.username, signupCtrl.password, signupCtrl.confirmPassword);
                response.then(data => {
                    console.log("Data: ", data);
                    if (data.error) {
                        swal(data.error.message, "Click the below button :)", "error");
                        $location.path("signup");
                    } else if (data.register) {
                        swal("Registered Successfully!", "Click the Below Button!", "success");
                        $location.path("login");
                    }
                })
                    .catch(error => {
                        console.log(error);
                    });
            } else {
                console.log("Passwords must be same");
            }

        }
    }
})();