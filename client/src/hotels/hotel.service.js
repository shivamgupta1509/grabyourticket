(function () {
    'use strict';

    angular.module('GrabYourTicketApp')
        .service('HotelService', HotelService);

    HotelService.$inject = ['$http', 'ServerUrl'];
    function HotelService($http, ServerUrl) {
        var service = this;
        // service.getSearchedHotels = {}
        service.hotelSearchService = function (location, checkIn, checkOut) {
            var data = {
                location: location,
                checkIn: checkIn,
                checkOut: checkOut
            };
            return $http.post(ServerUrl + '/search_hotel', data)
                .then(response => {
                    console.log(response.data);
                    service.getSearchedHotels = response.data.hotelData.data.body.searchResults.results;
                    return response.data
                })
        }

        service.getAllSearchedHotels = function () {
            return service.getSearchedHotels;
        }
    }
})();