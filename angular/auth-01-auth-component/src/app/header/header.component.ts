import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;

  private userSub: Subscription;

  constructor(private dataStorageService: DataStorageService,private authService: AuthService) {}

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }






  ngOnInit(): void {
     // set 'userSub' Subscription
     this.userSub = this.authService.user.subscribe(user => {


      // we can also write: this.isAuthenticated = !!user;
      // this is will be the same
      this.isAuthenticated = !user ? false : true;
      console.log(!user);
      console.log(!!user);


     }); 
  }




  // logout method
  onLogout() {
     this.authService.logout(); 
  }

  

  ngOnDestroy(): void {
      // clear 'userSub' Subscription
      this.userSub.unsubscribe();
  }

}
