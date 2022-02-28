import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Comments, Posts, UserData } from '../shared/user-data';
import { UserDataService } from '../shared/user-data.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {

  numberOfTopComments: number = 2;
  numberOfTopPosts: number = 2;
  topComments: Comments[] = [];
  userData: UserData[] = [];

  topComments$Subscription!: Subscription;
  userData$Subscription! : Subscription;

  constructor(private userDataService: UserDataService) { }

  ngOnInit(): void {
    // get number of top comments
    this.topComments$Subscription = this.userDataService.getTopComments(this.numberOfTopComments).subscribe(responseDataTopComments => {
      this.topComments = responseDataTopComments;
    })

    // get user data from service
    // we pass into 'getUserData' method number
    // of topPosts and number of topComments
    this.userData$Subscription = this.userDataService.getUserData(this.numberOfTopPosts, this.numberOfTopComments).subscribe(responseUserData => {
      this.userData = responseUserData;
    });
  }


  ngOnDestroy(): void {
      this.topComments$Subscription.unsubscribe();
      this.userData$Subscription.unsubscribe();
  }

}
