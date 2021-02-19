(function () {
    'use strict';

    angular.module('GrabYourTicketApp')
        .service('HotelService', HotelService);

    HotelService.$inject = ['$http', 'ServerUrl'];
    function HotelService($http, ServerUrl) {
        var service = this;

        service.hotelSearchService = function (location) {
            var data = {
                location: location
            };
            return $http.post(ServerUrl + '/search_hotel', data)
                .then(response => {
                    console.log(response.data);
                    return response.data
                })
        }
    }
})();