import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiDataService } from '../shared/api-data.service';
import { PostsModel } from '../shared/data-model';

// test123
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {
  posts: PostsModel[] = [];
  postsSubscription!: Subscription;

  constructor(private apiDataService: ApiDataService) { }



  
  ngOnInit(): void {
    this.postsSubscription = this.apiDataService.getPosts().subscribe({
      next: postsData => {
        this.posts = postsData;
        console.log(this.posts);
      },
      error: () => {
        console.error('getPosts subscription error');
      },
      complete: () => {
        console.log('getPosts subscribtion compteted...');
        
      }
    });
  }












  ngOnDestroy(): void {
    this.postsSubscription.unsubscribe();
  }

}
