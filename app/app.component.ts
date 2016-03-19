import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {MeetsComponent} from "./meets/meets.component";
import {RegComponent} from "./reg/reg.component";
import {SimpleNotificationsComponent} from "angular2-notifications/components";

@Component({
    selector: 'app',
    template: `
        <header>
            <nav class="sl-nav">
                <ul>
                    <li [routerLink]="['Reg']">
                        <i class="material-icons">&#xE87C;</i>
                        <span>Create Account</span>
                    </li>
                    <li [routerLink]="['Meets']">
                        <i class="material-icons">&#xE567;</i>
                        <span>Meets</span>
                    </li>
                </ul>
            </nav>
        </header>
        <main>
            <router-outlet></router-outlet>
            <simple-notifications [options]="options"></simple-notifications>
        </main>
        <footer>

        </footer>
    `,
    directives: [ROUTER_DIRECTIVES, SimpleNotificationsComponent]
})
@RouteConfig([
    {path: '/', name: 'Meets', component: MeetsComponent, useAsDefault: true},
    {path:'/register', name: 'Reg', component: RegComponent},

    // Catch All route
    {path: '/**', redirectTo:['Meets'] }
])
export class AppComponent {
    constructor() {}

    options = {
        timeOut: 5000,
        lastOnBottom: false,
        clickToClose: true,
        maxLength: 0,
        maxStack: 5,
        showProgressBar: true,
        pauseOnHover: true,
        preventDuplicates: true,
        preventLastDuplicates: false
    };
}