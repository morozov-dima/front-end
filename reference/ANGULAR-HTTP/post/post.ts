// *************************************************************************
// ********************************* Example *******************************
// *************************************************************************


// ************************ here.service.ts **********************
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class HeroService {
  constructor(private http: HttpClient) { }

  /** POST: add a new hero to the database */
  addHero(hero: Hero): Observable<Hero> {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const httpOptions = {
      params: new HttpParams({
        fromString: '_limit=2'
      }),
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
         Authorization: 'my-auth-token-xysdgfhejwjfe'
      })
    };

    return this.http.post<Hero>(url, hero, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }




  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }




}


