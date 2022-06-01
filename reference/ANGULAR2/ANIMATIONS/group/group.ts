// *************************************************************************
// *************************** Example - group  ****************************
// *************************************************************************


// ************************** shared/animations.ts **************************

import { animate, group, state, style, transition, trigger } from "@angular/animations";

export const listStateTrigger = trigger('listState', [
    transition(':enter', [
        style({
            opacity: 0,
            backgroundColor: 'white'
        }),
        // if we want run our animations in paraller we need use group() method.
        // inside [] of group we group all animations we want to play together.
        // inside group we have two animations starting together.
        group([
            animate(1000, style({
                opacity: 0.7
            })),
            animate(2000, style({
                backgroundColor: 'red'
            }))
        ]),
        animate(300, style({
            backgroundColor: 'lightblue'
        }))
    ]),
    transition(':leave', animate(300, style({
        opacity: 0
    })))
]);








// *************************** app.component.html ***************************
<button (click)="onAddElement()">Add Element</button>
<div
  @listState
  *ngFor="let testResult of testResults; index as i" 
  class="test-result">
 {{i}} - {{testResult}}
</div>





// *************************** app.component.ts ***************************

import { Component } from '@angular/core';
import { listStateTrigger } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    listStateTrigger
  ]
})
export class AppComponent {
  testResults: number[] = [];

  onAddElement(){
    this.testResults.push(Math.random());
  }
}





