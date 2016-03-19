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
var components_1 = require("angular2-notifications/components");
var common_1 = require("angular2/common");
var progress_component_1 = require("../helpers/progress.component");
function biggerThenStart(start, end) {
    if (start < end) {
        return { biggerThenStart: true };
    }
}
var MeetsComponent = (function () {
    function MeetsComponent(formBuilder, _notificationService) {
        this._notificationService = _notificationService;
        this.meets = [];
        this.meetForm = formBuilder.group({
            'name': ['', common_1.Validators.compose([common_1.Validators.required, common_1.Validators.minLength(2), common_1.Validators.maxLength(50), common_1.Validators.pattern('^[a-zA-Z ]+$')])],
            'host': ['', common_1.Validators.compose([common_1.Validators.required, common_1.Validators.minLength(2), common_1.Validators.maxLength(50), common_1.Validators.pattern('^[a-zA-Z ]+$')])],
            'type': ['', common_1.Validators.compose([common_1.Validators.required, common_1.Validators.minLength(2), common_1.Validators.maxLength(50), common_1.Validators.pattern('^[a-zA-Z ]+$')])],
            'location': ['', common_1.Validators.required],
            'start': ['', common_1.Validators.required],
            'end': ['', common_1.Validators.required]
        });
        this.meetChecks = [
            { name: 'name', value: this.meetForm.find('name').valid },
            { name: 'type', value: this.meetForm.find('type').valid },
            { name: 'start', value: this.meetForm.find('start').valid },
            { name: 'end', value: this.meetForm.find('end').valid },
            { name: 'host', value: this.meetForm.find('host').valid },
            { name: 'location', value: this.meetForm.find('location').valid }
        ];
        this.meets.push({ name: 'Some Event', type: 'Party', host: 'Man', start: new Date("November 14 2016 09:13:00"), end: new Date("November 14 2016 11:13:00"), location: 'Osijek, Croatia' }, { name: 'My Party', type: 'Birthday Party', host: 'John', start: new Date("October 9 2016 17:00:00"), end: new Date("October 10 2016 09:00:00"), location: 'Osijek, Croatia' }, { name: 'Fishing', type: 'Fishing', host: 'John', start: new Date("October 11 2016 09:00:00"), end: new Date("October 15 2016 09:00:00"), location: 'Osijek, Croatia', message: 'Worms have feelings two.' });
    }
    MeetsComponent.prototype.ngOnInit = function () {
        this.initAutocomplete();
    };
    MeetsComponent.prototype.onSubmit = function () {
        this.meets.push({
            name: this.name,
            type: this.type,
            host: this.host,
            start: new Date(this.start),
            end: new Date(this.end),
            location: this.location,
            message: this.message
        });
        this._notificationService.success('Success', 'Meet created!');
    };
    MeetsComponent.prototype.showHelpers = function (value) {
        var temp = this.meetForm.find(value);
        if (temp.touched && !temp.valid)
            return false;
        else if (temp.pristine)
            return true;
        else if (!temp.valid)
            return false;
        else if (temp.valid)
            return true;
    };
    MeetsComponent.prototype.valueChange = function (name, is) {
        var _this = this;
        var temp = this.meetForm.find(name).valid;
        this.meetChecks.forEach(function (a) {
            if (a.name == name && a.value != temp) {
                if (is)
                    a.value = _this.validEnd();
                else
                    a.value = temp;
            }
        });
    };
    MeetsComponent.prototype.validEnd = function () {
        return this.start < this.end;
    };
    MeetsComponent.prototype.geolocate = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var geolocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                var circle = new google.maps.Circle({
                    center: geolocation,
                    radius: position.coords.accuracy
                });
                this.autocomplete.setBounds(circle.getBounds());
            });
        }
    };
    MeetsComponent.prototype.initAutocomplete = function () {
        this.autocomplete = new google.maps.places.Autocomplete((document.getElementById('location')), { types: ['geocode'] });
    };
    MeetsComponent = __decorate([
        core_1.Component({
            selector: 'app-meets',
            pipes: [common_1.DatePipe],
            directives: [
                common_1.CORE_DIRECTIVES,
                common_1.FORM_DIRECTIVES,
                progress_component_1.ProgressComponent
            ],
            templateUrl: 'http://flauc.github.io/udacityMeetUpAngular2/app/meets/meets.html'
        }), 
        __metadata('design:paramtypes', [common_1.FormBuilder, components_1.NotificationsService])
    ], MeetsComponent);
    return MeetsComponent;
}());
exports.MeetsComponent = MeetsComponent;
