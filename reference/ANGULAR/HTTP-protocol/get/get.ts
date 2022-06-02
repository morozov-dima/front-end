// *************************************************************************
// ********************************** Example ******************************
// *************************************************************************


// ************************** products.service.ts **************************
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Product } from './products.interface';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private productsUrl = 'https://jsonplaceholder.typicode.com/posts?_limit=3';
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    const httpOptions = {
      headers: new HttpHeaders({
         'Content-Type':  'application/json'
      }),
    };
    return this.http.get<Product[]>(this.productsUrl, httpOptions).pipe(
        tap(data => console.log(JSON.stringify(data))),
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



// *********** products.interface.ts ************
export interface Product {
    userId: number;
    id: number;
    title: string;
    body: string;
}







