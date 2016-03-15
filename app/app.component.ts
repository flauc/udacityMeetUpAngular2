import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {LoginComponent} from "./login/login.component";
import {MeetsComponent} from "./meets/meets.component";

@Component({
    selector: 'app',
    template: `
        <header>
            <nav class="classic-nav">
                <ul>
                    <li><a [routerLink]="['Login']">Login</a></li>
                    <li><a [routerLink]="['Meets']">Meets</a></li>
                </ul>
            </nav>
        </header>
        <main>
            <router-outlet></router-outlet>
        </main>
        <footer>

        </footer>
    `,
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: '/', name: 'Meets', component: MeetsComponent, useAsDefault: true},
    {path:'/login', name: 'Login', component: LoginComponent},

    // Catch All route
    {path: '/**', redirectTo:['Meets'] }
])
export class AppComponent {
    constructor() {}
}