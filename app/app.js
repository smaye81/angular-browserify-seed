require('angular');
require("angular-ui-router");

var homeModule = require("./modules/home/home");
var router = require("./router");

var appModule = angular.module("App", ["ui.router", homeModule.name]);

appModule.config(router);