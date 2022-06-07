// *************************************************************************
// ********************************** Example ******************************
// *************************************************************************



// ************************** welcome.service.ts **************************
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { Posts } from "./user-data.interface";

@Injectable({
    providedIn: 'root'
})

export class UserData {
    constructor(private http: HttpClient) {}

    getPosts(): Observable<Posts[]> {
        const url = 'https://jsonplaceholder.typicode.com/posts?_limit=5';
        const httpOptions = {
            headers: new HttpHeaders({
               'Content-Type':  'application/json',
                Authorization: 'my-auth-token'
            }),
          };
        return this.http.get<Posts[]>(url, httpOptions).pipe(
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






// *********** welcome.interface.ts ************
export interface Posts {
  userId: number;
  id: number;
  title: string;
  body: string;
}







// *********** welcome.component.ts ************
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Posts } from '../shared/user-data.interface';
import { UserData } from '../shared/user-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less']
})
export class WelcomeComponent implements OnInit, OnDestroy {

  constructor(private userData: UserData) { }

  posts: Posts[] = [];
  postsSub!: Subscription;
  showError: boolean = false;

  ngOnInit(): void {
    this.postsSub = this.userData.getPosts().subscribe({
      next: (response) => {
        console.log(response);
      },
      complete: () => {
        console.log('complete !!!');
      },
      error: () => {
        console.log('error !!!');
        this.showError = true;
      }
    });
  }


  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }

}













// *************************************************************************
// ********************************** Example ******************************
// *************************************************************************


// *********** api-data.service.ts **************
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsersModel } from './data.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class ApiDataService {

  constructor(private http: HttpClient) { }
 
  getUsersAddress() {
    const url = 'https://jsonplaceholder.typicode.com/users/?_limit=3';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
         Authorization: 'my-auth-token'
      })
    };
    return this.http.get<any>(
      url,
      httpOptions
    )
    .pipe(
      map(
        usersData => {
         const userAddressData: UsersModel[] = []; 
         for (const userData of usersData) {
           userAddressData.push({
            id: userData.id,
            name: userData.name,
            username: userData.username,
            email: userData.email,
            city: userData.address.city,
            street: userData.address.street
           });
           
         }
          return userAddressData;
        }
      )
    );
  }

}
