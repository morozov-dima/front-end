// *************************************************************************
// ******************************** Example   ******************************
// *************************************************************************




// ********************* app/shared/route-animations.ts ********************
import { animate, style, transition, trigger } from "@angular/animations";

/*
    1. we don't need states, because we only talk about 'void' to 'start' and
       'start' to 'void'.
*/
export const routeFadeStateTrigger = trigger('routeFadeState', [
    // this transition will run whenever we enter a component, whenever it is added to the DOM.
    // therefore whatever page is loaded.
    transition(':enter', [
        style({
            opacity: 0
        }),
        animate(300)
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








// ********************* projects.component.ts ********************
import { Component, HostBinding, OnInit } from '@angular/core';
import { routeFadeStateTrigger, routeSlideStateTrigger } from '../shared/route-animations';

import { Project } from './project.model';

import { ProjectsService } from './projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  // we need import our trigger
  animations: [
    routeFadeStateTrigger,
    routeSlideStateTrigger
  ]
})
export class ProjectsComponent implements OnInit {
  // 1. here we assign our trigger name 'routeFadeState'
  // 2. routeAnimation = true , means that animation will be added.
  // 3. this was our trigger attached to this component.
  // 4. but component by default 'inline' element and we need set it to 'block' element.
  //    we will add 'display:block' with :hold in our CSS file. Without 'display:block
  //    no animations will be.
  // 5. @routeFadeState - trigger name.
  // 6. 'routeAnimation' property that we add. and this property should receive 'true'.
  //    if you set it to false , then no animation will play.
  // 7. with 'routeAnimation' true/false you can turn on/off animation for current component.

  //@HostBinding('@routeFadeState') routeAnimation = true; // old animation (just fadeIn/fadeOut)
  @HostBinding('@routeSlideState') routeAnimation = true;


}






// ***************************** projects.component.css ***************************
:host {
    display:block;
}






// *************************** users.component.ts *****************************
import { Component, HostBinding, OnInit } from '@angular/core';
import { routeFadeStateTrigger, routeSlideStateTrigger } from '../shared/route-animations';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [
    routeFadeStateTrigger,
    routeSlideStateTrigger
  ]
})

export class UsersComponent implements OnInit {
  // 1. here we assign our trigger name 'routeFadeState'
  // 2. routeAnimation = true , means that animation will be added.
  // 3. this was our trigger attached to this component.
  // 4. but component by default 'inline' element and we need set it to 'block' element.
  //    we will add 'display:block' with :hold in our CSS file. Without 'display:block
  //    no animations will be.
  // 5. @routeFadeState - trigger name.
  // 6. 'routeAnimation' property that we add. and this property should receive 'true'.
  //    if you set it to false , then no animation will play.
  // 7. with 'routeAnimation' true/false you can turn on/off animation for current component.

  //@HostBinding('@routeFadeState') routeAnimation = true; // old animation (just fadeIn/fadeOut)
  @HostBinding('@routeSlideState') routeAnimation = true;

  constructor() { }

  ngOnInit() {
  }

}






// **************************  users.component.css **************************
:host {
    display:block;
}


















// *************************************************************************
// ******************************** Example   ******************************
// *************************************************************************
// In new Angular versions


// ************************ app/app-routing.module.ts **********************
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProjectsComponent } from './projects/projects.component';
import { UsersComponent } from './users/users.component';

const appRoutes: Routes = [
  { 
    path: '',
    component: ProjectsComponent,
    // we pass our own custom data to this component when they get loaded.
    data: {animation: {page: 'rootPage'}}
  },
  { 
    path: 'users',
    component: UsersComponent,
    // we pass our own custom data to this component when they get loaded.
    data: {animation: {page: 'usersPage'}}
   }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}







// ************************ app.component.html *****************************
<div class="container">
  
  <div class="row">
    <div class="col-xs-12">
      <ul class="nav nav-pills">
        <li class="link" role="presentation" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}"><a routerLink="/">Projects</a></li>
        <li class="link" role="presentation" routerLinkActive="active"><a routerLink="/users">Users</a></li>
      </ul>
    </div>
  </div>

  <div class="row" style="overflow: hidden;">


    <!-- 
      1. here we will add out trigger
      2. we create function 'getAnimationData' and we pass 'rOutlet' as local reference.
    -->
    <div class="col-xs-12" [@routeState]="getAnimationData(rOutlet)">


      <!-- 
        1. here we add local reference and we assign the value and the value must be 'outlet'
      -->
      <router-outlet #rOutlet="outlet"></router-outlet>


    </div>
  </div>

</div>














// ************************ app.component.ts *******************************
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





// **************************  users.component.css **************************
:host {
    display:block;
}
