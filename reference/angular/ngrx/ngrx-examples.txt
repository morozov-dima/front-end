// Example:
// *********** app/app.module.ts *************
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found';
import { WelcomeComponent } from './welcome/welcome.component';
import { HttpClientModule } from '@angular/common/http';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }














// ************* app/app.module.html *************
<app-header></app-header>
<router-outlet></router-outlet>











// ************* app/state/app.state.ts *************
import { PostsState } from "../posts/state/posts.interface";
import { UsersState } from "../users/state/users.interface";

export interface State {
    posts: PostsState;
    users: UsersState;
}











// ************* app/app.routing.module.ts ************
import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found";
import { WelcomeComponent } from "./welcome/welcome.component";

const routes: Routes = [
    { path: '', component: WelcomeComponent },
    { path: 'contact-us', component: ContactUsComponent },
    { 
        path: 'posts',
        loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule)
    },
    { 
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
    },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    // with pre-loading we need add this '{preloadingStrategy: PreloadAllModules}' second argument.
    // without pre-loading, just with 'lazy-loading' our modules.
    //imports: [RouterModule.forRoot(routes)],

    imports: [
        // with module preload
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })

        // without module preload
        //RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {}














// ********** app/users/state/actions/index.ts *************
import * as UserPageActions from './users-page.actions';
import * as UserApiActions from './users-api.actions'

export {UserApiActions, UserPageActions}














// ********** app/users/state/actions/users-api.actions.ts ***********
import { createAction, props } from '@ngrx/store';
import { User } from '../users.interface';

export const loadUsersSuccess = createAction(
  '[Users Page] Load Success',
  props<{ users: User[] }>()
);

export const loadUsersFailure = createAction(
  '[Users Page] Load Fail',
  props<{ error: string }>()
);

export const updateUserSuccess = createAction(
  '[Users Page] Update User Success',
  props<{ user: User }>()
);

export const updateUserFailure = createAction(
  '[Users Page] Update User Failure',
  props<{ error: string }>()
);

export const deleteUserSuccess = createAction(
  '[Users Page] Delete User Success',
  props<{ userId: number }>()
);

export const deleteUserFailure = createAction(
  '[Users Page] Delete User Failure',
  props<{ error: string }>()
);














// *********** app/state/actions/users-page.actions.ts ***********
import { createAction, props } from '@ngrx/store';
import { User } from '../users.interface';

export const loadUsers = createAction('[Users Page] Load');

export const toggleUserCode = createAction(
  '[Users Page] Toggle User Code',
  props<{ showCode: boolean }>()
);

export const chooseUser = createAction(
  '[Users Page] Choose User',
  props<{ currentUserId: number }>()
);

export const updateUser = createAction(
  '[Users Page] Update User',
  props<{ user: User }>()
);

export const deleteUser = createAction(
  '[Users Page] Delete User',
  props<{ userId: number }>()
);














// *********** app/state/users.effect.ts ***********
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from './users.service';

import { UserApiActions, UserPageActions } from './actions';
import { catchError, concatMap, map, mergeMap, of } from 'rxjs';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UsersService) {}

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserPageActions.loadUsers),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          map((users) => UserApiActions.loadUsersSuccess({ users })),
          catchError((error) => of(UserApiActions.loadUsersFailure({ error })))
        )
      )
    );
  });

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserPageActions.updateUser),
      concatMap((action) =>
        this.userService.updateCurrentUser(action.user).pipe(
          map((user) => UserApiActions.updateUserSuccess({ user })),
          catchError((error) => of(UserApiActions.updateUserFailure({ error })))
        )
      )
    );
  });

  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserPageActions.deleteUser),
      mergeMap((action) =>
        this.userService.deleteUser(action.userId).pipe(
          map(() =>
            UserApiActions.deleteUserSuccess({ userId: action.userId })
          ),
          catchError((error) => of(UserApiActions.deleteUserFailure({ error })))
        )
      )
    );
  });
}


















// ************ app/users/state/users.interface.ts  *************
export interface UsersState {
  users: User[];
  showCode: boolean;
  currentUserId: number | null;
  error: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  address: string;
  code: string;
}














// ************ app/users/state/users.reducer.ts  *************
import { createReducer, on } from '@ngrx/store';
import { UserApiActions, UserPageActions } from './actions';
import { UsersState } from './users.interface';

// initial State (default value) for users slice
const initialState: UsersState = {
  users: [],
  showCode: false,
  currentUserId: null,
  error: '',
};

