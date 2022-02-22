import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Posts } from '../shared/user-data';
import { UserDataService } from '../shared/user-data.service';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit, OnDestroy {

  postsList: Posts[] = [];
  userDataSubscription!: Subscription;

  constructor(private userDataService: UserDataService) { }

  ngOnInit(): void {
    this.userDataSubscription = this.userDataService.getPosts().subscribe(posts => {
      this.postsList = posts;  
    });
  }


  ngOnDestroy(): void {
      this.userDataSubscription.unsubscribe();
  }

}
