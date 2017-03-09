import { module } from 'angular';
import template from './home.component.html';
import './home.component.scss';

class HomeController {

    constructor($log, $firebaseArray, firebase, $state, $stateParams) {
        'ngInject'
        this.$log = $log.getInstance(HomeController.name);
        this.$firebaseArray = $firebaseArray;
        this.firebase = firebase;
        this.$state = $state;
        this.$stateParams = $stateParams;

        // firebase base ref
        const FIREBASE_REF = this.firebase.ref.child('colormezz');
        this.colormezz = this.$firebaseArray(FIREBASE_REF);
    }

    log(...msg) {
        this.$log.debug(...msg);
    }

    $onInit() {
    }

    /** As a user
     *  I want to participate into a colormez
     *  by clicking on participate button I can 
     *  go to colorme view
     */
    participate(useruid, colormezid) {
        this.$state.go('colorme', { useruid: useruid, colormezid: colormezid });
    }

    /** As a user
     *  I want to see the result of a colormez
     */
    getResult(userId, colormezId) {
        this.$state.go('outro');
    }

}

const HomeComponent = {
    template,
    restricted: 'E',
    controllerAs: 'home',
    controller: HomeController,
};

export default module('app.home', [])
    .component('home', HomeComponent);