// reducer function for users slice
export const userReducer = createReducer<UsersState>(
  initialState,
  on(UserApiActions.loadUsersSuccess, (state, action): UsersState => {
    return {
      ...state,
      users: action.users,
      error: '',
    };
  }),
  on(UserApiActions.loadUsersFailure, (state, action): UsersState => {
    return {
      ...state,
      users: [],
      error: action.error,
    };
  }),
  on(UserPageActions.toggleUserCode, (state, action): UsersState => {
    return {
      ...state,
      // toggle user code from 'users.component.ts'
      showCode: !action.showCode,
    };
  }),
  on(UserPageActions.chooseUser, (state, action): UsersState => {
    return {
      ...state,
      currentUserId: action.currentUserId,
    };
  }),
  on(UserApiActions.updateUserSuccess, (state, action): UsersState => {
    // update users object with updated user.
    const updatedUsers = state.users.map((item) =>
      action.user.id === item.id ? action.user : item
    );

    return {
      ...state,
      users: updatedUsers,
      currentUserId: action.user.id,
      error: '',
    };
  }),
  on(UserApiActions.updateUserFailure, (state, action): UsersState => {
    return {
      ...state,
      error: action.error,
    };
  }),

  on(UserApiActions.deleteUserSuccess, (state, action): UsersState => {
    return {
      ...state,
      users: state.users.filter((user) => user.id !== action.userId),
      currentUserId: null,
      error: '',
    };
  }),

  on(UserApiActions.deleteUserFailure, (state, action): UsersState => {
    return {
      ...state,
      error: action.error,
    };
  })
);












// ************ app/users/state/users.selectors.ts  *************
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { find } from 'rxjs';
import { UsersState } from './users.interface';
import { User } from './users.interface';

const getUserFeatureState = createFeatureSelector<UsersState>('users');

export const getUsers = createSelector(
  getUserFeatureState,
  (state) => state.users
);

export const toggleUserCode = createSelector(
  getUserFeatureState,
  (state) => state.showCode
);

export const getCurrentUserId = createSelector(getUserFeatureState, (state) => {
  return state.currentUserId;
});

export const getCurrentUser = createSelector(
  getUserFeatureState,
  getCurrentUserId,
  (state, currentUserId) => {
    //console.log(state);
    //console.log(currentUserId);
    return currentUserId
      ? state.users.find((p) => p.id === currentUserId)
      : null;
  }
);














// ************ app/users/state/users.service.ts  *************
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, tap, throwError } from "rxjs";
import { User } from "./users.interface";

@Injectable({
    providedIn: 'root'
})

export class UsersService {

    constructor(private http: HttpClient) {}

    getUsers(): Observable<any[]> {
        const url: string = 'https://jsonplaceholder.typicode.com/users?limit=5';
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json',
                 'Key': 'DFDFDGFHGGHGHGHGHG'
            })
        };
        return this.http.get<any[]>(url, httpOptions)
            .pipe(
                map(usersFromResponse => {
                        const user: User[] = [];
                        let index: number = 1;
                        usersFromResponse.forEach(userFromResponse => {
                            user.push({
                                id: index,
                                name: userFromResponse.name,
                                email: userFromResponse.email,
                                address: userFromResponse.address.city,
                                code: userFromResponse.address.zipcode
                            });
                            index++;
                        });
                        return user;
                    }
                ),
                catchError(this.handleError)
            );
    }




    updateCurrentUser(updatedData: User): Observable<User> {
        console.log(updatedData);
        const url: string = 'https://jsonplaceholder.typicode.com/users/1';
       const httpOptions = {
           headers: new HttpHeaders({
            'Content-type': 'application/json; charset=UTF-8',
            'Key': 'DFDFDGFHGGHGHGHGHG'
           })
       };          
       return this.http.put<User>(url, updatedData, httpOptions)
       .pipe(
           catchError(this.handleError)
       )
    }



    deleteUser(userId: number): Observable<{}> {
        const url = `https://jsonplaceholder.typicode.com/users/${userId}`;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json; charset=UTF-8',
                'Key': 'DFDFDGFHGGHGHGHGHG'
            })
        };
        return this.http.delete<User>(url, httpOptions)
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












// ********** app/users/users.module.ts ************
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { UserEffects } from "./state/users.effect";
import { userReducer } from "./state/users.reducer";   // ###### Important - add this line for reducer !!! ######
import { UserComponent } from "./user/user.component";
import { UsersComponent } from "./users.component";
import { UsersRoutingModule } from "./users.routing.module";
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        UsersComponent,
        UserComponent
    ],
    imports: [
      CommonModule,
      HttpClientModule,
      UsersRoutingModule,
      ReactiveFormsModule,
      StoreModule.forFeature('users', userReducer),   // ###### Important - add this line for reducer !!! ######

      // Lazily load our 'products effects' when we load our 'ProductModule'
      EffectsModule.forFeature([UserEffects])
    ]
})

