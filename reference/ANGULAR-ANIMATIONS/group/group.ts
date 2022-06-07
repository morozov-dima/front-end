// *************************************************************************
// ****************************** Example   ********************************
// *************************************************************************
// Toggle text, when user press button


// *************************** welcome.component.ts ***********************
import { animate, group, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  animations: [
    trigger('openClose', [
      state('false', style({
        height: '0px',
        opacity: 0
      })),
      state('true', style({
        height: '*',
        opacity: 1
      })),
      transition('false => true', [
            // run animations in paraller.
            group([
                  animate('0.2s ease-in', style({
                    height: '*'
                  })),
                  animate('0.5s ease-in', style({
                    opacity: 1
                  }))
            ])
      ]),
      transition('true => false', [
            // run animations in paraller.
            group([
                  animate('0.2s ease-out', style({
                    opacity: 0
                  })),
                  animate('0.5s ease-out', style({
                    height: '0px'
                  }))
            ])
      ])
    ])
  ]
})

export class WelcomeComponent {
  isShown: boolean = false;
}






// ************************ welcome.component.html ************************
<section class="welcome-content">
    <div class="welcome-internal-content">
        <!-- toggle 'animatedContent' text when we press button  -->
        <div class="toggle-button">
            <button (click)="isShown = !isShown">Toggle</button>
        </div>

        <div [@openClose]="isShown ? 'true' : 'false'"  class="animatedContent">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, id!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, id!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, id!
        </div>
    </div>
</section>



















// *************************************************************************
// ****************************** Example   ********************************
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





