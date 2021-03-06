// *************************************************************************
// ******************************** Example  *******************************
// *************************************************************************

// We create re-usable animations with 'animation' and 'useAnimation' functions




// *********************** shared/route-animations.ts ***********************
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


export const routeFadeStateTrigger = (params:any) => trigger('routeFadeState', [
    transition(':enter', [
        useAnimation(fadeAnimation, {params: params})
    ]),
    transition(':leave', animate(300, style({
        opacity: 0
    })))
]);






// *************************** users.component.ts *************************
import { Component, HostBinding, OnInit } from '@angular/core';
import { routeFadeStateTrigger } from '../shared/route-animations';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [
    // here we pass parameters to our trigger  
    routeFadeStateTrigger({startOpasity: 0, duration: '2000ms'})
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
  @HostBinding('@routeFadeState') routeAnimation = true;

  constructor() { }

  ngOnInit() {
  }

}







// *************************** users.component.html *************************
<h3>Manage your Users</h3>
<ul
  class="list-group">
  <li class="list-group-item">Max</li>
  <li class="list-group-item">Anna</li>
  <li class="list-group-item">Chris</li>
</ul>
