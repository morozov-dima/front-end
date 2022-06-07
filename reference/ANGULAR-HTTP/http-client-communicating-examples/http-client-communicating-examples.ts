

// *****************************************************************
// *************************** Example  ****************************
// *****************************************************************


// ********************* apartments-service.ts *********************

import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { Apartment } from "./apartments-interface";

@Injectable({
  providedIn: 'root'
})

export class ApartmentsService {

    constructor(
        private http: HttpClient
    ) {}

    getApartments(): Observable<Apartment[]> {
        const url = '../../../assets/apartments-data.json';
        return this.http.get<Apartment[]>(url).pipe(
            map(
                (responseApartments) => {
                    // we will add id to our response
                    let updatedApartmentsResponse: Apartment[] = [];
                    let id: number = 1;
                    for (const responseApartment of responseApartments) {
                        console.log(responseApartment);
                        updatedApartmentsResponse.push({...responseApartment, id});
                        id++;
                    }
                    return updatedApartmentsResponse;
                }
            ),
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            console.log('An error occured:', error.error);
        } else {
            console.log(`Backend returned code ${error.status}, body was: `, error.error);
        }
        return throwError(() => new Error('Something bad happend; please try again later.'));
     }   

}






// ************************** apartments-interface.ts ****************************
export interface ApartmentsState {
    apartments: Apartment[];
    error: string;
}

export interface Apartment {
    id?: number;
    name: string;
    reviewScore: number;
    starRating: number;
    price: number;
    freeCancellation: boolean;
    distanceFromClosestBeach : number;
}









// *****************************************************************
// *************************** Example  ****************************
// *****************************************************************


// ************** user.data.service.ts ***************
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserModel } from './user-model';

@Injectable({
  providedIn: 'root',
})

export class UserDataService {
  constructor(private http: HttpClient) {}


  getUsers(): Observable<UserModel[]> {
    const url = 'https://jsonplaceholder.typicode.com/users/?_limit=3';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
         Key: 'XYZ123KPY483',
      }),
    };
    return this.http.get<UserModel[]>(url, httpOptions).pipe(
      map((userData) => {
        const newUserData: UserModel[] = [];
        let index = 1;
        for (const uData of userData) {
          newUserData.push({
            id: index,
            name: uData.name,
            username: uData.username,
            email: uData.email,
          });
          index++;
        }

        return newUserData;
      }),
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
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }



}






















// *****************************************************************
// *************************** Example  ****************************
// *****************************************************************


// ************** users.service.ts ***************
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map } from "rxjs";
import { HandleErrorService } from "src/app/shared/error/error.service";
import { User } from "./users.interface";

@Injectable({
    providedIn: 'root'
})

export class UsersService {
    constructor(
      private http: HttpClient,
      private handleErrorService: HandleErrorService
    ) {}

    getUsers() {
        const url = 'https://jsonplaceholder.typicode.com/users/?_limit5';
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Key': 'DFDFDFDFDFD34343DDSDSDS'
            })
        };
        return this.http.get<User[]>(url, httpOptions).pipe(
            map((responseData) => {
                const userArray: User[] = [];
                for (const key in responseData) {
                    if (responseData.hasOwnProperty(key)) {
                        userArray.push({ ...responseData[key], network: 'best games' });
                    }
                }
                return userArray;
            }),
            catchError(this.handleErrorService.handleError)
        );
    }
}












// **************************************************************************
// ****************************** Example 7: ********************************
// **************************** Get to 3 users ******************************
// **************************************************************************


// ******************** user-data.service.ts *************************

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";


interface Todos {
    userId: number;
    id: number;
    title: string;
    completed: string;
}

@Injectable({
    providedIn: 'root'
})

export class UserDataService {
    constructor(private http: HttpClient) {}


    getTop3Users() {
        
        const url = 'https://jsonplaceholder.typicode.com/todos/?_limit=10';
        const httpOptions = {
            headers: new HttpHeaders({
                'key': 'DGDFDFDUIOILJGHDGRR4545454'
            })
        };
        return this.http.get<Todos[]>(url, httpOptions).pipe(
            // ************** get top 3 users **************
            map((usersData) => {
                // list of top 3 users
                const usersDataTop3: Todos[] = []; 

                // we will compare each user id with this value
                let currentIndex: number = 0;

                // in this empty array we will save list of indexes
                let listOfIndexes: number[] = [];
   
                // loop over top 3 users
                for (let index = 0; index < 3; index++) {
                    // loop over array of objects
                    for (const userData of usersData) {
                        // if current user id bigger that 'currentIndex'
                        // or this user already appear in our 'listOfIndexes' array.
                        if((userData.id > currentIndex) && (listOfIndexes.indexOf(userData.id) === -1)) {
                            currentIndex = userData.id;
                        }
                    }
        
                    // add big index to 'listOfIndexes' array
                    listOfIndexes.push(currentIndex)
                
                    // find current object from array of objects according to 'currentIndex'
                    let getUserDataByIndex: any = usersData.find(el => el.id === currentIndex );

                    // add object with big id to output array.
                    usersDataTop3.push(getUserDataByIndex);

                    currentIndex = 0;
                }

                // return new updated array of objects
                return usersDataTop3;
            })
        );
    }

}


















