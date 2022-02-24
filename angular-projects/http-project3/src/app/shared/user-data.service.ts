import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comments, Posts } from './user-data.model';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient) { }



  /*
   * get comments from server. here we use GET method   
   */
  getComments():Observable<Comments[]> {
    const url = 'https://jsonplaceholder.typicode.com/comments';
    const httpOptions = {
      headers: new HttpHeaders({
        'key': 'xswrtvhtdd'
      }),
      params: new HttpParams({
        fromString: '_limit=5'
      })
    }

    return this.http.get<Comments[]>(url, httpOptions);
  }  






  /*
   * get posts from server. here we use GET method   
   */
  getPosts(): Observable<Posts[]> {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const httpOptions = {
      params: new HttpParams({
        fromString: '_limit=5'
      })
    }

    return this.http.get<Posts[]>(url, httpOptions);
  }




  
}
