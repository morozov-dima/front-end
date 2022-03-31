import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './state/products.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl =
    'https://jsonplaceholder.typicode.com/posts?_limit=3';

  constructor(private http: HttpClient) {}




  getProducts(): Observable<Product[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<Product[]>(this.productsUrl, { headers }).pipe(
      tap((data) => {
        //console.log(JSON.stringify(data))
      }),
      catchError(this.handleError)
    );
  }




  deleteProduct(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productsUrl}/${id}`;
    return this.http.delete<Product>(url, { headers }).pipe(
      tap((data) => console.log('deleteProduct: ' + id)),
      catchError(this.handleError)
    );
  }




  updateProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productsUrl}/${product.id}`;
    return this.http.put<Product>(url, product, { headers }).pipe(
      tap(() => console.log('updateProduct: ' + product.id)),
      // Return the product on an update
      map(() => product),
      catchError(this.handleError)
    );
  }




  private handleError(error: any) {
    //console.log(error);
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.

    return throwError(
      () => new Error('Something bad happened; please try again later !!!')
    );
  }


  
}
