import { animate, group, keyframes, query, state, style, transition, trigger } from "@angular/animations";

export const boxAnimation =  trigger('box', [

    // state name 'start'
    state('start', style({
      background: 'blue'      // style for 'start' state.
    })),


    // state name 'end'
    state('end', style({
      background: 'red',      // style for 'end' state.
      transform: 'scale(1.2)' // style for 'end' state (element will be bigger)
    })),

    // state name 'special'
    state('special', style({
      background: 'orange',     // style for 'special' state.
      transform: 'scale(0.5)',  // style for 'special' state (element will be smaller)
      borderRadius: '50%'       // style for 'special' state.
    })),


    transition('start => end', animate(450)), // 450 mili sec (fadeIn)


    transition('end => start', animate('800ms ease-in-out')), // 800 mili sec (fadeOut)

    // from 'special' state to 'any' state and from 'any' state to 'special' state
    // we can create animation steps.
    transition('special <=> *', [ 

      // we want execute our methods in parallel.
      group([
        query('h4', animate(1500, style({
          fontSize: '.5rem',
          color: 'red'
        }))),
        style({ background: 'green' }), // first we set this style
        animate('1s', style({ // when our animation end we can set new style: background: 'pink'
          background: 'pink'
        })),
        animate(750) // our background: 'pink' will be animated during 750 mili sec.
      ])
    ]),



    // 'void => *' we can write this ':enter'
    // this is like - 'show'
    // 'void' - this is when element dosen't exist (any element that dosen't exist)
    // from 'void' to 'any' state
    transition(':enter', [
      animate('4s', keyframes([
        style({ background: 'red', offset: 0 }),       // step 1 
        style({ background: 'black', offset: 0.2 }),   // step 2, 20% from 4 sec
        style({ background: 'orange', offset: 0.3 }),  // step 3,  30% from 4 sec
        style({ background: 'blue', offset: 1 })       // step 4
      ]))
      //style({ opacity: 0 }),
      //animate('850ms ease-out')
    ]),




    // from 'any' state to 'void' 
    // this is like 'hide'.
    // '* => void' we can write this ':leave'
    transition(':leave', [
      style({opacity: 1}), // from 'opacity: 1' - initial state.

          // 'group' - run animations in parallel !!!!!!!!!
          //
          //
          // ####### sequence #######
          // we can also add method 'sequence' this is default. in this case animations will run after each other.
          //
          // this two animations will be in parallel.
          // animation 1 will be parallel to animation 2.
          group([
            // animation 1
            animate(750, style({
              opacity: 0, // to 'opacity: 0'
              transform: 'scale(1.2)' // our element will be bigger.
            })),
            // animation 2
            animate(300, style({
              color: '#000000',
              fontWeight: 'bold'
            }))
          ])

    ])






  ])