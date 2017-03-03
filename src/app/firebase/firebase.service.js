import { module } from 'angular';
import Firebase from 'firebase';

let config = {

    apiKey: FRB_API_KEY,
    authDomain: FRB_AUTHDOMAIN,
    databaseURL: FRB_DATABASEURL,
    storageBucket: FRB_STORAGEBUCKET,
    messagingSenderId: FRB_MESSAGINGSENDERID,
};

Firebase.initializeApp(config);

const ref = Firebase.database().ref();
//Firebase.database.enableLogging(true);

class FirebaseService {
    constructor() {
        this.ref = ref;
    }

}


export default module('app.firebase', []).service('firebase', FirebaseService)