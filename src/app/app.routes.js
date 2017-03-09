import { module } from 'angular';

function routeConfig($urlRouterProvider, $stateProvider, $locationProvider) {
  'ngInject';

  //$locationProvider.html5Mode(true).hashPrefix('!');

  $stateProvider

    .state('signin', {
      url: '/auth',
      component: 'signin',
    })
    .state('home', {
      url: '/',
      component: 'home',
    })
    .state('admin', {
      url: '/admin',
      component: 'admin',
    })
    .state('colorme', {
      url: '/colorme',
      component: 'colorme',
      params: {
        'useruid': '',
        'colormezid': '',
      },
    })
    .state('outro', {
      url: '/outro',
      component: 'outro'
    });

  $urlRouterProvider.otherwise('/');

}

export default module('app.routes', ['ui.router'])
  .config(routeConfig)
  .run(function ($rootScope, $location, $transitions, Auth, firebase) {
    $transitions.onStart({ to: 'admin' }, function (trans) {
      if (!Auth.isAuthenticated()) {
        return trans.router.stateService.target('signin');
      }
    });
  })
