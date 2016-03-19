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
var ProgressComponent = (function () {
    function ProgressComponent() {
    }
    ProgressComponent.prototype.ngOnInit = function () {
        this.progressWidth = 100 / this.checks.length;
    };
    ProgressComponent.prototype.shouldShow = function (value, index) {
        var toReturn = false;
        if (value) {
            toReturn = true;
            for (var i = 0; i < index; i++) {
                if (!this.checks[i].value)
                    toReturn = false;
            }
        }
        return toReturn;
    };
    ProgressComponent = __decorate([
        core_1.Component({
            selector: 'app-progress',
            inputs: ['checks'],
            encapsulation: core_1.ViewEncapsulation.None,
            template: "\n        <div class=\"progress\" [hidden]=\"showProgress\">\n            <span [ngStyle]=\"{'width': progressWidth + '%'}\" *ngFor=\"#a of checks;  #i = index\" [hidden]=\"!shouldShow(a.value,i)\"></span>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], ProgressComponent);
    return ProgressComponent;
}());
exports.ProgressComponent = ProgressComponent;
