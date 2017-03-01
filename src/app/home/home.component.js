import { module } from 'angular';
import template from './home.component.html';
import './home.component.scss';

class HomeController {

    constructor($log, $rootScope) {
        'ngInject'
        this.$log = $log.getInstance(HomeController.name);
    }

    log(...msg) {
        this.$log.debug(...msg);
    }
}

const HomeComponent = {
    template,
    restricted: 'E',
    controllerAs: 'vm',
    controller: HomeController,
};

export default module('app.home', [
    
])
    .component('home', HomeComponent);