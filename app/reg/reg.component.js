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
var common_1 = require('angular2/common');
var progress_component_1 = require("../helpers/progress.component");
var components_1 = require("angular2-notifications/components");
function hasUpper(control) {
    if (control.value && !control.value.match(/^(?=.*[A-Z]).+$/)) {
        return { hasUpper: true };
    }
}
function hasLower(control) {
    if (control.value && !control.value.match(/^(?=.*[a-z]).+$/)) {
        return { hasLower: true };
    }
}
function hasDigit(control) {
    if (control.value && !control.value.match(/^(?=.*[0-9]).+$/)) {
        return { hasDigit: true };
    }
}
function hasSpecial(control) {
    if (control.value && !control.value.match(/^(?=.*[*!@$#?=&%]).+$/)) {
        return { hasSpecial: true };
    }
}
var RegComponent = (function () {
    function RegComponent(formBuilder, _notificationService) {
        this._notificationService = _notificationService;
        this.regForm = formBuilder.group({
            'name': ['', common_1.Validators.compose([common_1.Validators.required, common_1.Validators.minLength(3), common_1.Validators.maxLength(20), common_1.Validators.pattern('^[a-zA-Z ]+$')])],
            'email': ['', common_1.Validators.compose([common_1.Validators.required, common_1.Validators.pattern('^[a-zA-Z0-9!._-]+[@]+[a-zA-Z.]+$')])],
            'password': ['', common_1.Validators.compose([common_1.Validators.required, common_1.Validators.minLength(8), common_1.Validators.maxLength(1000), hasUpper, hasLower, hasDigit, hasSpecial])],
            'employer': ['', common_1.Validators.pattern('^[a-zA-Z0-9 .]+$')],
            'position': ['', common_1.Validators.pattern('^[a-zA-Z0-9 .]+$')],
            'fruit': ['', common_1.Validators.pattern('^[a-zA-Z ]+$')],
            'num': ['', common_1.Validators.pattern('^[0-9]+$')],
            'year': ['', common_1.Validators.pattern('\b(\d|[0-9][0-2]|[0-9][0-9][0-9]|[0-2][0][0-1][0-6])\b')],
            'throne': ['', common_1.Validators.pattern('^[a-zA-Z0-9!._-]+[@]+[a-zA-Z.]+$')],
        });
        this.reqChecks = [
            { name: 'name', value: this.regForm.find('name').valid },
            { name: 'email', value: this.regForm.find('email').valid },
            { name: 'password', value: this.regForm.find('password').valid }
        ];
        this.optChecks = [
            { name: 'employer', value: this.regForm.find('employer').valid },
            { name: 'position', value: this.regForm.find('position').valid },
            { name: 'fruit', value: this.regForm.find('fruit').valid },
            { name: 'num', value: this.regForm.find('num').valid },
            { name: 'year', value: this.regForm.find('year').valid },
            { name: 'throne', value: this.regForm.find('throne').valid }
        ];
    }
    RegComponent.prototype.showHelpers = function (value) {
        var temp = this.regForm.find(value);
        if (temp.touched && !temp.valid)
            return false;
        else if (temp.pristine)
            return true;
        else if (!temp.valid)
            return false;
        else if (temp.valid)
            return true;
    };
    RegComponent.prototype.valueChange = function (name, checkReq) {
        var temp = this.regForm.find(name).valid;
        if (checkReq) {
            this.reqChecks.forEach(function (a) {
                if (a.name == name && a.value != temp)
                    a.value = temp;
            });
        }
        else {
            this.optChecks.forEach(function (a) {
                if (a.name == name && a.value != temp)
                    a.value = temp;
            });
        }
    };
    RegComponent.prototype.onSubmit = function (value) {
        this._notificationService.success('Success', 'You created an account!');
    };
    RegComponent = __decorate([
        core_1.Component({
            selector: 'app-reg',
            templateUrl: 'http://flauc.github.io/udacityMeetUpAngular2/app/reg/reg.html',
            directives: [
                common_1.CORE_DIRECTIVES,
                common_1.FORM_DIRECTIVES,
                progress_component_1.ProgressComponent
            ],
        }), 
        __metadata('design:paramtypes', [common_1.FormBuilder, components_1.NotificationsService])
    ], RegComponent);
    return RegComponent;
}());
exports.RegComponent = RegComponent;
