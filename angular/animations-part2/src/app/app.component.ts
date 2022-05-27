import { animate, keyframes, state, style, transition, trigger, group, AnimationEvent } from '@angular/animations';
import { Component } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [



    trigger('divState', [
      // first state (initial state)
      state('normal', style({
        backgroundColor: 'red',
        transform: 'translateX(0)'
      })),

      // second state
      state('highlighted',style({
        backgroundColor: 'blue',
        transform: 'translateX(100px)'
      })),

      transition('normal => highlighted', animate(300)),
      transition('highlighted => normal', animate(800))
    ]),






    trigger('wildState', [
      // first state (initial state)
      state('normal', style({
        backgroundColor: 'red',
        transform: 'translateX(0) scale(1)'
      })),

      // second state
      state('highlighted',style({
        backgroundColor: 'blue',
        transform: 'translateX(100px) scale(1)'
      })),

      state('shrunken', style({
        'background-color': 'green',
        transform: 'translateX(0px) scale(0.5)'
      })),

      transition('highlighted => normal', animate(300)),
      transition('normal => highlighted', animate(800)),
      // '*' mean any state.
      transition('shrunken <=> *', [
            style({
              'background-color': 'orange'
            }),
            animate(1000, style({
              borderRadius: '50px'
            })),
            animate(500)
      ]) 
    ]),








    trigger('list1', [
      // first state (initial state)
      state('in', style({
        opacity: '1', // element will be visible
        transform: 'translateX(0)'
      })),
   
      // from void (element hasn't been added yet) to 'in' state.
      // we use 'void' for element that wasn't added to the DOM at the beginning.
      transition('void => *', [
        // initial style for our animation
        style({
          opacity: 0,
          transform: 'translateX(-100px)' // outside of screen
        }), 
        animate(300)
      ]),

      transition('* => void', [
        // how our animate function will have final state  
        animate(300, style({
          transform: 'translateX(100px)',
          opacity: 0 // fadeOut
        }))
      ])
    ]),








    trigger('list2', [
      // first state (initial state)
      state('in', style({
        opacity: '1', // element will be visible
        transform: 'translateX(0)'
      })),
   
      // from void (element hasn't been added yet) to 'in' state.
      // we use 'void' for element that wasn't added to the DOM at the beginning.
      transition('void => *', [
        animate(1000, keyframes([
          // step 1 of our animation (initial)
          // we can also control animation time with offset
          style({
            transform: 'translateX(-100px)',
            opacity: 0,
            offset: 0
          }),
          // step 2 of our animation
          // we can also control animation time with offset
          style({
            transform: 'translateX(-50px)',
            opacity: 0.5,
            offset: 0.3 // 30% of our animation time
          }),
          // step 3 of our animation
          // we can also control animation time with offset          
          style({
            transform: 'translateX(-20px)',
            opacity: 1,
            offset: 0.8
          }),
          // step 4 of our animation (final)
          // we can also control animation time with offset          
          style({
            transform: 'translateX(0px)',
            opacity: 1,
            offset: 1
          })
        ]))
      ]),

      transition('* => void', [
        // in group method here as an argument we pass an array
        // of animations we want to perform asynchronously (at the some time)
        group([
          animate(300, style({
            color: 'red'
          })),
          animate(800, style({
            transform: 'translateX(100px)',
            opacity: 0 // fadeOut
          }))
        ])
        // how our animate function will have final state  

      ])
    ])









  ]
})


export class AppComponent {
  state: string = 'normal';
  wildState: string = 'normal';

  list = ['Milk', 'Sugar', 'Bread'];

  onAdd(item: string) {
    this.list.push(item);
  }

  onAnimate(){
    this.state === 'normal' ? this.state = 'highlighted' : this.state = 'normal';
    this.wildState === 'normal' ? this.wildState = 'highlighted' : this.wildState = 'normal';
  }

  onShrink() {
    this.wildState = 'shrunken';
  }


  onDelete(item: string) {
   // remove item from array in some position
   this.list.splice(this.list.indexOf(item), 1);
  }

  animationStarted(event: AnimationEvent) {
    console.log(event);
  }

  animationEnded(event: AnimationEvent) {
    console.log(event);
  }

}
