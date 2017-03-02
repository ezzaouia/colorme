import { module } from 'angular';
import template from './outro.component.html';
import './outro.component.scss';

class OutroController {

    constructor($log) {
        'ngInject'
        this.$log = $log.getInstance(OutroController.name);
    }

    log(...msg) {
        this.$log.debug(...msg);
    }

    $onInit() {
    }
}

const OutroComponent = {
    template,
    restricted: 'E',
    controllerAs: 'Outro',
    controller: OutroController,
};

export default module('app.outro', [

])
    .component('outro', OutroComponent);