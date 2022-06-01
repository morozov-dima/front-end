// *************************************************************************
// ********************************* Example *******************************
// *************************************************************************


// ************************** products.service.ts **************************
import { map, Observable, tap, throwError, catchError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Product } from './products.interface';


@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private productsUrl = 'https://jsonplaceholder.typicode.com/posts?_limit=3';

  constructor(private http: HttpClient) { }

  updateProduct(product: Product): Observable<Product> {
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        }),
    };
    const url = `${this.productsUrl}/${product.id}`;
    return this.http.put<Product>(url, product, httpOptions).pipe(
        tap(() => console.log('updateProduct: ' + product.id)),
        // Return the product on an update
        map(() => product),
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







