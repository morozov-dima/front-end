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

  topPosts: Posts[] = [];
  // number of top posts thta we want to use
  numberOfTopPosts: number = 2;

  posts$Subscription!: Subscription;

  constructor(private userDataService: UserDataService) { }

  ngOnInit(): void {
    // get top posts from server
    this.posts$Subscription = this.userDataService.getTopPosts(this.numberOfTopPosts).subscribe(topPostsResponse => {
      this.topPosts = topPostsResponse;
    });
  }


  ngOnDestroy(): void {
      this.posts$Subscription.unsubscribe();
  }
  

}