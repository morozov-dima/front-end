

// *************************************************************
// ************************* Example  **************************
// *************************************************************


// ************************* bank-account.ts ************************
@Component({
  selector: 'bank-account',
  template: `
    Bank Name: {{bankName}}
    Account Id: {{id}}
  `
})
class BankAccount {
  @Input() bankName: string;
  @Input('account-id') id: string;


  normalizedBankName: string;
}



// ************************* app.component.ts ************************
@Component({
  selector: 'app',
  template: `
    <bank-account bankName="RBC" account-id="4747"></bank-account>
  `
})
class App {}










// *************************************************************
// ************************* Example  **************************
// *************************************************************


// **************** users.component.html ******************
<section class="users-content">
  <div class="user-content-block">
    <app-user [usersAddressData]="usersAddressData"></app-user>
  </div>

  <div *ngIf="showLoader" class="user-content-block">
    <app-loader></app-loader>
  </div>

</section>






// ************* users.component.ts ***************
import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ApiDataService } from '../shared/api-data.service';
import { UsersModel } from '../shared/data.model';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  showLoader: boolean = true;

  usersSubscription!: Subscription;
  usersAddressSubscription!: Subscription;

  usersAddressData: UsersModel[] = [];

  constructor(private apiDataService: ApiDataService) { }

  ngOnInit(): void {


    // user address data
    this.usersAddressSubscription = this.apiDataService.getUsersAddress().subscribe({
      next: usersAddressData => {
        this.usersAddressData = usersAddressData;
        console.log(this.usersAddressData);
        this.showLoader= false;
      },
      error: () => {
        console.log('error in getUsersAddress');
      }
    });


  }

  ngOnDestroy(): void {
    this.usersAddressSubscription.unsubscribe();
  }

}






// ************** user.component.html ****************
<table>
    <tr *ngFor="let userAddressData of usersAddressData">
        <td >{{userAddressData.id}}</td>
        <td>{{userAddressData.name}}</td>
        <td>{{userAddressData.username}}</td>
        <td>{{userAddressData.email}}</td>
        <td>{{userAddressData.city}}</td>
        <td>{{userAddressData.street}}</td>
    </tr>
</table>




// ************* user.component.ts *****************
import { Component, Input, OnInit } from '@angular/core';
import { UsersModel } from 'src/app/shared/data.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() usersAddressData: UsersModel[] = [];
  constructor() { }

  ngOnInit(): void {
 
  }

}







// ************ data.model.ts ***************
export interface UsersModel {
    id: number;
    name: string;
    username: string;
    email: string;
    city: string;
    street: string;
}








// *********** api-data.service.ts **************
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ContactUsModel, UsersModel } from './data.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class ApiDataService {

  constructor(private http: HttpClient) { }

 
  // get data from server with GET
  getUsersAddress() {
    const url = 'https://jsonplaceholder.typicode.com/users/?_limit=3';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
         Authorization: 'my-auth-token'
      })
    };
    return this.http.get<any>(
      url,
      httpOptions
    )
    // 1. here we want change our response.
    // 2. we will use map() operator in order to change object 
    //    that we get from server as responce.
    // 3. we declare new object 'userAddressData' and we will
    //    assign to this object values from object that we get 
    //    from response.
    .pipe(
      map(
        usersData => {
         // create new object according to our interface. 
         const userAddressData: UsersModel[] = []; 
       
         // 1. we loop for our array of objects.
         // 2. 'userData' is each object in our array.
         for (const userData of usersData) {
           // 1. we assign new vakues to 'userAddressData'
           //    array of objects. Then we will return this new object
           //    and in html page we will subscribe to current method and we will
           //    get new updated object according to our 'UsersModel' interface.
           userAddressData.push({
            id: userData.id,
            name: userData.name,
            username: userData.username,
            email: userData.email,
            city: userData.address.city,
            street: userData.address.street
           });
           
         }
          // 1. here we return new updated object.
          // 2. this object take only part of values from object 
          //    that we get from response.
          return userAddressData;
        }
      )
    );
  }

}

















// *************************************************************
// ************************* Example  **************************
// *************************************************************


// *********************** game-control.ts ************************
import { Component } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})

export class GameControlComponent  {
  number: number = 0;
  interval: any;
  oddNumber!: number;
  evenNumber!: number;

  constructor() { }
 
  onStartGame(){
    this.interval = setInterval(() => {
      this.number++;
      // if (this.number % 2 === 0) { 
      //   // even numbers
      //   this.evenNumber = this.number;
      // } else {
      //   // odd numbers
      //   this.oddNumber = this.number;
      // }

      this.number % 2 === 0 ? this.evenNumber = this.number : this.oddNumber = this.number;

    }, 1000);
  }

  onStopGame(){
    clearInterval(this.interval);
    this.interval = null;
  }

}







// *********************** game-control.html ************************
<app-odd 
    [oddNumber]="oddNumber" >
</app-odd>

<app-even 
    [evenNumber]="evenNumber" >
</app-even>

<button (click)="onStartGame()">Start Game</button>
<button (click)="onStopGame()">Stop Game</button>








// ********************* even.component.ts ********************
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-even',
  templateUrl: './even.component.html',
  styleUrls: ['./even.component.css']
})
export class EvenComponent implements OnInit {
  @Input() evenNumber!: number;

  constructor() { }

  ngOnInit(): void {
    
  }

}







// ****************** even.component.html ******************
<p [ngStyle]="{
    'background-color': 'red',
    'color': '#ffffff'
}">
    {{ evenNumber }}
</p>









// ****************** odd.component.ts ********************
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-odd',
  templateUrl: './odd.component.html',
  styleUrls: ['./odd.component.css']
})
export class OddComponent implements OnInit {
  @Input() oddNumber!: number;

  constructor() { }

  ngOnInit(): void {
     
  }

}







// ****************** odd.component.html ********************
[ngStyle]="{
    'background-color': 'blue',
    'color': '#ffffff'
}" >{{ oddNumber }}</p>










