import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators, Control} from 'angular2/common';


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
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
})
export class RegComponent {
    constructor(
        formBuilder: FormBuilder
    ) {
        this.regForm = formBuilder.group({
            'name': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^[a-zA-Z ]+$')])],
            'email': ['', Validators.required],
            'password': ['', Validators.required]
        })
    }

    // Locals
    regForm: ControlGroup;
    name: string;
    email: string;
    password: string;

    onSubmit(value) {
        console.log(value);
        console.log(this.regForm.find('name'))
    }
}