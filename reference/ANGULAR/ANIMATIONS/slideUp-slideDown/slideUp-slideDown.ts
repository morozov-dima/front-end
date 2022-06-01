// *************************************************************************
// ******************************** Example   ******************************
// *************************************************************************
//  slide from 'top' to 'bottom' and then from 'bottom' to 'top'.



// ************************** shared/animations.ts **************************

import { animate, keyframes, state, style, transition, trigger } from "@angular/animations";

// slide from 'top' to 'bottom'
export const slideStateTrigger = trigger('slideState', [
    // slideDown
    transition(':enter', [
        style({
            transform: 'translateY(-100%)'
        }),
        animate('300ms ease-out', style({
            transform: 'translateY(0)'
        }))
    ]),
    // slideUp
    transition(':leave', [
        style({
            transform: 'translateY(0)'
        }),
        animate('300ms ease-out', style({
            transform: 'translateY(-100%)'
        }))
    ])
]);




// ************************** projects.component.html ***********************
<app-new-project  @slideState ></app-new-project>





// ************************* new-project.component.css **********************
// this way we can add display: block; to all our 'app-new-project' components.
// it is important to set out animated element to display: block. 
// 'transform' work only with 'display: block'

:host {
    display: block;
}
