(function () {
    'use strict';

    angular.module('GrabYourTicketApp')
        .service('FlightService', FlightService);

    FlightService.$inject = ['$http', 'ServerUrl'];
    function FlightService($http, ServerUrl) {
        var service = this;

        service.searchFlightService = function (sourceCode, destinationCode, date) {
            var data = {
                sourceCode: sourceCode,
                destinationCode: destinationCode,
                date: date
            };
            return $http.post(ServerUrl + '/search_flight', data)
                .then(response => {
                    return response.data
                })
        }
    }
})();