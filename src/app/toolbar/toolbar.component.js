import { module } from 'angular';
import template from './toolbar.component.html';
import './toolbar.component.scss';

class ToolbarController {

    constructor($log, $rootScope, Auth, $scope, $state) {
        'ngInject'
        this.$log = $log.getInstance(ToolbarController.name);
        this.Auth = Auth;
        this.$scope = $scope;
        this.$state = $state;
    }

    log(...msg) {
        this.$log.debug(...msg);
    }

    isAuthenticated() {
        return this.Auth.isAuthenticated();
    }

    logout() {
        this.Auth.logout()
            .then(() => {
                if (this.$state.current.name === 'admin')
                    this.$state.go('home');
                this.$scope.$digest();
            });
    }

}

const ToolbarComponent = {
    template,
    restricted: 'E',
    controllerAs: 'toolbar',
    controller: ToolbarController,
};

export default module('app.toolbar', [])
    .component('toolbar', ToolbarComponent);