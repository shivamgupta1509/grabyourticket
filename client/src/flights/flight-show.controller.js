(function () {
    'use strict';

    angular.module('GrabYourTicketApp')
        .controller('GetFlightController', GetFlightController);

    GetFlightController.$inject = ['FlightService'];
    function GetFlightController(FlightService) {
        var getFlightCtrl = this;
        getFlightCtrl.isFlightAvailable = false;
        getFlightCtrl.result = FlightService.getAllFlights();
        console.log('Inside of Show Controller');
        if (angular.equals(getFlightCtrl.result, {})) {
            getFlightCtrl.isFlightAvailable = false;
        } else {
            console.log('Result: ', getFlightCtrl.result);
            getFlightCtrl.isFlightAvailable = true;
        }
    }
})();