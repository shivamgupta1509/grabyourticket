(function () {
    'use strict';

    angular.module('GrabYourTicketApp')
        .controller('MainController', MainController);

    MainController.$inject = ['AuthenticationService', '$rootScope'];
    function MainController(AuthenticationService, $rootScope) {
        var mainCtrl = this;

        mainCtrl.logout = function () {
            var response = AuthenticationService.logout();
            response.then(data => {
                if (data.logout) {
                    delete sessionStorage.user;
                    $rootScope.user = undefined;
                    swal("LoggedOut Successfully!", "Click the Below Button!", "success");
                }
            })
        }
    }
})();