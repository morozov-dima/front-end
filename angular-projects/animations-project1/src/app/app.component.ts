import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  animations: [

    trigger('showHide', [
      state('show', style({
        opacity: 1
      })),
      state('hide', style({
        opacity: 0,
      })),
      transition('show <=> hide', [
        animate('1s ease-out')
      ])
    ])
    
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {
  constructor() {}
  isAnimate: boolean = true;

  onClick() {
    this.isAnimate = false;
    
  }

}
