import {Component, ViewEncapsulation} from 'angular2/core';

@Component({
    selector: 'app-progress',
    inputs: ['checks'],
    encapsulation: ViewEncapsulation.None,
    template: `
        <div class="progress" [hidden]="showProgress">
            <span [ngStyle]="{'width': progressWidth + '%'}" *ngFor="#a of checks;  #i = index" [hidden]="!shouldShow(a,i)"></span>
        </div>
    `

})
export class ProgressComponent {
    constructor() {}

    ngOnInit() {
        this.progressWidth = 100/this.checks.length;
    }

    // Inputs
    checks: boolean[];

    // Locals
    progressWidth: number;

    shouldShow(value: boolean, index: number) {
        let toReturn = false;

        if(value) {
            toReturn = true;
            for(let i = 0; i < index; i++) {
                if(!this.checks[i]) toReturn = false;
            }
        }

        return toReturn;
    }
}