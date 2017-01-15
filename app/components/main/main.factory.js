(function() {
    "use strict";

    angular
        .module("app")
        .factory("MainFactory", MainFactory);

    MainFactory.$inject = ["$http", "$interpolate"];

    function MainFactory($http, $interpolate) {
        const factory = {
            searchGoogle: searchGoogle,
            searchBing: searchBing
        };

        return factory;

        function searchGoogle(keyword) {
            return $http.get($interpolate("/search/google/{{keyword}}")({ keyword: keyword }));
        }

        function searchBing(keyword) {
            return $http.get($interpolate("/search/bing/{{keyword}}")({ keyword: keyword }));
        }
    }
})();