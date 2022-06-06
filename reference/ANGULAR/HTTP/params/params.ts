// **************************************************************************
// ********************************* Example ********************************
// **************************************************************************


// ************ user-data.service.ts *************
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Posts } from './user-data';

@Injectable({
  providedIn: 'root'
})

export class UserDataService {
  constructor(private http: HttpClient) { }

      // get posts data from server
      getPosts(): Observable<Posts[]> {
        const url = 'https://jsonplaceholder.typicode.com/posts';

        const options = {
          // You can also create HTTP parameters directly
          // from a query string by using the fromString variable (this is angular variable from HttpParams)
          params: new HttpParams({
            fromString: '_limit=2'
          }),
          // Adding and updating headers
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
             Authorization: 'my-auth-token-xysdgfhejwjfe'
          })
        };

        return this.http.get<Posts[]>(url, options).pipe(
          catchError(this.handleError)
        );
      }

}


