(function () {
    'use strict';

    angular.module('GrabYourTicketApp')
        .controller('HotelController', HotelController);

    HotelController.$inject = ['HotelService', '$state'];
    function HotelController(HotelService, $state) {
        var hotelCtrl = this;
        hotelCtrl.location = '';
        hotelCtrl.searchHotel = function () {
            $state.go('hotel-search.get-hotels');
            if (!sessionStorage.getItem('user')) {
                swal('Please LogIn First!');
                $state.go('login');
            } else {
                var response = HotelService.hotelSearchService(hotelCtrl.location);
                response.then(data => {
                    console.log('Data: ', data);
                })
                    .catch(error => {
                        console.log(error);
                    })
            }
        }
    }
})();