import { module } from 'angular';
import template from './admin.component.html';
import './admin.component.scss';

class AdminController {

    constructor($log, $rootScope) {
        'ngInject'
        this.$log = $log.getInstance(AdminController.name);
    }

    log(...msg) {
        this.$log.debug(...msg);
    }
}

const AdminComponent = {
    template,
    restricted: 'E',
    controllerAs: 'vm',
    controller: AdminController,
};

export default module('app.admin', [
    
])
    .component('admin', AdminComponent);