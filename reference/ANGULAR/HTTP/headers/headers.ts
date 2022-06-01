
// *************************************************************************
// ********************************** Example ******************************
// *************************************************************************




// **************************** products.service.ts ************************
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private productsUrl = 'https://jsonplaceholder.typicode.com/posts?_limit=3';

  constructor(private http: HttpClient) { }


  getProducts(): Observable<Product[]> {
    const httpOptions = {
      headers: new HttpHeaders({
         'Content-Type':  'application/json',
          Authorization: 'my-auth-token'
      }),
    };
    return this.http.get<Product[]>(this.productsUrl, httpOptions).pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }


}


