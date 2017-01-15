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