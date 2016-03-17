import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {AppComponent} from "./app.component";
import {NotificationsService} from "angular2-notifications/components";

bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    NotificationsService
]);