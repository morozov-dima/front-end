import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Posts } from '../shared/user-data';
import { UserDataService } from '../shared/user-data.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {

  posts: Posts[] = [];
  posts$Subscription!: Subscription;
  showError: boolean = false;

  constructor(private userDataService: UserDataService) { }

  ngOnInit(): void {
    this.posts$Subscription = this.userDataService.getPosts().subscribe({
      next: postsReq => {
        this.posts = postsReq;
      },
      error: () => {
        // show error
        this.showError = true;
      },
      complete: () => {
        console.log('subscription to get posts completed !!!');
      }
    })
  }


  ngOnDestroy(): void {
      
  }

}
