(function () {
    'use strict';

    angular.module('GrabYourTicketApp')
        .controller('HotelController', HotelController);

    HotelController.$inject = ['HotelService', '$state'];
    function HotelController(HotelService, $state) {
        var hotelCtrl = this;
        hotelCtrl.location = '';
        hotelCtrl.checkIn = '';
        hotelCtrl.checkOut = '';
        hotelCtrl.searchHotel = function () {
            $state.go('hotel-search.get-hotels');
            if (!sessionStorage.getItem('user')) {
                swal('Please LogIn First!');
                $state.go('login');
            } else {
                var checkIn = document.getElementById("check_in").value;
                var checkOut = document.getElementById("check_out").value;
                var response = HotelService.hotelSearchService(hotelCtrl.location, checkIn, checkOut);
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