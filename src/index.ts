let angular: ng.IAngularStatic = require('angular');

require('@angular/router/angular1/angular_1_router.js');

export const app = angular.module('rxjs-examples-app', [
    'ngComponentRouter',
]);

app.config(['$locationProvider', function($locationProvider) {
        $locationProvider
            .html5Mode(false)
            .hashPrefix('!')
        ;
    }])
    .value('$routerRootComponent', 'rxjsRouteAppIndex');

export interface AppModule
{
    components?: ng.IComponentController[],
    factories?: any[],
    directives?: any[],
    routes?: ng.IComponentController[],
    services?: Function[],
    pipes?: Function[],
}

import {APP_MAIN_MODULE} from "./app/main/index";

export const APP_MODULES = [
    APP_MAIN_MODULE,
];