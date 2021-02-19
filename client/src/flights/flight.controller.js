(function () {
    'use strict';

    angular.module('GrabYourTicketApp')
        .controller('FlightController', FlightController);

    FlightController.$inject = ['FlightService'];
    function FlightController(FlightService) {
        var flightCtrl = this;
        flightCtrl.source = '';
        flightCtrl.destination = '';
        flightCtrl.date = '';
        flightCtrl.searchFlight = function () {
            var date = document.getElementById('date-of-travel').value;
            var sourceCode = flightCtrl.source.split('-')[1]
            var destinationCode = flightCtrl.destination.split('-')[1]
            var response = FlightService.searchFlightService(sourceCode, destinationCode, date)
            response.then(data => {
                console.log(data);
            })
        }
    }
})();