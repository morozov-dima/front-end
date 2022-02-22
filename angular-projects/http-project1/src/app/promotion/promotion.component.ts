import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Comments } from '../shared/user-data';
import { UserDataService } from '../shared/user-data.service';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit, OnDestroy {

  commentItems: Comments[] = [];
  commentItemsSubscription!: Subscription;

  constructor(private userDataService : UserDataService) { }


  ngOnInit(): void {

    // load comments data from service
    this.commentItemsSubscription = this.userDataService.getComments().subscribe(comments => {
      this.commentItems = comments;
    });
  }

  ngOnDestroy(): void {
      this.commentItemsSubscription.unsubscribe();
  }

}
