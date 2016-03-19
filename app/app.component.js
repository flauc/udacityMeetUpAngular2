"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var router_1 = require("angular2/router");
var meets_component_1 = require("./meets/meets.component");
var reg_component_1 = require("./reg/reg.component");
var components_1 = require("angular2-notifications/components");
var AppComponent = (function () {
    function AppComponent() {
        this.options = {
            timeOut: 5000,
            lastOnBottom: false,
            clickToClose: true,
            maxLength: 0,
            maxStack: 5,
            showProgressBar: true,
            pauseOnHover: true,
            preventDuplicates: true,
            preventLastDuplicates: false
        };
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app',
            template: "\n        <header>\n            <nav class=\"sl-nav\">\n                <ul>\n                    <li [routerLink]=\"['Reg']\">\n                        <i class=\"material-icons\">&#xE87C;</i>\n                        <span>Create Account</span>\n                    </li>\n                    <li [routerLink]=\"['Meets']\">\n                        <i class=\"material-icons\">&#xE567;</i>\n                        <span>Meets</span>\n                    </li>\n                </ul>\n            </nav>\n        </header>\n        <main>\n            <router-outlet></router-outlet>\n            <simple-notifications [options]=\"options\"></simple-notifications>\n        </main>\n        <footer>\n\n        </footer>\n    ",
            directives: [router_1.ROUTER_DIRECTIVES, components_1.SimpleNotificationsComponent]
        }),
        router_1.RouteConfig([
            { path: '/', name: 'Meets', component: meets_component_1.MeetsComponent, useAsDefault: true },
            { path: '/register', name: 'Reg', component: reg_component_1.RegComponent },
            { path: '/**', redirectTo: ['Meets'] }
        ]), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
