// *************************************************************************
// ************************* Example - keyframes  **************************
// *************************************************************************





// ************************** shared/animations.ts **************************

import { animate, group, keyframes, state, style, transition, trigger } from "@angular/animations";

export const listStateTrigger = trigger('listState', [
    transition(':enter', [
        style({
            opacity: 0,
            backgroundColor: 'white'
        }),
        // if we want run our animations in paraller we need use group() method.
        // inside [] of group we group all animations we want to play together.
        // inside group we have two animations starting together.
        // parallel animations
        group([
            animate(1000, style({
                opacity: 0.7
            })),
            // we will use keyframes function here for more animations control.
            // keyframes function takes array of 'keyframes'
            // offset - has to be a number between 0 and 1.
            // offset control the speed of animation (timing)
            animate('5000ms ease-out', keyframes([
                style({
                    backgroundColor: 'white',
                    offset: 0
                }),
                style({
                    backgroundColor: 'red',
                    offset: 0.8
                }),
                style({
                    backgroundColor: 'green',
                    offset: 1
                })
            ]))
        ]),
        animate(300, style({
            backgroundColor: 'lightblue'
        }))
    ]),
    transition(':leave', animate(300, style({
        opacity: 0
    })))
]);






// ************************** app.component.ts **************************
import { Component } from '@angular/core';
import { animateStateTrigger, listStateTrigger, showStateTrigger } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    listStateTrigger
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