(function () {
    'use strict';

    angular.module('GrabYourTicketApp')
        .controller('TrainController', TrainController);

    TrainController.$inject = ['TrainService', '$rootScope', '$location'];
    function TrainController(TrainService, $rootScope, $location) {
        var trainCtrl = this;
        trainCtrl.sourceName = '';
        trainCtrl.destinationName = '';
        trainCtrl.date = '';
        trainCtrl.searchTrain = function () {
            var splittedSourceName = trainCtrl.sourceName.split('-');
            var splittedDestinationName = trainCtrl.destinationName.split('-');
            var searchTrain = splittedSourceName[0];
            var sourceTrainCode = splittedSourceName[1];
            var destinationTrainCode = splittedDestinationName[1];
            var response = TrainService.searchTrain(searchTrain, sourceTrainCode, destinationTrainCode, trainCtrl.date);
            response.then(data => {
                trainCtrl.matchedTrains = data.trainData;
                $location.path('get-trains');
            })
                .catch(error => {
                    console.log(error);
                })
        }
    }
})();