import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiDataService } from '../shared/api-data.service';
import { CommentsModel } from '../shared/data-model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, OnDestroy {
  comments: CommentsModel[] = [];
  commentsSubscription!: Subscription;

  constructor(private apiDataService: ApiDataService) { }




  ngOnInit(): void {
    this.commentsSubscription = this.apiDataService.getComments().subscribe({
      next: commentsData => {
        this.comments = commentsData;
      },
      error: () => {
        console.error('getComments subscribsion error');
      },
      complete: () => {
        console.log('getComments subscribsion completed ...');
      }
    });
  }




  ngOnDestroy(): void {
    this.commentsSubscription.unsubscribe();
  }

}
