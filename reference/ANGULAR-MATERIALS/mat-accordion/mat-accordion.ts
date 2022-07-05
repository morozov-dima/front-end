
// *************************************************************************
// ********************************* Example  ******************************
// *************************************************************************




// *********************** welcome.component.html **********************
<section class="welcome">
  <div class="welcome-content">
    <mat-accordion>

      <mat-expansion-panel *ngFor="let comment of comments">
        <mat-expansion-panel-header>
          <mat-panel-title> {{comment.name}} </mat-panel-title>
        </mat-expansion-panel-header>
        <p>
          {{comment.body}}
        </p>
      </mat-expansion-panel>

    </mat-accordion>
  </div>
</section>









// ******************** welcome.component.css ********************
.welcome {
    width: 100%;
}

.welcome-content {
    display: flex;
    justify-content: center;
    flex-direction: row;
    padding:10px;
}





// ********************* welcome.component.ts *******************
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





// ********************* comments.service.ts **********************
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { LoggerService } from "../logger/logger.service";
import { Comments } from "./comments.interface";

@Injectable()

export class CommentsService {
    constructor(
        private http: HttpClient,
        private loggerService: LoggerService
    ) {}

    getCommnets(): Observable<Comments[]> {
        const url = 'https://jsonplaceholder.typicode.com/posts/1/comments/';
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'my-auth-token'
            })
        };
        return this.http.get<Comments[]>(url, httpOptions).pipe(
            catchError(this.loggerService.handleError)
        );
    }

}






// ************************ comments.interface.ts ************************
export interface Comments {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}








