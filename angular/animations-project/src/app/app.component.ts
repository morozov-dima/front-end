import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // we we can add this animation in different file
  animations: [
    trigger('routeState', [
      // from 'any' to 'any' state
      transition('* => *', [
        group([
            // when we add element
            query(':enter', [
              // 1. if we also want run child route animations
              // 2. so we first run child animation and then we run our main route animation
              //animateChild(), !!!!!!!!!!!!!
              style({
                transform: 'translateY(-400px)',
                opacity: 0
              }),
              animate('300ms ease-out')
            ], { optional: true }),
            // when we remove element (route witch leaves)
            query(':leave', [
              animate('300ms ease-out', style({
                transform: 'translateY(600px)',
                opacity: 0
              }))
            ], { optional: true })
        ])
      ])
    ])
  ]
})
export class AppComponent {

  getAnimationData(outlet: RouterOutlet) {
    // 'animation' this is property that we define in 
    //  data: {animation: {page: 'rootPage'}}
    //  from 'app-routing.module.ts' file.
    //  'routeData' might be null.
    //
    const routeData = outlet.activatedRouteData['animation'];
    // check if we don't have 'routeData'
    if (!routeData) {
      // in this case we will return 'rootPage' as a state.
      return 'rootPage';
    }
    //  data: {animation: {page: 'rootPage'}}
    // we return 'rootPage' or 'usersPage' as a state for our [@routeState]
    return routeData['page'];
  }

}
