import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];

  // we will add loader
  // hide loader
  isFetching: boolean = false; 

  error = null;

  // it is a good practive to unsubscribe
  private errorSub: Subscription;

  constructor(private postsService: PostsService) {}



  ngOnInit() {
      // now we can subscribe to subject that return error from our service.
      // we will store our subscription in 'errorSub' property.
      this.errorSub = this.postsService.error.subscribe(errorMessage => {
        this.error = errorMessage;
      });

      // show loader
      this.isFetching = true;
      // Whenever this page loads, whenever this app loads , I want to
      // fetch post (send Http request), using our service.
      this.postsService.fetchPosts().subscribe(posts => {
        // hide loader
        this.isFetching = false;
        // save data from server in local variable
        this.loadedPosts = posts;
      }, error => {
        // show system error message,  we can also show our own error message.
        this.error = error.message; 
        //console.log(error);
      });
  }



  onCreatePost(postData: Post) {
    // send data to server
    this.postsService.createAndStorePost(postData.title, postData.content);
  }
  


   onFetchPosts() {
    // get data from server
    this.postsService.fetchPosts().subscribe(posts => {
      // hide loader
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error => {
      // hide loader
      this.isFetching = false;
      // show system error message,  we can also show our own error message.
      this.error = error.message; 
    });
  }
 


  onClearPosts() {
    // send Http request to server and delete data
    this.postsService.deletePost().subscribe(() => {
      this.loadedPosts = []; // delete all items from array
    });
  }

  

  onHandleError() {
    this.error = null;
  }



  ngOnDestroy(): void {
      // here we need unsubscribe
      this.error.unsubscribe();
  }

}
