import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { Product } from "./products.interface";


@Injectable({
    providedIn: 'root'
})

export class ProductsService {
    constructor(private http: HttpClient) {}

    getProducts(): Observable<Product[]> {
        const url = 'https://jsonplaceholder.typicode.com/comments/?_limit=5';
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              Authorization: 'my-auth-token'
            })
        };
        return this.http.get<Product[]>(url, httpOptions).pipe(
            catchError(this.handleError)
        );
    }  




    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
          console.error('An error occurred:', error.error);
        } else {
          console.error(
            `Backend returned code ${error.status}, body was: `, error.error);
        }
        return throwError(() => new Error('Something bad happened; please try again later.'));
      }


}