(function () {
    'use strict';

    angular.module('GrabYourTicketApp')
        .service('TrainService', TrainService);

    TrainService.$inject = ['$http', 'ServerUrl'];
    function TrainService($http, ServerUrl) {
        var service = this;
        service.searchTrain = function (searchTrain, sourceTrainCode, destinationTrainCode, date) {
            const data = {
                searchTrain,
                sourceTrainCode,
                destinationTrainCode,
                date
            };
            return $http.post(ServerUrl + '/search-train', data)
                .then(response => {
                    console.log(response);
                    return response.data
                })
        }
    }
})();