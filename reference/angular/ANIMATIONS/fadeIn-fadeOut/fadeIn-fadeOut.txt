// *************************************************************************
// *********************** Example - FadeIn/FadeOut  ***********************
// *************************************************************************


// FadeIn/FadeOut of some element

// ************************* shared/animations.ts ***********************
import { animate, state, style, transition, trigger } from "@angular/animations";

// in this case we have state less trigger. we just define some transitions.
export const showStateTrigger = trigger('showState', [
    // 'void' - will be for elements that not attached to the DOM.
    // as second argument we define [] , because we want to use multiple animations inside 'transition'
    // fadeIn
    // * - mean any state, I don't care.
    // instead 'void => *' we can write ':enter' . Because this two transitions are so common.
    transition(':enter', [
        style({
            opacity: 0
        }),
        animate(300)
    ]),
    // fadeOut
    // from any state '*' to nothing 'void'
    // instead '* => void' we can write ':leave'. Because this two transitions are so common.
    transition(':leave', animate(300, style({
        opacity: 0
    })))
]);




// **************************  app.component.html *************************
<button (click)="isShown = !isShown">
  Toggle Element
</button>


<p 
  @showState
  *ngIf="isShown">
  You can see now!
</p>



<button (click)="onAddElement()">Add Element</button>
<div
  @showState
  *ngFor="let testResult of testResults; index as i" 
  class="test-result">
 {{i}} - {{testResult}}
</div>







// ************************** app.component.ts *****************************
import { Component } from '@angular/core';
import { showStateTrigger } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    showStateTrigger
  ]
})
export class AppComponent {
  isShown: boolean = false;
  testResults: number[] = [];

  onAddElement(){
    this.testResults.push(Math.random());
  }
}





// ************************* app.module.ts *****************************
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


