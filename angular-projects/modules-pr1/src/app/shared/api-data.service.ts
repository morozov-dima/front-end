import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentsModel, PostsModel } from './data-model';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {

  constructor(private http: HttpClient) { }


  getPosts() {
    const url = 'https://jsonplaceholder.typicode.com/posts/?_limit=5';
    const httpOptions = {
      headers: new HttpHeaders({
        'Custom-Header': 'Hello Posts'
      }),
    };

    return this.http.get<PostsModel[]>(
      url,
      httpOptions
    );
  }






  getComments() {
    const url = 'https://jsonplaceholder.typicode.com/comments/?_limit=5';
    const httpOptions = {
      headers: new HttpHeaders({
        'Custom-Header': 'Hello Comments'
      }),
    };
    
    return this.http.get<CommentsModel[]>(
      url,
      httpOptions
    );
  }




}
