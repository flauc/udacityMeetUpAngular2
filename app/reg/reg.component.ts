import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators, Control} from 'angular2/common';
import {ProgressComponent} from "../helpers/progress.component";


////// Validators


// Name Validators
function nameValidator(control: Control): { [s: string]: boolean } {
    if (control.value && !control.value.match(/^[a-zA-Z ]{3,20}$/)) {
        return {invalidName: true};
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
            'password': ['', Validators.required]
        });

        this.checks = [
            this.regForm.find('name').valid,
            this.regForm.find('email').valid,
            this.regForm.find('password').valid
        ]
    }


    ngOnChanges(val, val1) {
        console.log(val, val1);
    }

    // Locals
    regForm: ControlGroup;
    name: string;
    email: string;
    password: string;

    checks: boolean[];

    // Determines if the error-messages should be visible
    showHelpers(value: string, element) {
        let temp = this.regForm.find(value);
        return temp.pristine;
    }

    onSubmit(value) {
        console.log(value);
        console.log(this.regForm.find('name'))
    }
}