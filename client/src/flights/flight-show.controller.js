(function () {
    'use strict';

    angular.module('GrabYourTicketApp')
        .controller('GetFlightController', GetFlightController);

    GetFlightController.$inject = ['FlightService', '$state'];
    function GetFlightController(FlightService, $state) {
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

        getFlightCtrl.bookForm = function (airlineName) {
            var response = FlightService.airlineName(airlineName.Name);
            if (response) {
                $state.go('flight-book-form');
            }
        }
    }
})();