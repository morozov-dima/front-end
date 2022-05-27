import { Component, HostBinding, OnInit } from '@angular/core';
import { routeFadeStateTrigger, routeSlideStateTrigger } from '../shared/route-animations';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [
    routeFadeStateTrigger({startOpasity: 0, duration: '10000ms'}),
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

  @HostBinding('@routeFadeState') routeAnimation = true; // old animation (just fadeIn/fadeOut)
  //@HostBinding('@routeSlideState') routeAnimation = true;

  constructor() { }

  ngOnInit() {
  }

}
