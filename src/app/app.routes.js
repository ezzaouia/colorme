import { module } from 'angular';

function routeConfig($urlRouterProvider, $stateProvider, $locationProvider) {
  'ngInject';

  //$locationProvider.html5Mode(true).hashPrefix('!');

  $stateProvider
   
    .state('home', {
      url: '/',
      component: 'home'
    })
    .state('admin', {
      url: '/admin',
      component: 'admin'
    });

  $urlRouterProvider.otherwise('/');

}

export default module('app.routes', ['ui.router'])
  .config(routeConfig);
