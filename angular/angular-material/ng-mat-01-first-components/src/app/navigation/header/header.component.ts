import { OnDestroy } from '@angular/core';
import { 
  Component,
  OnInit,
  EventEmitter,
  Output } from '@angular/core';

import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth: boolean = false;
  authSubscription!: Subscription;

  constructor(private authService: AuthService) { }



  ngOnInit(): void {
    // 1. here we will receive emited data whenever we call next()
    //    in our 'auth.service.ts' file.
    // 2. here we are subscribing to an observable and we need 
    //    also unsubscribe. This clears up unneeded memory and
    //    prevents memory leaks.
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }




  onToggleSidenav() {
    // now we are emit an event whenever we click the menu button.
    this.sidenavToggle.emit();
  }



  // logout user
  onLogout() {
    this.authService.logout();
  }



  ngOnDestroy(): void {
    // unsubscribe from our Subscription
    this.authSubscription.unsubscribe();
  }



}
