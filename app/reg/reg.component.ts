import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators, Control} from 'angular2/common';
import {ProgressComponent} from "../helpers/progress.component";
import {NotificationsService} from "angular2-notifications/components";


// Password Validators
function hasUpper(control: Control): { [s: string]: boolean } {
    if (control.value && !control.value.match(/^(?=.*[A-Z]).+$/)) {
        return {hasUpper: true};
    }
}

function hasLower(control: Control): { [s: string]: boolean } {
    if (control.value && !control.value.match(/^(?=.*[a-z]).+$/)) {
        return {hasLower: true};
    }
}

function hasDigit(control: Control): { [s: string]: boolean } {
    if (control.value && !control.value.match(/^(?=.*[0-9]).+$/)) {
        return {hasDigit: true};
    }
}

function hasSpecial(control: Control): { [s: string]: boolean } {
    if (control.value && !control.value.match(/^(?=.*[*!@$#?=&%]).+$/)) {
        return {hasSpecial: true};
    }
}


@Component({
    selector: 'app-reg',
    templateUrl: 'app/reg/reg.html',
    directives: [
        // Angular
        CORE_DIRECTIVES,
        FORM_DIRECTIVES,
        // App
        ProgressComponent
    ],
})
export class RegComponent {
    constructor(
        formBuilder: FormBuilder,
        private _notificationService: NotificationsService
    ) {
        this.regForm = formBuilder.group({
            'name': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^[a-zA-Z ]+$')])],
            'email': ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9!._-]+[@]+[a-zA-Z.]+$')])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(1000), hasUpper, hasLower, hasDigit, hasSpecial])],
            'employer': ['', Validators.pattern('^[a-zA-Z0-9 .]+$')],
            'position': ['', Validators.pattern('^[a-zA-Z0-9 .]+$')],
            'fruit': ['', Validators.pattern('^[a-zA-Z ]+$')],
            'num': ['', Validators.pattern('^[0-9]+$')],
            'year': ['', Validators.pattern('\b(\d|[0-9][0-2]|[0-9][0-9][0-9]|[0-2][0][0-1][0-6])\b')],
            'throne': ['', Validators.pattern('^[a-zA-Z0-9!._-]+[@]+[a-zA-Z.]+$')],
        });

        this.reqChecks = [
            {name: 'name', value: this.regForm.find('name').valid},
            {name: 'email', value: this.regForm.find('email').valid},
            {name: 'password', value: this.regForm.find('password').valid}
        ];

        this.optChecks = [
            {name: 'employer', value: this.regForm.find('employer').valid},
            {name: 'position', value: this.regForm.find('position').valid},
            {name: 'fruit', value: this.regForm.find('fruit').valid},
            {name: 'num', value: this.regForm.find('num').valid},
            {name: 'year', value: this.regForm.find('year').valid},
            {name: 'throne', value: this.regForm.find('throne').valid}
        ]
    }

    // Locals
    regForm: ControlGroup;

    // Required fields
    name: string;
    email: string;
    password: string;
    reqChecks: any;

    // Optional fields
    employer: string;
    position: string;
    fruit: string;
    num: number;
    year: number;
    throne: string;
    optChecks: any;

    // Determines if the error-messages should be visible
    showHelpers(value:string) {
        let temp = this.regForm.find(value);
        if(temp.touched && !temp.valid) return false;
        else if(temp.pristine) return true;
        else if(!temp.valid) return false;
        else if(temp.valid) return true;
    }

    valueChange(name: string, checkReq: boolean) {
        let temp = this.regForm.find(name).valid;
        if(checkReq) {
            this.reqChecks.forEach(a=> {
                if(a.name == name && a.value != temp) a.value = temp
            })
        } else {
            this.optChecks.forEach(a=> {
                if(a.name == name && a.value != temp) a.value = temp
            })
        }
    }

    onSubmit(value) {
        console.log(value);
        this._notificationService.success('Success', 'You created an account!')
    }
}