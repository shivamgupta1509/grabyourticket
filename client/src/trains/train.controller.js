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
            if (!sessionStorage.getItem('user')) {
                swal('Please LogIn First!');
                $state.go('login');
            } else {
                $state.go('train-search');
                var splittedSourceName = trainCtrl.sourceName.split('-');
                var splittedDestinationName = trainCtrl.destinationName.split('-');
                var searchTrain = splittedSourceName[0];
                var sourceTrainCode = splittedSourceName[1];
                var destinationTrainCode = splittedDestinationName[1];
                var response = TrainService.searchTrain(searchTrain, sourceTrainCode, destinationTrainCode, trainCtrl.date);
                response.then(data => {
                    if (data.trainData.length != 0) {
                        trainCtrl.matchedTrains = data.trainData;
                        $state.go('train-search.get-trains');
                    } else {
                        swal("Train Not Found for Given Routes");
                        $state.go('train-search');
                    }

                })
                    .catch(error => {
                        console.log(error);
                    })
            }
        }
    }
})();