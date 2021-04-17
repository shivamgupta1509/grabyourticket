(function () {
    'use strict';

    angular.module('GrabYourTicketApp')
        .controller("GetTrainController", GetTrainController);

    GetTrainController.$inject = ['TrainService', '$rootScope', '$state'];
    function GetTrainController(TrainService, $rootScope, $state) {
        var getTrainCtrl = this;
        getTrainCtrl.result = TrainService.getMatchedTrains();

        getTrainCtrl.bookNow = function (data, trainName, trainNumber) {
            var response = TrainService.addTrainDetails(data.departTime, trainName, trainNumber);
            if (response) {
                $state.go('train-book-form')
            }
        }
    }
})();