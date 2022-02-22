import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Comments } from '../shared/user-data';
import { UserDataService } from '../shared/user-data.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {

  commentsData: Comments[] = [];
  userDataSubscription!: Subscription;

  tmp: string = 'x1';
  tmp2: string = 'x2';

  constructor(private userDataService: UserDataService) { }

  ngOnInit(): void {
      this.userDataSubscription = this.userDataService.getComments().subscribe(comments => {
        this.commentsData = comments;
      });
  }


  ngOnDestroy(): void {
      this.userDataSubscription.unsubscribe;
  }

}
