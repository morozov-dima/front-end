
// *************************************************************************
// ******************************** Example  *******************************
// *************************************************************************

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-routing',
  templateUrl: './routing.component.html',
  styleUrls: ['./routing.component.css']
})
export class RoutingComponent implements OnInit {

  constructor(
      private router: Router,
      private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params['id'] === 0) {
        this.router.navigate(['/404']);
      }
    });
  }

  goBack() {
    // navigate to posts page
    this.router.navigate(['/posts']);
  }

}











// *************************************************************************
// ******************************** Example  *******************************
// *************************************************************************

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











// *************************************************************************
// ******************************** Example  *******************************
// *************************************************************************

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})

export class UserDataComponent implements OnInit {

  constructor( private route: ActivatedRoute ) { }

  aTracker: string = '';
  bTracker: string = '';

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.aTracker = params['a'];
      this.bTracker = params['b'];
    });
  }

}



