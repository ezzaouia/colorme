import { module } from 'angular';
import template from './admin.component.html';
import './admin.component.scss';

class AdminController {

    constructor($log, $rootScope, $firebaseArray, firebase, $mdSidenav, Auth) {
        'ngInject'
        this.$log = $log.getInstance(AdminController.name);
        this.$mdSidenav = $mdSidenav;

        this.$firebaseArray = $firebaseArray;
        this.firebase = firebase;
        this.Auth = Auth;

        const FIREBASE_REF = this.firebase.ref.child('colormezz')
            .orderByChild("useremail").equalTo(`${this.Auth.currentUser().email}`);
        this.usercolormezz = this.$firebaseArray(FIREBASE_REF);

        this.colormez = {};
        this.colormez.useremail = this.Auth.currentUser().email;

        //console.log('this.Auth.currentUser()', this.Auth.currentUser());
        
        this.colormez.useruid = this.Auth.currentUser().uid;
        this.items = [];
        this.colormez.items = this.items;


        console.log(this.usercolormezz);
    }

    log(...msg) {
        this.$log.debug(...msg);
    }

    addColorMezz() {
        this.usercolormezz.$add(this.colormez);
    }

    addItem() {
        this.items.push({});
    }

    removeItem(index) {
        this.items.splice(index, 1)
    }

    createNewColorMez() {
        return this.$mdSidenav('right')
            .toggle()
            .then(() => {
                //this.$log.debug('right done');
            });
    }

    isOpenRight() {
        return this.$mdSidenav('right').isOpen();
    }

    closeRight() {
        return this.$mdSidenav('right')
            .close()
            .then(() => {
                //this.$log.debug("close RIGHT is done");
            });
    }

    $onInit() {
        console.log('onInit', this.currentUser2)

    }

}

const AdminComponent = {
    template,
    restricted: 'E',
    controllerAs: 'admin',
    controller: AdminController,
};

export default module('app.admin', [

])
    .component('admin', AdminComponent);