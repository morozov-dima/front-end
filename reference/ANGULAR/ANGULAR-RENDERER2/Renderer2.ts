// ************************************************************************
// ******************************* Example ********************************
// ************************************************************************



// ************************** app.component.html **************************
<button (click)="onShowboring(boringBlock)">Show boring Quotes</button>
<div style="display: none" class="boring" #boringBlock>Some text</div>






// *************************** app.component.ts ***************************
import { Component } from '@angular/core';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor( private renderer: Renderer2 ) {}

  onShowboring(element: HTMLElement) {
    this.renderer.setStyle(element, 'display', 'block');
  }
}

