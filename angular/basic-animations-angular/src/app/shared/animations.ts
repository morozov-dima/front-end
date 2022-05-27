import { animate, state, style, transition, trigger } from "@angular/animations";

export const clickedStateTrigger = 
 // **************** clickedState trigger begin *****************
 trigger('clickedState', [
    // 'default' state
    state('default', style({
      backgroundColor: 'orange',
      width: '100px',
      height: '100px'
    })),
    // 'clicked' state
    state('clicked', style({
      backgroundColor: 'blue',
      width: '100px',
      height: '50px'
    })),
    // 'mousedown' state
    state('mousedown', style({
      backgroundColor: 'red',
      border: '1px solid black',
      width: '100px',
      height: '100px'
    })),
    
    transition('default => clicked', animate('1s 500ms ease-in')), // 1s - duration of animation. 500ms - delay.
    //transition('clicked => default', animate('300ms ease-out')),
    transition('clicked => default', animate(300)),
    transition('mousedown <=> clicked', animate(3000)) // transition in two directions
  ]);
      // **************** clickedState trigger end *****************





  // **************** numberEnteredState trigger begin *****************
  export const numberEnteredStateTrigger = trigger('numberEnteredState', [
     // 'unselected' state
     state('unselected', style({
       border: '1px solid black',
       padding: '5px',
       backgroundColor: 'white'
     })),
     // 'selected' state
     state('selected', style({
      border: '2px solid blue',
      padding: '4px',
      backgroundColor: 'lightblue'
    })),
    // in our transition we have now array of steps.
    transition('unselected => selected', [
      // step 1 of our transition.
      style({
        border: '2px solid black',
        padding: '4px'
      }),
      // step 2 of our transition.
      // here we pass 'style' as second argument.
      // here we use 100ms delay
      animate('600ms 100ms ease-out', style({
        backgroundColor: 'red',
        transform: 'scale(1.05)'
      })),
      animate(300)
    ])
  ])
  // **************** numberEnteredState trigger end *****************

