(function () {
    'use strict';

    angular.module('GrabYourTicketApp')
        .service('HotelService', HotelService);

    HotelService.$inject = ['$http', 'ServerUrl'];
    function HotelService($http, ServerUrl) {
        var service = this;

        service.hotelSearchService = function (location, checkIn, checkOut) {
            var data = {
                location: location,
                checkIn: checkIn,
                checkOut: checkOut
            };
            return $http.post(ServerUrl + '/search_hotel', data)
                .then(response => {
                    console.log(response.data);
                    console.log('Results: ', response.data.hotelData.data.body.searchResults.results);
                    return response.data
                })
        }
    }
})();