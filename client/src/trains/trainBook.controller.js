(function () {
    'use strict';

    angular.module('GrabYourTicketApp')
        .controller('TrainBookController', TrainBookController);

    TrainBookController.$inject = ['TrainService'];
    function TrainBookController(TrainService) {
        var trainBookCtrl = this;
        trainBookCtrl.fullName = sessionStorage.getItem('fullName');
        trainBookCtrl.email = sessionStorage.getItem('user');
        var { sourceName, destinationName, date, departTime, trainName, trainNumber } = TrainService.getSourceAndDestinationName();
        trainBookCtrl.sourceName = sourceName;
        trainBookCtrl.destinationName = destinationName;
        trainBookCtrl.date = date;
        trainBookCtrl.departTime = departTime;
        trainBookCtrl.trainName = trainName;
        trainBookCtrl.trainNumber = trainNumber;

        trainBookCtrl.class = '';
        trainBookCtrl.adult = '';
        trainBookCtrl.children = '';
        trainBookCtrl.infant = '';
        trainBookCtrl.phoneNo = '';

        trainBookCtrl.book = function () {
            console.log(trainBookCtrl.class);
            console.log(trainBookCtrl.adult);
            console.log(trainBookCtrl.children);
            console.log(trainBookCtrl.infant);
            console.log(trainBookCtrl.phoneNo);
        }
    }
})();