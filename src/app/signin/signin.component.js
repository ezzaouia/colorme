import { module } from 'angular';
import template from './signin.component.html';
import './signin.component.scss';

class SigninController {

    constructor($log, $rootScope, $firebaseArray, firebase, $mdSidenav, Auth, $state) {
        'ngInject'
        this.$log = $log.getInstance(SigninController.name);
        this.$firebaseArray = $firebaseArray;
        this.firebase = firebase;
        this.Auth = Auth;
        this.$state = $state;
        console.log('onInit', this.Auth.currentUser())
        console.log('onInit', this.Auth.isAuthenticated())


    }

    $onInit() {
        let cu = this.isAuthenticated();
        console.log('onInit', cu)
        if (cu) {
            this.$state.go('admin');
        }
    }

    log(...msg) {
        this.$log.debug(...msg);
    }

    loggin() {
        this.Auth.loginWithGoogle()
            .then((authdata) => {
                this.$state.go('admin');
            });
    }

    currentUser() {
        console.log(this.Auth.currentUser())
        return this.Auth.currentUser();
    }

    logout() {
        this.Auth.logout().then((lo) => {
        });
    }

    isAuthenticated() {
        console.log(this.Auth.isAuthenticated())
        return this.Auth.isAuthenticated();
    }

}

const SigninComponent = {
    template,
    restricted: 'E',
    controllerAs: 'signin',
    controller: SigninController,
};

export default module('app.signin', [])
    .component('signin', SigninComponent);