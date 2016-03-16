import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators, Control} from 'angular2/common';
import {ProgressComponent} from "../helpers/progress.component";


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
        formBuilder: FormBuilder
    ) {
        this.regForm = formBuilder.group({
            'name': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^[a-zA-Z ]+$')])],
            'email': ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9!._-]+[@]+[a-zA-Z.]+$')])],
            'password': ['', Validators.compose([Validators.minLength(8), Validators.maxLength(1000), hasUpper, hasLower, hasDigit, hasSpecial])]
        });

        this.reqChecks = [
            {name: 'name', value: this.regForm.find('name').valid},
            {name: 'email', value: this.regForm.find('email').valid},
            {name: 'password', value: this.regForm.find('password').valid}
        ]
    }

    // Locals
    regForm: ControlGroup;
    name: string;
    email: string;
    password: string;

    reqChecks: any;

    // Determines if the error-messages should be visible
    showHelpers(value: string, element) {
        let temp = this.regForm.find(value);
        return temp.pristine;
    }

    valueChange(name: string) {
        let temp = this.regForm.find(name).valid;
        this.reqChecks.forEach(a=> {
            if(a.name == name && a.value != temp) a.value = temp
        })
    }

    onSubmit(value) {
        console.log(value);
        console.log(this.regForm.find('name'))
    }
}