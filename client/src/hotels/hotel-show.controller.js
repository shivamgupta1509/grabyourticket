(function () {
    'use strict';

    angular.module('GrabYourTicketApp')
        .controller('GetHotelController', GetHotelController);

    GetHotelController.$inject = ['HotelService'];
    function GetHotelController(HotelService) {
        var getHotelCtrl = this;
        getHotelCtrl.result = HotelService.getAllSearchedHotels();
        console.log('GetHotelCtrlResult: ', getHotelCtrl.result);
    }
})();