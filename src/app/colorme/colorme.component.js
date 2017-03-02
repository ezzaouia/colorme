import { module } from 'angular';
import * as _ from 'lodash';
import * as d3 from 'd3';
import template from './colorme.component.html';
import './colorme.component.scss';

import { D3ColorPicker } from '../d3colorpicker/colorpicker.component';

class ColorMeController extends D3ColorPicker {

    constructor($log, $http, $state, $firebaseObject, $scope, firebase, $element, $firebaseArray) {
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
    }

    log(...msg) {
        this.$log.debug(...msg);
    }

    $onInit() {
        super.draw(this.$element[0]);
        const FIREBASE_REF = this.firebase.ref.child('responses');
        this.responses = this.$firebaseArray(FIREBASE_REF)

        this.loadQuestions()
            .then((questions) => {
                this.questions = questions;
                this.currentQuestion = questions[this.currentQuestionIndex];
            });

        
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
        if (!!!(this.currentSelectedColor && this.currentSelectedColor.selectedColor && this.currentSelectedColor.selectedColor)) {
            alert('please select a color for this item');
            return;
        }
        if (this.currentQuestionIndex < _.size(this.questions) - 1) {
            this.currentQuestion = this.questions[++this.currentQuestionIndex];
            super.draw(this.$element[0]);
        }
        else {
            this.log('Yo Yo nice the end is here!!');
            this.$state.go('outro');
        }
    }

    debug() {
        this.currentSelectedColor = Object.assign(this.currentSelectedColor, { question: this.currentQuestion.title })
        this.responses.$add(this.currentSelectedColor);
        this.log(this.currentSelectedColor);
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