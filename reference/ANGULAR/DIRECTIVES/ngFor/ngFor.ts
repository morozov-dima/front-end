// *********************************************************
// ********************** Example 1 ************************
// *********************************************************

// *********** html file ************
<table class="table">
    <thead>
      <tr>
        <th scope="col">postId</th>
        <th scope="col">Name</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let commentItem of commentItems; index as i;">
        <th scope="row">{{i+1}}</th>
        <td>{{commentItem.name}}</td>
      </tr>
    </tbody>
  </table>






  // ********* promotions.component.ts ************
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
    this.commentItemsSubscription = this.userDataService.getComments().subscribe(comments => {
      this.commentItems = comments;
    });
  }

  ngOnDestroy(): void {
      this.commentItemsSubscription.unsubscribe();
  }

}




