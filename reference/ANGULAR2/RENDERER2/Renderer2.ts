// ************************************************************************
// ******************************* Example ********************************
// ************************************************************************



// ************************** app.component.html **************************

<button (click)="onShowboring(boringBlock)">Show boring Quotes</button>

<div 
style="display: none"
class="boring" #boringBlock>
    Some text ...
</div>






// *************************** app.component.ts ***************************

import { Component } from '@angular/core';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private renderer: Renderer2
  ) {}

  onShowboring(element: HTMLElement) {
    // argument 1: element.
    // argument 2: witch style we want to set.
    // argument 3: value of our style. 
    // this was we can conrol style of emelents and we don't need [ngStyle] or [ngClass]
    this.renderer.setStyle(element, 'display', 'block');
  }

}

