function HomeController(HomeService) {

    this.location = HomeService.getLocation();
}


module.exports = ['HomeService', HomeController];

