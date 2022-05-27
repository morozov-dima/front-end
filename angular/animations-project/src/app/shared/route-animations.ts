import { animate, animation, style, transition, trigger, useAnimation } from "@angular/animations";



const fadeAnimation = animation([
    style({
        opacity: '{{ startOpacity }}'
    }),
    animate('{{ duration }}')
   // default values 
    ], {
            params: {startOpacity: 0, duration: '100ms'}
       });


/*
    1. we don't need states, because we only talk about 'void' to 'start' and
       'start' to 'void'.
*/
export const routeFadeStateTrigger = (params:any) => trigger('routeFadeState', [
    // this transition will run whenever we enter a component, whenever it is added to the DOM.
    // therefore whatever page is loaded.
    transition(':enter', [
        useAnimation(fadeAnimation, {params: params})
    ]),
    transition(':leave', animate(300, style({
        opacity: 0
    })))
]);



export const routeSlideStateTrigger = trigger('routeSlideState', [
    transition(':enter', [
        style({
            // from the top (out the screen).
            transform: 'translateY(-100%)',
            opacity: 0
        }),
        animate(300)
    ]),
    transition(':leave', animate(300, style({
        // we go to the bottom, we add +100%
        transform: 'translateY(100%)',
        opacity: 0
    })))
]);