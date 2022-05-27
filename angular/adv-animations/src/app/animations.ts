import { animate, group, keyframes, state, style, transition, trigger } from "@angular/animations";

// in this case we have state less trigger. we just define some transitions.
export const showStateTrigger = trigger('showState', [
    // 'void' - will be for elements that not attached to the DOM.
    // as second argument we define [] , because we want to use multiple animations inside 'transition'
    // fadeIn
    // * - mean any state, I don't care.
    // instead 'void => *' we can write ':enter' . Because this two transitions are so common.
    transition(':enter', [
        style({
            opacity: 0
        }),
        animate(300)
    ]),
    // fadeOut
    // from any state '*' to nothing 'void'
    // instead '* => void' we can write ':leave'. Because this two transitions are so common.
    transition(':leave', animate(300, style({
        opacity: 0
    })))
]);






export const animateStateTrigger = trigger('animateState', [
    // from 'any' to 'any'. I don't care about the old state or the newstate.
    // we will have here multiple animations so we will add '[]'.
    transition('* => *', [
        animate('4000ms cubic-bezier(.42,.49,.9,.39)', style({
            width: 0
        })),
        animate(400, style({
            // we can set '*' in case we don't know our actual width or height.
            width: '*'
        }))
    ])
]);








export const listStateTrigger = trigger('listState', [
    transition(':enter', [
        style({
            opacity: 0,
            backgroundColor: 'white'
        }),
        // if we want run our animations in paraller we need use group() method.
        // inside [] of group we group all animations we want to play together.
        // inside group we have two animations starting together.
        // parallel animations
        group([
            animate(1000, style({
                opacity: 0.7
            })),
            // we will use keyframes function here for more animations control.
            // keyframes function takes array of 'keyframes'
            // offset - has to be a number between 0 and 1.
            // offset control the speed of animation (timing)
            animate('5000ms ease-out', keyframes([
                style({
                    backgroundColor: 'white',
                    offset: 0
                }),
                style({
                    backgroundColor: 'red',
                    offset: 0.8
                }),
                style({
                    backgroundColor: 'green',
                    offset: 1
                })
            ]))
        ]),
        animate(300, style({
            backgroundColor: 'lightblue'
        }))
    ]),
    transition(':leave', animate(300, style({
        opacity: 0
    })))
]);