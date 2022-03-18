import { EventEmitter } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() closeSidenav = new EventEmitter<void>();
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



  onClose() {
    // we emit event when we click the link
    this.closeSidenav.emit();
  }


  onLogout() {
    this.onClose();
    this.authService.logout();
  }

  
  ngOnDestroy(): void {
    // unsubscribe from our Subscription
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }



}
