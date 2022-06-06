// *************************************************************************
// ********************************* Example  ******************************
// *************************************************************************




// ************************ welcome.component.html *************************
<section class="welcome-content">
    <div class="welcome-block">
        <ul>
            <li *ngFor="let d of data">
                {{d.id}} - {{d.title}}
            </li>
        </ul>
    </div>
</section>






  // ************************ promotions.component.ts ************************
  import { Component, OnDestroy, OnInit } from '@angular/core';
  import { Subscription } from 'rxjs';
  import { UserDataInterface } from '../shared/user-data.interface';
  import { UserData } from '../shared/user-data.service';
  
  @Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss']
  })
  export class WelcomeComponent implements OnInit, OnDestroy {
  
    constructor(private userData: UserData) { }
  
    userDataSub!: Subscription;
    data: UserDataInterface[] = [];
  
    ngOnInit(): void {
      this.getUserData();
    }
  
    getUserData() {
      this.userDataSub = this.userData.fetchUserData().subscribe({
        next: (response) => {
          console.log(response);
          this.data = response;
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('completed !!!');
        }
      });
    }
  
    ngOnDestroy(): void {
      this.userDataSub.unsubscribe();
    }
  
  }
  


