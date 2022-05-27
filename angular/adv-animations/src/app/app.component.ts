import { AnimationEvent } from '@angular/animations';
import { Component } from '@angular/core';
import { animateStateTrigger, listStateTrigger, showStateTrigger } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    showStateTrigger,
    animateStateTrigger,
    listStateTrigger
  ]
})
export class AppComponent {
  isShown: boolean = false;
  width: number = 400;
  animate: boolean = false;
  testResults: number[] = [];

  onAddElement(){
    this.testResults.push(Math.random());
  }

  onAnimationDone(event: AnimationEvent) {
    console.log(event);
    
  }

  onAnimationStarted(event: AnimationEvent) {
    console.log(event);
    
  }


}
