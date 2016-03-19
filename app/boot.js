"use strict";
var browser_1 = require('angular2/platform/browser');
var router_1 = require('angular2/router');
var app_component_1 = require("./app.component");
var components_1 = require("angular2-notifications/components");
browser_1.bootstrap(app_component_1.AppComponent, [
    router_1.ROUTER_PROVIDERS,
    components_1.NotificationsService
]);
