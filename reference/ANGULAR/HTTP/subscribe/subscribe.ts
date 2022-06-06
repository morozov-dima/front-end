// **************************************************************************
// ******************************** Example  ********************************
// **************************************************************************







// **************************** user.component.ts ***************************
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/shared/getUsers.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService
  ) { }

  userId: number = 0;
  userName: string = '';  
  userSub!: Subscription;  

  ngOnInit(): void {
   
    // subscribe to page params,  if page url : 'http://localhost:4200/users/1'
    // result will be : {id: '1'}
    this.route.params.subscribe(
      (pageParamsResponse) => {
        this.userId = parseInt(pageParamsResponse['id']);
        
        this.userSub = this.usersService.getUser(this.userId).subscribe(
          response => {
            console.log(response);
            this.userName = response.userName;
          }
        );
      }
    );

  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}















// ************** app.component.ts ***************
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserDataService } from './user-data.service';
import { UserModel } from './user-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  userDataSubscription!: Subscription;
  userData: UserModel[] = [];
  isError: boolean = false;

  constructor(private userDataService: UserDataService) {}



  onLoadData() {
    this.userDataSubscription = this.userDataService.getUsers().subscribe({
      next: (data) => {
        this.userData = data;
        console.log(data);
        
      },
      error: () => {
        this.isError = true;
      },
      complete: () => {
        console.log('Data was loaded ...');
      },
    });
  }

  

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.userDataSubscription.unsubscribe();
  }
}


