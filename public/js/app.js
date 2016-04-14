"use strict";

(function(){
  angular
  .module("crazyUrls", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    "$locationProvider",
    "$urlRouterProvider",
    Router
  ])
  .factory("CrazyUrl", [
    "$resource",
    CrazyUrl
  ])
  .controller("crazyUrlWelcomeCtrl", [
    "CrazyUrl",
    crazyUrlWelcomeCtrl
  ])
  .controller("crazyUrlIndexCtrl", [
    "CrazyUrl",
    crazyUrlIndexCtrl
  ])
  .controller("crazyUrlShowCtrl", [
    "CrazyUrl",
    "$stateParams",
    "$window",
    crazyUrlShowCtrl
  ]);

  function Router($stateProvider, $locationProvider, $urlRouterProvider){
    $locationProvider.html5Mode(true);
    $stateProvider
    .state("welcome", {
      url: "/",
      templateUrl: "/assets/html/app-welcome.html",
      controller: "crazyUrlWelcomeCtrl",
      controllerAs: "welcomeVM"
    })
    .state("index", {
      url: "/crazyUrls",
      templateUrl: "/assets/html/urls-index.html",
      controller: "crazyUrlIndexCtrl",
      controllerAs: "indexVM"
    })
    .state("show", {
      url: "/crazyUrls/:oldUrl",
      templateUrl: "/assets/html/urls-show.html",
      controller: "crazyUrlShowCtrl",
      controllerAs: "showVM"
    });
    $urlRouterProvider.otherwise("/");
  }

  function CrazyUrl($resource){
    var CrazyUrl = $resource("/api/crazyUrls/:oldUrl", {}, {
      update: {method: "PUT"}
    });
    CrazyUrl.all = CrazyUrl.query();
    CrazyUrl.find = function(property, value, callback){
      CrazyUrl.all.$promise.then(function(){
        CrazyUrl.all.forEach(function(crazyUrl){
          if(crazyUrl[property] == value) callback(crazyUrl);
        });
      });
    }
    return CrazyUrl;
  }

  function crazyUrlWelcomeCtrl(CrazyUrl){
    var vm = this;
    vm.create = function{
      new CrazyUrl();
  }

  function crazyUrlIndexCtrl(CrazyUrl){
    var vm = this;
    vm.crazyUrls = CrazyUrl.all;
  }

  function crazyUrlShowCtrl(CrazyUrl, $stateParams, $window){
    var vm = this;
    CrazyUrl.find("oldUrl", $stateParams.oldUrl, function(crazyUrl) {
      vm.crazyUrl = crazyUrl
    });
    vm.update = function(){
      CrazyUrl.update({oldUrl: vm.crazyUrl.oldUrl}, {oldUrl: vm.crazyUrl}, function(){
        console.log("okie doke, updated");
      });
    }
    vm.delete = function(){
      CrazyUrl.remove({oldUrl: vm.crazyUrl.oldUrl}, function(){
        $window.location.replace("/");
      });
    }
  }
})();