// **************************************************************************
// ****************************** Example 8: ********************************
// ******************** Get only part of data from json *********************
// **************************************************************************

// 1. in this example we send data to 'https://swapi.dev/api/people/' free online REST API



// ************************* get-data.service.ts ****************************
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { UserData } from './user-data.interface';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(
    private http: HttpClient
  ) { }


    getData() {
      const url = 'https://swapi.dev/api/people/';
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      return this.http.get<any>(url, httpOptions).pipe(
        map((response) => {
          const responseResults = response.results;
          
          // we can take part of our response with js .map method
          const outputResult = responseResults.map((data: any, index: number) => { // <- #################### map() js method #####################
            return { userId: index + 1, userName: data.name}
          });

          return outputResult;
        })
      );
    }

}





// *********************** user-data.interface.ts ***********************
export interface UserData {
    userId: number;
    userName: string;
}












// **************************************************************************
// **************************************************************************
// ****************************** Example 9: ********************************
// **************************************************************************
// **************************************************************************



// ***************************** getUsers.service.ts ************************
import { Injectable } from "@angular/core";
import { GetUsersInterface } from "./getUsers.interface";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, find, map, Observable, of, pipe } from "rxjs";
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class UsersService {

    constructor(
        private http: HttpClient
    ) {}


    getUsers() {
        const url = 'https://swapi.dev/api/people/?format=json';
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.get<any>(url, httpOptions).pipe(
            map(response => {
                const listOfUsers = response.results;
                const newUsersArray = listOfUsers.map((user: any, index: number) => {
                    return { userId: index + 1, userName: user.name}
                });
                
                return newUsersArray;
            })
        );
    }





    getUser(id: number) {
        const url = 'https://swapi.dev/api/people/?format=json';
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.get<any>(url, httpOptions).pipe(
            map(response => {
                const listOfUsers = response.results;
                const newUsersArray = listOfUsers.map((user: any, index: number) => {
                    return { userId: index + 1, userName: user.name}
                });

                const userPerId = newUsersArray.find((user: any) => user.userId === id);
                
                return userPerId;
            })
        );
    }
    
}































// **************************************************************************
// **************************************************************************
// ****************************** Example : ********************************
// **************************************************************************
// **************************************************************************


// ************************** userData.service.ts **************************
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { Todo } from "./todo.interface";


@Injectable({
    providedIn: 'root'
})

export class UserData {
    constructor(private http: HttpClient) {}

    fetchToDos(): Observable<Todo[]> {
        const url = 'https://jsonplaceholder.typicode.com/todos';
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            })
        };
        return this.http.get<Todo[]>(url, httpOptions).pipe(
            catchError(this.handleError)
        );
    }


    saveToDos(todo: Todo[]) {
        const url = 'https://jsonplaceholder.typicode.com/todos';
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            })
        };
        return this.http.post<Todo[]>(url, todo, httpOptions).pipe(
            catchError(this.handleError)
        );
    }



    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            console.log('An error occured:', error.error);
        } else {
            console.log(`Backend returned code ${error.status}, body was: `, error.error);
        }
        return throwError(() => new Error('Something bad happend; please try again later.'));
     }  


}







// ***************************** todo.interface.ts ****************************
export interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}





// ************************* app.component.ts ****************************
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Todo } from './todo.interface';
import { UserData } from './userData.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(private userData: UserData) {}

  profileForm = new FormGroup({
    todoName: new FormControl('', Validators.required)
  });

  todos: Todo[] = [];
  todosSub!: Subscription;

  onSubmit() {
    this.todos.push({
      title: this.profileForm.value.todoName,
      completed: true,
      id: 1,
      userId: 11
    });
  }

  saveToDb() {
    this.todosSub = this.userData.saveToDos(this.todos).subscribe(
      response => {
        console.log(response);
      }
    );
  }


  fetchData() {
    this.todosSub = this.userData.fetchToDos().subscribe(
      response => {
        this.todos = response;
      }
    );
  }

  deleteTodo(index: number) {
    this.todos.splice(index, 1);
  }


  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.todosSub.unsubscribe();
  }
}









// **************************************************************************
// ******************************** Example  ********************************
// **************************************************************************


// ************************* todo-data.service.ts **************************
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { Todos } from "./todo-interface";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class TodoDataService {
    constructor(private http: HttpClient) {}
    apiKey: string = environment.apiKey;

    fetchToDos(): Observable<Todos[]>{
        const url = 'https://jsonplaceholder.typicode.com/todos/?_limit=5';
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            params: new HttpParams().set('apiKey', this.apiKey)
        };
        return this.http.get<Todos[]>(url, httpOptions).pipe(
            catchError(this.handleError)
        );
    }



    saveTodos(todosList: Todos[]) {
        const url = 'https://jsonplaceholder.typicode.com/todos';
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            params: new HttpParams().set('apiKey', this.apiKey)
        };
        return this.http.post(url, todosList, httpOptions).pipe(
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


