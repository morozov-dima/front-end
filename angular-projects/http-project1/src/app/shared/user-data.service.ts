import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Comments, Posts } from './user-data';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient) { }



  /*
    get posts from https://jsonplaceholder.typicode.com/posts?_limit=10
  */
  getPosts(): Observable<Posts[]> {
    const url =' https://jsonplaceholder.typicode.com/posts?_limit=10';
    return this.http.get<Posts[]>(url);
  }




  /*
    get comments from https://jsonplaceholder.typicode.com/posts/1/comments
  */
  getComments(): Observable<Comments[]> {
    const url = 'https://jsonplaceholder.typicode.com/posts/1/comments';
    return this.http.get<Comments[]>(url);
  }




  /*
    send comments to https://jsonplaceholder.typicode.com/posts/1/comments
    in Network we can see that 'Request Method : POST'
    and 'Status Code: 201' this means 'Created'
  */
  createComments(comments: Comments) {
    const url = 'https://jsonplaceholder.typicode.com/posts/1/comments';
    return this.http.post<Comments>(url, comments);
  }



}
