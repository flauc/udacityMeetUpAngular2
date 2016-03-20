import {Component} from 'angular2/core';
import {NotificationsService} from "angular2-notifications/components";
import {
    FormBuilder, ControlGroup, Validators, Control, DatePipe, CORE_DIRECTIVES,
    FORM_DIRECTIVES
} from "angular2/common";
import {Meet} from "../helpers/meet.interface";
import {ProgressComponent} from "../helpers/progress.component";

// Validators
function biggerThenStart(start: Date, end: Date): { [s: string]: boolean } {
    if (start < end) {
        return {biggerThenStart: true};
    }
}

@Component({
    selector: 'app-meets',
    pipes: [DatePipe],
    directives: [
        // Angular
        CORE_DIRECTIVES,
        FORM_DIRECTIVES,
        // App
        ProgressComponent
    ],
    templateUrl: 'app/meets/meets.html'
})
export class MeetsComponent {
    constructor(
        formBuilder: FormBuilder,
        private _notificationService: NotificationsService
    ) {
        this.meetForm = formBuilder.group({
            'name': ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]+$')])],
            'host': ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]+$')])],
            'type': ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]+$')])],
            'location': ['', Validators.required],
            'start': ['', Validators.required],
            'end': ['', Validators.required],
            'guestList': ['', Validators.pattern('^[a-zA-Z ]+(?:,[a-zA-Z ]+)*$')]
        });



        this.meetChecks = [
            {name: 'name', value: this.meetForm.find('name').valid},
            {name: 'type', value: this.meetForm.find('type').valid},
            {name: 'start', value: this.meetForm.find('start').valid},
            {name: 'end', value: this.meetForm.find('end').valid},
            {name: 'host', value: this.meetForm.find('host').valid},
            {name: 'location', value: this.meetForm.find('location').valid}
        ];

        // Add a few meets
        this.meets.push(
            {name: 'Some Event', type: 'Party', host: 'Man', start: new Date("November 14 2016 09:13:00"), end: new Date("November 14 2016 11:13:00"), location: 'Osijek, Croatia'},
            {name: 'My Party', type: 'Birthday Party', host: 'John', start: new Date("October 9 2016 17:00:00"), end: new Date("October 10 2016 09:00:00"), location: 'Osijek, Croatia'},
            {name: 'Fishing', type: 'Fishing', host: 'John', start: new Date("October 11 2016 09:00:00"), end: new Date("October 15 2016 09:00:00"), location: 'Osijek, Croatia', message: 'Worms have feelings two.', guestList: ['Filip', 'Marko', 'Tony']}
        )
    }

    ngOnInit() {
        this.initAutocomplete();
    }

    // Locals
    meets: Meet[] = [];
    meetForm: ControlGroup;
    meetChecks: any;
    
    // Meet Model
    name: string;
    type: string;
    host: string;
    start: any;
    end: any;
    location: any;
    message: string;
    guestList: string;

    onSubmit() {
        this.meets.push({
            name: this.name,
            type: this.type,
            host: this.host,
            start: new Date(this.start),
            end: new Date(this.end),
            location: this.location,
            message: this.message,
            guestList: this.guestList ? this.guestList.split(',') : null
        });
        
        console.log({
            name: this.name,
            type: this.type,
            host: this.host,
            start: new Date(this.start),
            end: new Date(this.end),
            location: this.location,
            message: this.message,
            guestList: this.guestList ? this.guestList.split(',') : null
        });
        this._notificationService.success('Success', 'Meet created!')
    }

    // Determines if the error-messages should be visible
    showHelpers(value:string) {
        let temp = this.meetForm.find(value);

        if(temp.touched && !temp.valid) return false;
        else if(temp.pristine) return true;
        else if(!temp.valid) return false;
        else if(temp.valid) return true;
    }

    valueChange(name: string, is: boolean) {
        let temp = this.meetForm.find(name).valid;
        this.meetChecks.forEach(a=> {
            if(a.name == name && a.value != temp) {
                if(is) a.value = this.validEnd();
                else a.value = temp    
            }
        })
    }
    
    validEnd() {
        return this.start < this.end;
    }


    // Google maps
    private autocomplete;


    geolocate() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
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
    }

    initAutocomplete() {
        // Create the autocomplete object, restricting the search to geographical
        // location types.
        this.autocomplete = new google.maps.places.Autocomplete(
            (document.getElementById('location')),
            {types: ['geocode']});
    }
}