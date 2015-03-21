"use strict";

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