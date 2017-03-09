import { module } from 'angular';
import * as _ from 'lodash';
import * as d3 from 'd3';
import template from './colorme.component.html';
import './colorme.component.scss';

import { D3ColorPicker } from '../d3colorpicker/colorpicker.component';

class ColorMeController extends D3ColorPicker {

    constructor($log, $http, $state, $firebaseObject, $scope, firebase, $element, $firebaseArray, $mdToast, $stateParams) {
        'ngInject'
        super();
        this.$log = $log.getInstance(ColorMeController.name);
        this.$http = $http;
        this.currentQuestionIndex = 0;
        this.$state = $state;
        this.$firebaseObject = $firebaseObject;
        this.$firebaseArray = $firebaseArray;
        this.$scope = $scope;
        this.firebase = firebase;
        this.selectedColor;
        this.$element = $element;
        this.currentSelectedQuestionColor = null;
        this.$mdToast = $mdToast;
        this.$stateParams = $stateParams;
        this.currentquestiontextarea = '';
    }

    log(...msg) {
        this.$log.debug(...msg);
    }

    $onInit() {
        if (!!!(this.$stateParams && this.$stateParams.colormezid)) {
            this.$state.go('home');
            return;
        }
        super.draw(this.$element[0]);
        /** responses collection */
        const RESP_FIREBASE_REF = this.firebase.ref.child('responses');

        /** user colormez app object */
        const USER_APP_FIREBASE_REF = this.firebase.ref.child('colormezz').child(`${this.$stateParams.colormezid}`)

        const USER_APP_FIREBASE_ITEMS = this.firebase.ref.child('colormezz').child(`${this.$stateParams.colormezid}/items`)
        
        this.responses = this.$firebaseArray(RESP_FIREBASE_REF);
        
        this.userColormez = this.$firebaseObject(USER_APP_FIREBASE_REF);
        this.questions = this.$firebaseArray(USER_APP_FIREBASE_ITEMS);

        this.questions.$loaded()
            .then((items) => {
                this.questions = items;
                this.currentQuestion = items[this.currentQuestionIndex];
                this.currentQuestion['userdescription'] = '';
            }).catch((err) => {
                console.log('Help some error fire up!! ', err);
            });
    }

    loadQuestions() {
        return this.$http.
            get('./assets/data/questions.json')
            .then((res) => {
                return Promise.resolve(res.data);
            });

        this.$stateParams.userId
    }

    next() {
        if (!!!(this.currentSelectedColor && this.currentSelectedColor.selectedColor && this.currentSelectedColor.selectedColor)) {
            this.showSimpleToast('Please select a color!')
            return;
        }

        /** First save current color in db */
        this.save();

        /** move to the next */
        if (this.currentQuestionIndex < _.size(this.questions) - 1) {
            this.currentQuestion = this.questions[++this.currentQuestionIndex];
            this.currentquestiontextarea = '';
            super.draw(this.$element[0]);
        }
        else {
            this.showSimpleToast('Thank You!!')
            this.$state.go('outro');
        }
    }

    save() {
        console.log('this.currentquestiontextarea', this.currentquestiontextarea);

        this.currentSelectedColor = Object.assign(
            this.currentSelectedColor,
            { question: this.currentQuestion.title },
            { clientId: window.clientId },
            { colormeid: this.$stateParams.colormezid },
            { description: this.currentquestiontextarea })
        this.responses.$add(this.currentSelectedColor);
    }

    showSimpleToast(msg) {
        this.$mdToast.show(
            this.$mdToast.simple()
                .textContent(msg)
                .position('top right')
                .hideDelay(3000)
        );
    }
}

const ColorMeComponent = {
    template,
    restricted: 'E',
    controllerAs: 'colorme',
    controller: ColorMeController,
    // bindings: {
    //     currentquestiontextarea: '<',
    // },
};

export default module('app.colorme', [])
    .component('colorme', ColorMeComponent);