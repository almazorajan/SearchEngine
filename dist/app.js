(function() {
    "use strict";

    /* @ngInject */
    angular.module("app", ["ui.router"]);
})();
(function() {
    "use strict";

    angular
        .module("app")
        .config(Config);
    
    Config.$inject = ["$stateProvider", "$urlRouterProvider"];

    function Config($stateProvider, $urlRouterProvider) {
            
        const main = {
            url: "/main",
            name: "main",
            controller: "MainController",
            controllerAs: "main",
            templateUrl: "app/components/main/main.page.html",
        };

        $stateProvider.state(main);
        $urlRouterProvider.otherwise("/main");
    }
})();
(function () {
    "use strict";

    angular
        .module("app")
        .controller("MainController", MainController);

    MainController.$inject = ["MainFactory"];

    function MainController(MainFactory) {
        var vm = this;
        vm.error = "";
        vm.loading = "";
        vm.keyword = "";
        vm.siteResults = [];
        vm.search = search;
        vm.tabs = [
            {
                name: "Google",
                function: "searchGoogle",
                isActive: true
            },
            {
                name: "Bing",
                function: "searchBing",
                isActive: false
            }
        ];
        vm.activeTab = vm.tabs[0];
        vm.toggleTab = toggleTab;

        function toggleTab(tab) {
            for (var key in vm.tabs) {
                vm.tabs[key].isActive = false;
            }

            var key = vm.tabs.indexOf(tab);
            vm.tabs[key].isActive = true;
            vm.activeTab = vm.tabs[key];
            search();
        }

        function search() {
            try {
                if (vm.keyword.trim().length <= 0) {
                    vm.error = "";
                    vm.siteResults = [];
                    return;
                }

                vm.loading = true;
                vm.error = "";
                vm.siteResults = [];

                MainFactory[vm.activeTab.function](vm.keyword).then(function (res) {
                    vm.loading = false;
                    if (!res.data.success) {
                        vm.error = res.data.message;
                        return;
                    }
                    vm.siteResults = res.data.data;
                })
                .catch(function (error) {
                    vm.loading = false;
                    vm.error = error;
                });
            } catch (e) {
                vm.loading = false;
                vm.error = (e || e.message);
            }
        }
    }
})();
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