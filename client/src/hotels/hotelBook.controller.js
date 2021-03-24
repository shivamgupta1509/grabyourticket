(function () {
    'use strict';

    angular.module('GrabYourTicketApp')
        .controller('HotelBookController', HotelBookController);

    HotelBookController.$inject = ['HotelService'];
    function HotelBookController(HotelService) {
        var hotelBookCtrl = this;
        var { hotelName, checkInDate, checkOutDate } = HotelService.getHotelDetails();
        hotelBookCtrl.fullName = sessionStorage.getItem('fullName');
        hotelBookCtrl.email = sessionStorage.getItem('user');
        hotelBookCtrl.hotelName = hotelName;
        hotelBookCtrl.checkInDate = checkInDate;
        hotelBookCtrl.checkOutDate = checkOutDate;

        hotelBookCtrl.checkInTime = '';
        hotelBookCtrl.checkOutTime = '';
        hotelBookCtrl.room = '';
        hotelBookCtrl.adult = '';
        hotelBookCtrl.children = '';
        hotelBookCtrl.infant = '';
        hotelBookCtrl.phoneNo = '';

        hotelBookCtrl.book = function () {
            console.log(hotelBookCtrl.checkInTime);
            console.log(hotelBookCtrl.room);
            console.log(hotelBookCtrl.adult);
            console.log(hotelBookCtrl.children);
            console.log(hotelBookCtrl.infant);
            console.log(hotelBookCtrl.phoneNo);
        }
    }
})();