import { module } from 'angular';
import Firebase from 'firebase';

class AuthFactory {
    constructor(firebase, $timeout) {
        'ngInject';
        this.$timeout = $timeout;
        this.firebase = firebase;
        this.auth = this.firebase.auth;

    }

    loginWithGoogle() {
        let provider = new Firebase.auth.GoogleAuthProvider();
        return this.auth
            .signInWithPopup(provider)
            .then((authdata) => {
                return Promise.resolve(authdata);
            })
            .catch((error) => {
                console.log('error', error);
                return Promise.reject(error);
            });
    }

    logout() {
        return this.auth.signOut()
            .then(() => {
                return Promise.resolve('Sign out');
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    onLoggedIn(callback) {
        this.auth.$onAuth(function (authData) {
            this.$timeout(function () {
                callback(authData);
            });
        });
    }

    currentUser() {
        return this.auth.currentUser;
    }

    isAuthenticated() {
        return !!this.auth.currentUser;
    }

}


export default module('app.auth', [])
    .service('Auth', AuthFactory);