export class UsersModule {

}














// ********** app/users/users.routing.module.ts ************
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UsersComponent } from "./users.component";

const routes: Routes = [
    { path: '', component: UsersComponent }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})

export class UsersRoutingModule {

}




















// ********** app/users/users.component.ts ************
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { State } from '../state/app.state';
import { UserApiActions, UserPageActions } from './state/actions';
import { User } from './state/users.interface';
import { getCurrentUser, getUsers, toggleUserCode } from './state/users.selectors';
import { UsersService } from './state/users.service';




@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})



export class UsersComponent implements OnInit {
  users$!: Observable<User[]>;
  user$!: Observable<User | null | undefined>;
  showCode: boolean = false;
  
  userForm = new FormGroup({
    code: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', Validators.required),
  });


  constructor(private store: Store<State>, private usersService: UsersService) {}


  ngOnInit(): void {
    this.store.dispatch(UserPageActions.loadUsers());
    this.users$ = this.store.select(getUsers);
    this.user$ = this.store.select(getCurrentUser);
    this.store.select(getUsers).subscribe();
    this.store.select(toggleUserCode).subscribe( responseCode => this.showCode = responseCode );
    this.store.select(toggleUserCode)
  }

  toggleCode() {
    this.store.dispatch(
      UserPageActions.toggleUserCode({ showCode: this.showCode })
    );
  }

  saveUser() {
    this.store.dispatch(UserPageActions.updateUser({ user: this.userForm.value }));
  }

  onDeleteUser(id: number) {
    this.store.dispatch(UserPageActions.deleteUser({ userId: id }));
  }

  onChooseUserDetails(userId: number) {
    this.store.dispatch(UserPageActions.chooseUser({ currentUserId: userId }));

    // Watch for changes to the currently selected user
    this.store.select(getCurrentUser).subscribe(
      response => {
        console.log(response);
        this.updateFormFields(response)
      }
    );
  }


  // Updating parts of the form.
  updateFormFields(currentUserDetails: any) {
    this.userForm.patchValue({
      code: currentUserDetails.code,
      name: currentUserDetails.name,
      email: currentUserDetails.email,
      address: currentUserDetails.address
    });
  }

}













// ********** app/users/users.component.html ************

<!-- <app-user></app-user>
 -->

<section class="users">

  <!-- list of users begin -->
  <div class="users-list">
    <div class="users-list-links">
      <ul>
        <li (click)="onChooseUserDetails(user.id)" *ngFor="let user of users$ | async; index as i">
          <a  >{{user.name}}</a>
          <span *ngIf="showCode"> - {{user.code}}</span>
        </li>
      </ul>
    </div>
    <div class="users-list-code">
      <label for="">Show code</label>
      <input (change)="toggleCode()" [checked]="showCode" type="checkbox" id="code" name="code" />
    </div>
  </div>
  <!-- list of users end -->
  

  <div *ngIf="user$ | async as user" class="user-details">
    <form [formGroup]="userForm" (ngSubmit)="saveUser()">
      <div class="user-details-block">
          <label for="code">Code:</label>
          <input formControlName="code" type="text" id="code" name="code" />
      </div>

      <div class="user-details-block">
          <label for="name">Name:</label>
          <input formControlName="name" type="text" id="name" name="name" />
      </div>

      <div class="user-details-block">
          <label for="email" id="email">Email:</label>
          <input formControlName="email" type="email" id="email" />
      </div>   

      <div class="user-details-block">
          <label for="address">Address:</label>
          <input formControlName="address" type="text" id="address" name="address" />
      </div>    

      <div class="user-details-button">
          <button [disabled]="!userForm.valid" type="submit" >Update</button>
           <button type="button" (click)="onDeleteUser(user.id)" >Delete</button> 
      </div>
    </form>
  </div>
</section>











// ********** app/users/users.component.css ************
.users {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 10px;
  margin:10px;
}

.users-list {
  width: 300px;
  border: 1px solid blue;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding:0px;
}

.user-details {
  width: 300px;
  border: 1px solid green;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.user-details-block {
    padding: 5px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
}

.user-details-button {
    display: flex;
    padding-left: 5px;
}

.users-list-code {
    padding: 10px;
}

.users-list-code label {
    padding-right: 5px;
}

.users-list-links ul li {
    list-style: none;
    cursor: pointer;
    background-color: aliceblue;
}


.users-list-links ul {
    padding: 10px;
}

.users-list-links ul li {
    padding: 5px;
    margin: 1px;
}

















