(function () {
    'use strict';

    angular.module('GrabYourTicketApp')
        .service('TrainService', TrainService);

    TrainService.$inject = ['$http', 'ServerUrl'];
    function TrainService($http, ServerUrl) {
        var service = this;
        service.getSearchedTrains = {};
        service.searchTrain = function (searchTrain, sourceTrainCode, destinationTrainCode, date) {
            const data = {
                searchTrain,
                sourceTrainCode,
                destinationTrainCode,
                date
            };
            return $http.post(ServerUrl + '/search-train', data)
                .then(response => {
                    service.getSearchedTrains = response.data;
                    return response.data
                })
        }

        service.getMatchedTrains = function () {
            return service.getSearchedTrains;
        }
    }
})();