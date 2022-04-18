import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { PromotionsPageActions } from './state/actions';
import { PostsResponse } from './state/promotions.interface';
import { getPosts } from './state/promotions.selector';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css'],
})
export class PromotionsComponent implements OnInit, OnDestroy {
  constructor(private http: HttpClient, private store: Store) {}

  postsSub!: Subscription;
  posts: PostsResponse[] = [];

  ngOnInit(): void {
    this.store.dispatch(PromotionsPageActions.LoadPosts());

    this.postsSub = this.store.select(getPosts).subscribe((response) => {
      this.posts = response;
    });

    console.log(this.posts);
    
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
}
