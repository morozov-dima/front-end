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

    // user data
    this.usersSubscription = this.apiDataService.getUsers().subscribe({
      next: usersData => {
        //console.log(usersData);
      },
      error: () => {
        console.error('error in getUsers subscription');
      }
    });





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
    this.usersSubscription.unsubscribe();
    this.usersAddressSubscription.unsubscribe();
  }

  

}
