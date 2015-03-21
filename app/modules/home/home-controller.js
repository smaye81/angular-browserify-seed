HomeController.$inject = ['HomeService'];

function HomeController(HomeService) {

    "use strict";

    HomeService.getLocation().then(location => this.location = location);
}


module.exports = HomeController;

