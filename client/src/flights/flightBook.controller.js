(function () {
    'use strict';

    angular.module('GrabYourTicketApp')
        .controller('FlightBookController', FlightBookController);

    FlightBookController.$inject = ['FlightService'];
    function FlightBookController(FlightService) {
        var flightBookCtrl = this;
        flightBookCtrl.fullName = sessionStorage.getItem('fullName');
        flightBookCtrl.email = sessionStorage.getItem('user');
        var { sourceName, destinationName, date, airlineName } = FlightService.getSourceAndDestinationName();
        flightBookCtrl.sourceName = sourceName;
        flightBookCtrl.destinationName = destinationName;
        flightBookCtrl.date = date;
        flightBookCtrl.airlineName = airlineName;

        flightBookCtrl.departureTime = '';
        flightBookCtrl.class = '';
        flightBookCtrl.adult = '';
        flightBookCtrl.children = '';
        flightBookCtrl.infant = '';
        flightBookCtrl.phoneNo = '';

        flightBookCtrl.book = function () {

            console.log(flightBookCtrl.departureTime);
            console.log(flightBookCtrl.class);
            console.log(flightBookCtrl.adult);
            console.log(flightBookCtrl.children);
            console.log(flightBookCtrl.infant);
            console.log(flightBookCtrl.message);
            console.log(flightBookCtrl.phoneNo);
        }
    }
})();