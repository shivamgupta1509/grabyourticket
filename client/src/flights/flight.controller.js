(function () {
    'use strict';

    angular.module('GrabYourTicketApp')
        .controller('FlightController', FlightController);

    FlightController.$inject = ['FlightService', '$state', '$rootScope'];
    function FlightController(FlightService, $state, $rootScope) {
        var flightCtrl = this;
        flightCtrl.source = '';
        flightCtrl.destination = '';
        flightCtrl.date = '';
        flightCtrl.isFlightAvailable = false;
        flightCtrl.searchFlight = function () {
            if (!sessionStorage.getItem('user')) {
                swal('Please Log In First!');
                $state.go('login');
            } else {
                $state.go('flight-search');
                var date = document.getElementById('date-of-travel').value;
                var sourceCode = flightCtrl.source.split('-')[1]
                var sourceName = flightCtrl.source.split('-')[0]
                var destinationCode = flightCtrl.destination.split('-')[1]
                var destinationName = flightCtrl.destination.split('-')[0]
                var response = FlightService.searchFlightService(sourceCode, destinationCode, date, sourceName, destinationName)
                response.then(data => {
                    console.log(data.flightData);
                    if (data.flightData.Carriers.length !== 0) {
                        $state.go('flight-search.get-flights');
                    } else {
                        $state.go('flight-search');
                        swal('Flights Not Available for the given routes')
                    }
                })
                    .catch(error => {
                        console.log(error);
                    })
            }
        }
    }
})();