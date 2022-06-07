// **************************************************************************
// ********************************* Example ********************************
// **************************************************************************


// ************ user-data.service.ts *************
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Posts } from './user-data';

@Injectable({
  providedIn: 'root'
})

export class UserDataService {
  constructor(private http: HttpClient) { }

      getPosts(): Observable<Posts[]> {
        const url = 'https://jsonplaceholder.typicode.com/posts';

        const options = {
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


