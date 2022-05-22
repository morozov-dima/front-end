import { AnimationEvent } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { boxAnimation } from './app.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ boxAnimation]
})

export class AppComponent implements OnInit {

  // set initial state
  boxState: string = 'start'

  visible: boolean = true;

  ngOnInit(): void {
    
  }

  onAnimate() {
    this.boxState = this.boxState === 'end' ? 'start' : 'end';
  }


  // our event have special tyle : "AnimationEvent"
  animationStarted(event: AnimationEvent) {
    console.log(event);
  }


  animationDone(event: AnimationEvent) {
    console.log(event);
  }   



}
