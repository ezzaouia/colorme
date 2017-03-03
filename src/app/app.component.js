import { module } from 'angular';

import AppTheme from './app.theme';
import AppRoutes from './app.routes';

import ToolbarComponent from './toolbar/toolbar.component';
import HomeComponent from './home/home.component';
import AdminComponent from './admin/admin.component';
import D3ColorPickerComponent from './d3colorpicker/colorpicker.component';
import ColorMeComponent from './colorme/colorme.component';
import OutroComponent from './outro/outro.component';
import FirebaseService from './firebase/firebase.service';


export default module('app', [
    'ngMaterial',
    'angular-logger',
    'firebase',
    'pascalprecht.translate',
    AppTheme.name,
    AppRoutes.name,
    ToolbarComponent.name,
    HomeComponent.name,
    AdminComponent.name,
    D3ColorPickerComponent.name,
    ColorMeComponent.name,
    OutroComponent.name,
    FirebaseService.name,

]).component('app', {
    template: `<md-content ng-cloak><div ui-view></div></md-content>`,
    restrict: 'E',
})
    .config(['$translateProvider', function ($translateProvider) {
        $translateProvider.translations('en', {
            'toolbar.html.appname': 'ColorMe!',
            'colorme.html.title.fear': 'fear',
            'colorme.html.title.anger': 'anger',
            'colorme.html.title.happiness': 'happiness',
            'colorme.html.title.sadness': 'sadness',
            'colorme.html.title.neutral': 'neutral',
            'colorme.html.title.contempt': 'contempt',
            'colorme.html.title.disgust': 'disgust',
            'colorme.html.title.surprise': 'surprise',

            'colorme.html.description.fear': 'A shy or timid person. This personality type is likely to avoid risks and uncomfortable situations. Timid people may perceive the world as full of difficult situations.',
            'colorme.html.description.anger': 'A hostile person is often angry and is known to others for the frequency of anger responses to the world. Often anger occurs with any frustration; the threshold for frustration is low. Hostile people may experience regret afterward and apologize for their anger, but nevertheless continue to respond angrily. Sometimes hostile people express their anger in a nasty way, using words to demean and cause psychological pain to others.',
            'colorme.html.description.happiness': 'A cheerful person may also be thought of as optimistic. This person sees the world in positive way and can easily be made to laugh and feel enjoyment.',
            'colorme.html.description.sadness': 'A somber person who is often feeling low may have clinical depression or may simply have more frequent feelings of sadness. This person may hold the perspective that life is hard and difficult.',
            'colorme.html.description.neutral': 'neutral',
            'colorme.html.description.contempt': 'The last emotion to appear in child development, it is a feeling of moral superiority to the target. Often mixed with enjoyment.',
            'colorme.html.description.disgust': 'A person who often feels disgusted by others may have an inflated sense of self-worth and a hyper-aversion toward others. Someone who is disgusted or dissatisfied with everything can be unpleasant to be around.',
            'colorme.html.description.surprise': 'The briefest emotion, surprise is triggered by the sudden occurrence of an unexpected event. It is often a way station that leads, after more appraisal, to any of the other emotions.',
        });
        $translateProvider.translations('fr', {
            'toolbar.html.appname': 'ColorMe!',
            'colorme.html.title.fear': 'peur',
            'colorme.html.title.anger': 'colère',
            'colorme.html.title.happiness': 'bonheur',
            'colorme.html.title.sadness': 'tristesse',
            'colorme.html.title.neutral': 'neutre',
            'colorme.html.title.contempt': 'mépris',
            'colorme.html.title.disgust': 'dégout',
            'colorme.html.title.surprise': 'surprise',

            'colorme.html.description.fear': 'peur',
            'colorme.html.description.anger': 'colère',
            'colorme.html.description.happiness': 'bonheur',
            'colorme.html.description.sadness': 'tristesse',
            'colorme.html.description.neutral': 'neutre',
            'colorme.html.description.contempt': 'mépris',
            'colorme.html.description.disgust': 'dégout',
            'colorme.html.description.surprise': 'surprise',
        });


        $translateProvider.preferredLanguage('en');
    }]);