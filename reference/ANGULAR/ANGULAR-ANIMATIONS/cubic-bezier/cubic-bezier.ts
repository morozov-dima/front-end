// *************************************************************************
// *************************** Example - group  ****************************
// *************************************************************************

// https://cubic-bezier.com/
// https://easings.net/



// ************************** shared/animations.ts **************************

import { animate, group, state, style, transition, trigger } from "@angular/animations";

export const animateStateTrigger = trigger('animateState', [
    // from 'any' to 'any'. I don't care about the old state or the newstate.
    // we will have here multiple animations so we will add '[]'.
    transition('* => *', [
        animate('4000ms cubic-bezier(.42,.49,.9,.39)', style({
            width: 0
        })),
        animate(400, style({
            // we can set '*' in case we don't know our actual width or height.
            width: '*'
        }))
    ])
]);






// ************************** app.component.ts **************************
import { Component } from '@angular/core';
import { animateStateTrigger } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    animateStateTrigger
  ]
})
export class AppComponent {
  animate: boolean = false;
}







// ************************** app.component.html **************************
<button (click)="animate = true">Animate me</button>
<p 
  [@animateState]="animate ? 'animate' : 'noAnimation'"
  [ngStyle]="{
  'width.px': width
 }">Shrink me</p>