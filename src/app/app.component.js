import { module } from 'angular';

import AppTheme from './app.theme';
import AppRoutes from './app.routes';

import ToolbarComponent from './toolbar/toolbar.component';
import HomeComponent from './home/home.component';
import AdminComponent from './admin/admin.component';
import D3ColorPickerComponent from './d3colorpicker/colorpicker.component';
import ColorMeComponent from './colorme/colorme.component';
import OutroComponent from './outro/outro.component';

export default module('app', [
    'ngMaterial',
    'angular-logger',
    AppTheme.name,
    AppRoutes.name,
    ToolbarComponent.name,
    HomeComponent.name,
    AdminComponent.name,
    D3ColorPickerComponent.name,
    ColorMeComponent.name,
    OutroComponent.name,
]).component('app', {
    template: `<md-content ng-cloak><div ui-view></div></md-content>`,
    restrict: 'E'
})