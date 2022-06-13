// *************************************************************************
// ********************************* Example *******************************
// *************************************************************************


// **************************** todo.service.ts ****************************
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, tap, throwError } from "rxjs";
import { Todo } from "./todo.interface";

@Injectable({
    providedIn: 'root'
})

export class TodoService {
    constructor (private http: HttpClient) {}

    



    // 'GET' - get data from server.
    fetchTodos(): Observable<Todo[]> {
        const url = 'https://jsonplaceholder.typicode.com/todos/';

        /**
         * Option 1:
         * You can also create HTTP parameters directly from a query string by using the 'fromString' variable
         * 
         *  const httpOptions = {
         *     headers: new HttpHeaders({
         *         'Content-type': 'application/json; charset=UTF-8',
         *          Authorization: 'my-auth-token'
         *     }),
         *     params: new HttpParams({
         *         fromString: '_limit=5'
         *     })
         *  };
         *
         */

        /**
         * Option 2:
         * Using set() method
         *
         */
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json; charset=UTF-8',
                Authorization: 'my-auth-token'
            }),
                params: new HttpParams()
                .set('name', 'value1')
                .set('name1', 'value2')
                .set('_limit', '5')
        };

        return this.http.get<Todo[]>(url, httpOptions).pipe(
            tap((response) => {
                console.log(response);
            }),
            map(responseTodos => {
                let upadatedResponse: Todo[] = [];
                let randomNum = Math.random();
                for (const responseTodo of responseTodos) {
                    upadatedResponse.push({...responseTodo, randomNum});
                }

                /*
                 * We can also create new object and assign to this object part of values.
                 */
                // for (const responseTodo of responseTodos) {
                //     upadatedResponse.push({
                //       randomNum: randomNum,
                //       title: responseTodo.title,
                //       completed: responseTodo.completed,
                //       id: responseTodo.id
                //     });
                // }

                // return updated response. we add rundom number for our response.
                return upadatedResponse;
            }),
            catchError(this.handleError)
        );
    }








    // 'DELETE' - delete part of data from server
    deleteTodo(id: number): Observable<unknown> {
        const url = `https://jsonplaceholder.typicode.com/todos/${id}`;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json; charset=UTF-8',
                 Authorization: 'my-auth-token'
            })
        };
        return this.http.delete(url, httpOptions).pipe(
            catchError(this.handleError)
        );
    }








    // 'UPDATE' - update part of data in server
    updateTodo(id: number): Observable<Todo> {
        const url = `https://jsonplaceholder.typicode.com/todos/${id}`;
        console.log(url);
        
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json; charset=UTF-8',
                 Authorization: 'my-auth-token'
            })
        };
        const body = {
            completed: true
        };
        return this.http.put<Todo>(url, body, httpOptions).pipe(
            tap((response) => {
                console.log(response);
            }),
            map(responseTodos => {
                let randomNum = Math.random();
                responseTodos.randomNum = randomNum;
                return responseTodos;
            }),
            catchError(this.handleError)
        );
    }








    // 'ADD' - add new data to server
    addTodo(todo: Todo): Observable<Todo> {
        const url = 'https://jsonplaceholder.typicode.com/todos';
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json; charset=UTF-8',
                 Authorization: 'my-auth-token'
            })
        }; 
        return this.http.post<Todo>(url, todo, httpOptions).pipe(
            tap((response) => {
                console.log(response);
            }),
            map(responseTodo => {
                let randomNum = Math.random();
                responseTodo.randomNum = randomNum;
                return responseTodo;
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
            `Backend returned code ${error.status}, body was: `, error.error);
        }
        // Return an observable with a user-facing error message.
        return throwError(() => new Error('Something bad happened; please try again later.'));
      }




      
}








// ************************** todo.interface.ts ******************************
export interface Todo {
    title: string;
    completed: boolean;
    id?: number;
    randomNum?: number;
}









// ************************** app.component.ts ******************************
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Todo } from './shared/todo.interface';
import { TodoService } from './shared/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  userForm = new FormGroup({
    todoTitle: new FormControl('', Validators.required)
  });

  constructor(private todoService: TodoService) {}

  todos: Todo[] = [];
  loadTodosSub!: Subscription;
  deleteTodoSub!: Subscription;
  updateTodoSub!: Subscription;
  addTodoSub!: Subscription;

  ngOnInit(): void {}

  loadTodos() {
    this.loadTodosSub = this.todoService.fetchTodos().subscribe({
      next: (response) => {
        this.todos = response;
      }
    });
  }

  updateTodo(id: number) {
    this.updateTodoSub = this.todoService.updateTodo(id).subscribe({
      next: (todo) => {
        // find current todo in object.
        const completedValue = this.todos.find(t => t.id === todo.id);
        if (completedValue) {
          // update current todo value.
          completedValue.completed = true;
        }
      }
    });
  }

  onAddTodo() {
    if(this.userForm.value) {
      const newTodo: Todo = {
         title: this.userForm.value.title,
         completed: false
      };
      this.addTodoSub = this.todoService.addTodo(newTodo).subscribe({
        next: (todo) => {
          this.todos.push(todo);
        }
      });
    }
    
  }

  deleteTodo(id: number) {
    this.deleteTodoSub = this.todoService.deleteTodo(id).subscribe({
      next: () => {
        // remove deleter todo from todos object.
        this.todos = this.todos.filter(todo => todo.id !== id);
      }
    })
  }

  ngOnDestroy(): void {
    this.loadTodosSub.unsubscribe();
    this.deleteTodoSub.unsubscribe();
    this.updateTodoSub.unsubscribe();
    this.addTodoSub.unsubscribe();
  }

}








// ************************** app.component.html ******************************
<section class="content">
  <div class="todo-content">
    <h1>Angular HttpClient</h1>

    <div class="add-todo">
      <form [formGroup]="userForm" (ngSubmit)="onAddTodo()">
        <div class="form-field">
          <input
             type="text" 
             id="todoTitle" 
             formControlName="todoTitle" >
        </div>
        <div class="form-field">
          <button [disabled]="!userForm.valid" type="submit" >Add</button>
          <button (click)="loadTodos()">Load</button>
        </div>
      </form>
    </div>


    <div class="todo-result">
      <ul>
        <li *ngFor="let todo of todos">
          <div class="todo-result-desc">
            {{todo.title}}
          </div>
          <div class="todo-res-buttons">
            <button (click)="deleteTodo(todo.id!)">delete</button>
            <button (click)="updateTodo(todo.id!)">completed {{todo.completed}}</button>
          </div>
        </li>
      </ul>

    </div>

  </div>
</section>













// *************************** app.module.ts ****************************
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }



