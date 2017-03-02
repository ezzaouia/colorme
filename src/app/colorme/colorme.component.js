import { module } from 'angular';
import * as _ from 'lodash';

import template from './colorme.component.html';
import './colorme.component.scss';

class ColorMeController {

    constructor($log, $http, $state) {
        'ngInject'
        this.$log = $log.getInstance(ColorMeController.name);
        this.$http = $http;
        this.currentQuestionIndex = 0;
        this.$state = $state;
    }

    log(...msg) {
        this.$log.debug(...msg);
    }

    $onInit() {
        this.loadQuestions()
            .then((questions) => {
                this.questions = questions;
                this.currentQuestion = questions[this.currentQuestionIndex];
            })
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