(function () {
    'use strict';

    angular.module('GrabYourTicketApp')
        .service('FlightService', FlightService);

    FlightService.$inject = ['$http', 'ServerUrl'];
    function FlightService($http, ServerUrl) {
        var service = this;
        service.getSearchedFlights = {}
        service.sourceName = "";
        service.destinationName = "";
        service.date = "";
        service.searchFlightService = function (sourceCode, destinationCode, date, sourceName, destinationName) {
            service.sourceName = sourceName;
            service.destinationName = destinationName;
            service.date = date;
            service.airlineName
            var data = {
                sourceCode: sourceCode,
                destinationCode: destinationCode,
                date: date
            };
            return $http.post(ServerUrl + '/search_flight', data)
                .then(response => {
                    service.getSearchedFlights = response.data.flightData;
                    return response.data
                })
        }

        service.getAllFlights = function () {
            return service.getSearchedFlights
        }

        service.airlineName = function (airlineName) {
            service.airlineName = airlineName;
            return airlineName;
        }

        service.getSourceAndDestinationName = function () {
            return { sourceName: service.sourceName, destinationName: service.destinationName, date: service.date, airlineName: service.airlineName }
        }
    }
})();