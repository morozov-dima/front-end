import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Posts } from '../shared/user-data';
import { UserDataService } from '../shared/user-data.service';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit, OnDestroy {

  posts: Posts[] = [];
  posts$Subscription!: Subscription;

  showError: boolean = false;

  constructor(private userDataService: UserDataService) { }


  ngOnInit(): void {
    //get posts data from service
    this.posts$Subscription = this.userDataService.getPosts().subscribe({
      next: (postsData) => {
        this.posts = postsData;
      },
      error: () => {
        // show error message
        this.showError = true;
      },
      complete: () => {
        console.log('get posts subscribe completed !!!');
      }
    }); 
 }



  ngOnDestroy(): void {
      this.posts$Subscription.unsubscribe();
  }

}
