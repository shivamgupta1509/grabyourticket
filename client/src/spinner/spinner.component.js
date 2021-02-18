(function () {
    "use strict";

    angular.module("GrabYourTicketApp")
        .component("loadingSpinnerComponent", {
            template: '<img src="images/loading-spinner.gif" ng-if="$ctrl.show" alt="loading">',
            controller: LoadingSpinnerController
        });

    LoadingSpinnerController.$inject = ['$rootScope'];
    function LoadingSpinnerController($rootScope) {
        var $ctrl = this;
        var listener;

        $ctrl.$onInit = function () {
            $ctrl.show = false;
            listener = $rootScope.$on('spinner:activate', onSpinnerActivate);
        }

        $ctrl.$onDestroy = function () {
            listener();
        }

        function onSpinnerActivate(event, data) {
            $ctrl.show = data.on;
        }
    }

})();