import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiDataService } from '../shared/api-data.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  usersSubscription!: Subscription;

  constructor(private apiDataService: ApiDataService) { }

  ngOnInit(): void {
    
    this.usersSubscription = this.apiDataService.getUsers().subscribe({
      next: usersData => {
        console.log(usersData);
        
      },
      error: () => {
        console.error('error in getUsers subscription');
        
      }
    });
  }

  ngOnDestroy(): void {
    
  }

  

}
