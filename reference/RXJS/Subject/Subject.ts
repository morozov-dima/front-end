// ************************************************************************
// ***************************** Example 1 ********************************
// ************************************************************************


// Passing data between two components
// We send data from 'users.component.ts' to 'getUsers.service.ts' service
// And them 'user.component.ts' component get data from 'getUsers.service.ts' service



// ************************ users.component.ts ********************
import { Component } from '@angular/core';
import { UsersService } from '../shared/getUsers.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  constructor(private usersService: UsersService) { }
  onSendData() {
    const number = 100;
    this.usersService.userData.next(number);
  }
}







// ********************* getUsers.service.ts **********************
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class UsersService {
    userData = new Subject<number>(); 
    constructor() {}
}







// ************************** user.component.ts ***********************
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/getUsers.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
   this.usersService.userData.subscribe(
      (response) => {
        console.log(response);
      }
    );
  }
}



