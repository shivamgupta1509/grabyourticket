(function () {
    'use strict';

    angular.module('GrabYourTicketApp')
        .controller('TrainController', TrainController);

    TrainController.$inject = ['TrainService', '$rootScope', '$state'];
    function TrainController(TrainService, $rootScope, $state) {
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
                $state.go('train-search.get-trains');
            })
                .catch(error => {
                    console.log(error);
                })
        }
    }
})();