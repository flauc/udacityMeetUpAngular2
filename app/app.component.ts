import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {MeetsComponent} from "./meets/meets.component";
import {RegComponent} from "./reg/reg.component";

@Component({
    selector: 'app',
    template: `
        <header>
            <nav class="sl-nav">
                <ul>
                    <li><a [routerLink]="['Reg']">Create Account</a></li>
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
    {path:'/register', name: 'Reg', component: RegComponent},

    // Catch All route
    {path: '/**', redirectTo:['Meets'] }
])
export class AppComponent {
    constructor() {}
}