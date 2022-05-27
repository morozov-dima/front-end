// *************************************************************************
// ******************************** Example  *******************************
// *************************************************************************

// https://angular.io/api/animations/stagger


// ************************** animations.ts **************************]

import {
    trigger,
    state,
    style,
    transition,
    animate,
    keyframes,
    query,
    stagger
  } from '@angular/animations';

  export const listAnimationTrigger = trigger('listAnimation', [
    transition('* => *', [ // each time the binding value changes
      query(':leave', [
        stagger(100, [
          animate('0.5s', style({ opacity: 0 }))
        ])
      ], { optional: true }),
      query(':enter', [
        style({ opacity: 0 }),
        stagger(100, [
          animate('0.5s', style({ opacity: 1 }))
        ])
      ], { optional: true })
    ])
  ]);
  





  // ********************** projects.component.html **********************
    <button (click)="toggle()">Show / Hide Items</button>
    <hr />
    <div [@listAnimation]="items.length">
    <div *ngFor="let item of items">
        {{ item }}
    </div>
    </div>






// ********************* projects.component.ts ***********************
import { Component } from '@angular/core';

import {
  listAnimationTrigger
} from './animations';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  animations: [
    listAnimationTrigger
  ]
})
export class ProjectsComponent {

  items:any = [];

  showItems() {
    this.items= [0,1,2,3,4];
  }

  hideItems() {
    this.items = [];
  }

  toggle() {
    this.items.length ? this.hideItems() : this.showItems();
   }




}
