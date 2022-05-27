// *************************************************************************
// ******************************** Example  *******************************
// *************************************************************************



// https://angular.io/api/animations/AnimationBuilder



// ************************** app.component.html **************************

<div style="width: 200px; height: 50px; background-color: green" #theDiv></div>
<button class="btn btn-primary" (click)="makeAnimation(theDiv)">Animate it!</button>











// *************************** app.component.ts **************************

import { Component } from '@angular/core';
import { animate, AnimationBuilder, style } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // 1. we inject 'AnimationBuilder' in our component.
  // 2. with this builder we can create animations.
  constructor(private builder: AnimationBuilder) {}

  makeAnimation(element: any) {
    // 1. with 'build' method we can build our animation. 
    // 2. and this is animation that we want to play.
    const myAnimation = this.builder.build([
      style({
        backgroundColor: 'red',
        width: '200px'
      }),
      animate(300, style({
        width: '500px'
      })),
      // animate back
      animate(2000)
    ]);

    // 1. we create a player to play the animation.
    // 2. we use 'create' method in ordee to create our animation.
    const player = myAnimation.create(element);
    // now we need play our animation.
    player.play();
  }
}
