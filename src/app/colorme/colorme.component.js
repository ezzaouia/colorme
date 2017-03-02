import { module } from 'angular';
import * as _ from 'lodash';
import template from './colorme.component.html';
import './colorme.component.scss';

class ColorMeController {

    constructor($log, $http, $state, $firebaseObject, $scope, firebase) {
        'ngInject'
        this.$log = $log.getInstance(ColorMeController.name);
        this.$http = $http;
        this.currentQuestionIndex = 0;
        this.$state = $state;
        this.$firebaseObject = $firebaseObject;
        this.$scope = $scope;
        this.firebase = firebase;
    }

    log(...msg) {
        this.$log.debug(...msg);
    }

    $onInit() {
        const FIREBASE_REF = this.firebase.ref;

        this.loadQuestions()
            .then((questions) => {
                this.questions = questions;
                this.currentQuestion = questions[this.currentQuestionIndex];
            });

        let syncObject = this.$firebaseObject(FIREBASE_REF);
        syncObject.$bindTo(this.$scope, 'data');
    }

    loadQuestions() {
        return this.$http.
            get('./assets/data/questions.json')
            .then((res) => {
                return Promise.resolve(res.data);
            });
    }

    next() {
        this.log('next fired');
        if (this.currentQuestionIndex < _.size(this.questions) - 1)
            this.currentQuestion = this.questions[++this.currentQuestionIndex];
        else {
            this.log('Yo Yo nice the end is here!!');
            this.$state.go('outro');
        }
    }
}

const ColorMeComponent = {
    template,
    restricted: 'E',
    controllerAs: 'colorme',
    controller: ColorMeController,
};

export default module('app.colorme', [])
    .component('colorme', ColorMeComponent);