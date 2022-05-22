import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Comments } from '../shared/comments.interface';
import { CommentsService } from '../shared/comments.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  providers: [CommentsService] // provide service in component
})
export class WelcomeComponent implements OnInit, OnDestroy {

  constructor(
    private commentsService: CommentsService
  ) { }

  panelOpenState: boolean = false;
  comments: Comments[] = [];  
  commentsSub!: Subscription;  

  ngOnInit(): void {
    this.commentsSub = this.commentsService.getCommnets().subscribe(
      responseComments => {
        console.log(responseComments);
        this.comments = responseComments;
      }
    );
  }
  
  ngOnDestroy(): void {
     this.commentsSub.unsubscribe(); 
  }

}
