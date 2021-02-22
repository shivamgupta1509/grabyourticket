(function () {
    'use strict';

    angular.module('GrabYourTicketApp')
        .controller('GetHotelController', GetHotelController);

    GetHotelController.$inject = ['HotelService'];
    function GetHotelController(HotelService) {
        var getHotelCtrl = this;
        getHotelCtrl.isHotelAvailable = false;
        getHotelCtrl.result = HotelService.getAllSearchedHotels();
        console.log('GetHotelCtrlResult: ', getHotelCtrl.result);

        if (getHotelCtrl.result) {
            getHotelCtrl.isHotelAvailable = true;
        } else {
            getHotelCtrl.isHotelAvailable = false;
        }
    }
})();