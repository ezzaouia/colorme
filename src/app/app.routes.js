import { module } from 'angular';

function routeConfig($urlRouterProvider, $stateProvider, $locationProvider) {
  'ngInject';

  //$locationProvider.html5Mode(true).hashPrefix('!');

  $stateProvider

    .state('home', {
      url: '/intro',
      component: 'home'
    })
    .state('admin', {
      url: '/admin',
      component: 'admin'
    })
    .state('outro', {
      url: '/outro',
      component: 'outro'
    });

  $urlRouterProvider.otherwise('/intro');

}

export default module('app.routes', ['ui.router'])
  .config(routeConfig);
