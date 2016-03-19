import {Component} from 'angular2/core';
import {NotificationsService} from "angular2-notifications/components";
import {FormBuilder, ControlGroup, Validators, Control} from "angular2/common";
import {Meet} from "../helpers/meet.interface";

// Validators
function biggerThenStart(start: Date, end: Date): { [s: string]: boolean } {
    if (start < end) {
        return {biggerThenStart: true};
    }
}

@Component({
    selector: 'app-meets',
    templateUrl: 'app/meets/meets.html'
})
export class MeetsComponent {
    constructor(
        formBuilder: FormBuilder,
        private _notificationService: NotificationsService
    ) {
        this.meetForm = formBuilder.group({
            'name': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]+$')])],
            'host': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]+$')])],
            'start': ['', Validators.required],
            'end': ['', Validators.required]
        });

        this.meetChecks = [
            {name: 'name', value: this.meetForm.find('name').valid},
            {name: 'host', value: this.meetForm.find('host').valid},
            {name: 'start', value: this.meetForm.find('start').valid},
            {name: 'end', value: this.meetForm.find('end').valid},
        ]
    }

    // Locals
    meets: Meet[] = [];
    meetForm: ControlGroup;
    meetChecks: any;
    
    // Meet
    name: string;
    type: string;
    start: Date;
    end: Date;
    location: any;
    message: string;

    onSubmit() {
    }

    // Determines if the error-messages should be visible
    showHelpers(value:string) {
        let temp = this.meetForm.find(value);

        if(temp.touched && !temp.valid) return false;
        else if(temp.pristine) return true;
        else if(!temp.valid) return false;
        else if(temp.valid) return true;
    }

    valueChange(name: string, checkReq: boolean) {
        let temp = this.meetForm.find(name).valid;
        this.meetChecks.forEach(a=> {
            if(a.name == name && a.value != temp) a.value = temp
        })
    }
}