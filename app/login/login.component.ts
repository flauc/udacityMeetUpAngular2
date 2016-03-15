import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators} from 'angular2/common';

@Component({
    selector: 'app-login',
    templateUrl: 'app/login/login.html',
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
})
export class LoginComponent {
    constructor(
        formBuilder: FormBuilder
    ) {
        this.loginForm = formBuilder.group({
            'name': ['', Validators.required],
            'email': ['', Validators.required],
            'password': ['', Validators.required]
        })
    }

    // Locals
    loginForm: ControlGroup;
    name: string;
    email: string;
    password: string;

    onSubmit(value) {
        console.log(value);
    }
}