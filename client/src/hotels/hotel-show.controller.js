(function () {
    'use strict';

    angular.module('GrabYourTicketApp')
        .controller('GetHotelController', GetHotelController);

    GetHotelController.$inject = ['HotelService', '$state'];
    function GetHotelController(HotelService, $state) {
        var getHotelCtrl = this;
        getHotelCtrl.isHotelAvailable = false;
        getHotelCtrl.result = HotelService.getAllSearchedHotels();
        console.log('GetHotelCtrlResult: ', getHotelCtrl.result);

        if (getHotelCtrl.result) {
            getHotelCtrl.isHotelAvailable = true;
        } else {
            getHotelCtrl.isHotelAvailable = false;
        }

        getHotelCtrl.bookForm = function () {
            $state.go('hotel-book-form');
        }
    }
})();