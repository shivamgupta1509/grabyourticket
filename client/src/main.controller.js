(function () {
    'use strict';

    angular.module('GrabYourTicketApp')
        .controller('MainController', MainController);

    MainController.$inject = ['AuthenticationService'];
    function MainController(AuthenticationService) {
        var mainCtrl = this;
        mainCtrl.showUsername = false;
        mainCtrl.username = AuthenticationService.getLoggedInUser();
        if (mainCtrl.username === undefined) {
            mainCtrl.username = false
        } else {
            mainCtrl.username = true
        }

    }
})();