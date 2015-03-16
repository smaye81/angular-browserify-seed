(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function HomeController(HomeService) {

    this.location = HomeService.getLocation();
}


module.exports = ['HomeService', HomeController];


},{}],2:[function(require,module,exports){
describe('Home Controller Tests', function () {

    var mocks = angular.mock;

    var homeModule = require("./home");

    var sut;

    beforeEach(function () {

        mocks.module(homeModule.name);

    });

    beforeEach(function () {
        mocks.module(function ($provide) {
            $provide.value("HomeService", {
                "getLocation" : jasmine.createSpy("HomeService getLocation")
            });

            $provide.value("$state", {});
        });
    });

    beforeEach(function () {
        mocks.inject(function ($controller, $rootScope) {
            sut = $controller("HomeCtrl", {
                $scope : $rootScope
            });
        });
    });

    it('should be defined', function () {
        expect(sut).toBeDefined();
    });

});
},{"./home":4}],3:[function(require,module,exports){
function HomeService () {

    this.getLocation = function () {
        return "Browserify";
    };
}

module.exports = HomeService;

},{}],4:[function(require,module,exports){
var homeModule = angular.module("Home", []);

var homeController = require("./home-controller");
var homeService = require("./home-service");

homeModule.controller("HomeCtrl", homeController);
homeModule.service("HomeService", homeService);

module.exports = homeModule;
},{"./home-controller":1,"./home-service":3}]},{},[2])