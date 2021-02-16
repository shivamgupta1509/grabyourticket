(function () {
    'use strict';

    angular.module('GrabYourTicketApp')
        .controller("GetTrainController", GetTrainController);

    GetTrainController.$inject = ['TrainService', '$rootScope'];
    function GetTrainController(TrainService, $rootScope) {
        var getTrainCtrl = this;
        getTrainCtrl.result = TrainService.getMatchedTrains()
        console.log('TrainService.getMatchedTrains(): ', TrainService.getMatchedTrains());
    }
})();