var homeModule = angular.module("Home", []);

var homeController = require("./home-controller");
var homeService = require("./home-service");

homeModule.controller("HomeCtrl", homeController);
homeModule.service("HomeService", homeService);

module.exports = homeModule;