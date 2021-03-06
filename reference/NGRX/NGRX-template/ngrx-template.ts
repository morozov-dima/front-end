// **********************************************************************
// **************************** Example 1 *******************************
// **********************************************************************






// *****************************************
// ************ app.module.ts **************
// *****************************************
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app.routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    // Store Module. connect this module here in order to use
    // Store in your 'app'
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    
    // Effect Module, here we pass empty array.
    // Our effect will be connected in feature modules.
    EffectsModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }








// *************************************************
// ************ app.routing.module.ts **************
// *************************************************
// This is main routing module. In this module we 'lazy-loading' our feature modules.
// 
//
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
    { path: '', component: WelcomeComponent },
    { 
        path: 'products',
        loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
    },
    { 
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
    }
];

@NgModule({
  // with pre-loading
  // with pre-loading we need add this '{preloadingStrategy: PreloadAllModules}' second argument.
  //
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],

  // without pre-loading, just with 'lazy-loading' our modules.
  //imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }









// **********************************************
// ************ app.component.html **************
// **********************************************
<app-header></app-header>
<router-outlet></router-outlet>







// ****************************************
// ************ app/state/app.state.ts **************
// ****************************************
// this file appear in app/state/app.state.ts
//
import { ProductState } from "../products/state/products.interface";
import { UserState } from "../user/state/user.interface";


export interface State {
    products: ProductState;  
    users: UserState;  
}







// *************************************************
// ************ app/header/header.component.html **************
// *************************************************
<ul class="header-left-items">
    <li class="header-left-item">
        <a [routerLink]="['']" [routerLinkActive]="['active']" [routerLinkActiveOptions]="{exact: true}">Home</a>
    </li>
    <li class="header-left-item">
        <a [routerLink]="['/products']" [routerLinkActive]="['active']">Products</a>
    </li>
    <li class="header-left-item">
        <a [routerLink]="['/user']" [routerLinkActive]="['active']">User</a>
    </li>
</ul>









// ************************************************************
// ******** app/products/state/products.selectors.ts **********
// ************************************************************
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductState } from "./products.interface";

// selectors
const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
    getProductFeatureState,
    state => state.showProductCode
); 


export const getShowProductCodeTrigger = createSelector(
    getProductFeatureState,
    state => state.trigger
); 


export const getProducts = createSelector(
    getProductFeatureState,
    state => state.products
); 


export const getError = createSelector(
    getProductFeatureState,
    state => state.error
); 


// This selector provide the ID of the currently selected product.
export const getCurrentProductId = createSelector(
    getProductFeatureState,
    state => state.currentProductId
);







// ************************************************************
// ********* app/products/state/products.reducer.ts ***********
// ************************************************************
//
import { createReducer, on } from "@ngrx/store";

// here we use alias 'productsActions'
import * as productsActions from './products.actions';
import { ProductState } from "./products.interface";



// initial State (default values) for producrts slice
const initialState: ProductState = {
    showProductCode: true,
    trigger: 'default text',
    currentProductId: null,
    products: [],
    error: ''
};



// reducer function for products slice
export const productReducer = createReducer<ProductState>(
    initialState,
   on(
      // call to action 
      productsActions.toggleProductCode,
      // 'return type' is the 'ProductState'
      (state): ProductState => {
          return {
              ...state,
              showProductCode: !state.showProductCode
          }
      }
   ),
   on(
    // call to action 
    productsActions.setProductCode,
    // here we set second parameter 'action'
    (state, action): ProductState => {
        return {
            // we copy the existing state
            ...state,
            // 'action.trigger' this is data that we set inside our component
            // store will updated with the new state.
            trigger: action.trigger
        }
    }
 ),
    on(
       productsActions.loadProductsSuccess,
       (state, action): ProductState => {
            return {
               ...state,
               products: action.products,
               error: '' 
            }
       }
    ),
    on(
        productsActions.loadProductsFailure,
        (state, action): ProductState => {
             return {
                ...state,
                // if error appear we set products array to empty.
                products: [],
                error: action.error 
             }
        }
     )   
);




// ************************************************************
// ******** app/products/state/products.interface.ts **********
// ************************************************************
export interface ProductState {
    showProductCode: boolean;
    trigger: string; 
    currentProductId: number | null; // number or null
    products: Product[];
    error: string;
}


export interface Product {
    userId: number;
    id: number;
    title: string;
    body: string;
}






// ************************************************************
// ********* app/products/state/products.effects.ts ***********
// ************************************************************
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ProductService } from '../product.service';

import * as ProductActions from './products.actions';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      /*
      *  switchMap:
      *  Cancels the current subscription/request and can cause race condition
      *  Use for get requests or cancelable requests like searches.
      *
      *
      *  concatMap:
      *  Runs subscriptions/requests in order and is less performant.
      *  Use for get, post and put requests when order is important.
      *
      * 
      *  mergeMap:
      *  Runs subscriptions/requests in parallel.
      *  Use for get, put, post and delete methods when order is not important.
      *
      * 
      *  exhaustMap:
      *  Ignores all subsequent subscriptions/requests until it completes.
      *  Use for login when you do not want more requests until the initial one is 
      *  complete.
      *
      *   
      */
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map((products) => ProductActions.loadProductsSuccess({ products })),
          catchError((error) =>
            of(ProductActions.loadProductsFailure({ error }))
          )
        )
      )
    );
  });




  
}








// ************************************************************
// ********* app/products/state/products.actions.ts ***********
// ************************************************************
import { createAction, props } from "@ngrx/store";
import { Product } from "./products.interface";


export const toggleProductCode = createAction(
    '[Product] Toggle Product Code'
);


export const setProductCode = createAction(
    '[Product] Set Current Product',
    // 'trigger' this is data that we send to our reducer.
    props<{ trigger: string }>()
);


export const loadProductsSuccess = createAction(
    '[Product API] Load Success',
    props<{ products: Product[] }>()
);


export const loadProducts = createAction(
    '[Product Page] Load'
  );


  export const loadProductsFailure = createAction(
    '[Product API] Load Fail',
    props<{ error: string }>()
);







// ***********************************************************
// ************ app/products/product.service.ts **************
// ***********************************************************
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




// ************************************************************
// ********** app/products/products.component.html ************
// ************************************************************
<p>products works!</p>

<button (click)="checkChanged()">click</button>

<p *ngIf="showProduct$ | async">ku ku products</p>

<br>
<br>

<br>
{{ showProductTrigger$ | async }}
<br>

<br>
<br>

<ul>
    <li *ngFor="let product of products$ | async">
        {{product.title}}
    </li>
</ul>

<br>
<br>

<p *ngIf="errorMessage$ | async as errorMessage">
   Error:  {{ errorMessage }}
</p>





// ************************************************************
// *********** app/products/products.component.ts *************
// ************************************************************
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from '../state/app.state';

import * as ProductActions from './state/products.actions';
import { Product } from './state/products.interface';

import {
  getError,
  getProducts,
  getShowProductCode,
  getShowProductCodeTrigger,
} from './state/products.selectors';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {

  errorMessage$!: Observable<string>;
  showProduct$!: Observable<boolean>;
  showProductTrigger$!: Observable<string>;
  products$!: Observable<Product[]>;

  constructor(private store: Store<State>) {}


  ngOnInit(): void {
    // here we use selector
    this.showProduct$ = this.store.select(getShowProductCode);
    this.showProductTrigger$ = this.store.select(getShowProductCodeTrigger);

    // load products from server with effect
    // our effect will call to service
    this.store.dispatch(ProductActions.loadProducts());

    // here we select our data from store with selector.
    // we use 'getProducts' selector.
    // instead using 'async' pipe we can also use unsubscribe
    this.products$ = this.store.select(getProducts);



    this.errorMessage$ = this.store.select(getError);

  }

  checkChanged() {
    // here we dispatch to this action 'toggleProductCode'
    this.store.dispatch(ProductActions.toggleProductCode());

    // here we dispatch to aur action and pass some data.
    this.store.dispatch(
      ProductActions.setProductCode({ trigger: 'new string' })
    );
  }
}






// ***********************************************************
// ************ app/products/products.module.ts **************
// ***********************************************************
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { StoreModule } from '@ngrx/store';
import { productReducer } from './state/products.reducer';
import { ProductsRoutingModule } from './products.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './state/products.effects';

@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    HttpClientModule,
    StoreModule.forFeature('products', productReducer),

    // Lazily load our 'products effects' when we load our 'ProductModule'
    EffectsModule.forFeature([ProductEffects])
  ],
  exports: [
    ProductsComponent
  ]
})
export class ProductsModule { }









// ************************************************************
// ********* app/products/products.routing.module.ts **********
// ************************************************************
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  // here you should use empty path. real path will be added
  // in app.routing.module.ts where we 'lazy-loading' our feature module.
  { path: '', component: ProductsComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductsRoutingModule { }







// ***************************************************
// ************ app/user/user.module.ts **************
// ***************************************************
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';

import { StoreModule } from '@ngrx/store';
import { userReducer } from './state/user.reducer';
import { UserRoutingModule } from './user.routing.module';

@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    StoreModule.forFeature('user', userReducer)
  ],
  exports: [
    UserComponent
  ]
})
export class UserModule { }







// ***********************************************************
// ************ app/user/user.routing.module.ts **************
// ***********************************************************
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';

const routes: Routes = [
  // here you should use empty path. real path will be added
  // in app.routing.module.ts where we 'lazy-loading' our feature module.
  { path: '', component: UserComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UserRoutingModule { }







// ******************************************************
// ************ app/user/user.component.ts **************
// ******************************************************
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '../state/app.state';

import * as UserActions from './state/user.actions';

import { getShowUserName } from './state/user.selectors';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private store: Store<State>) { }

  displayText: boolean = false;
  showUser$!: Observable<boolean>;

  ngOnInit(): void {
    // here we use selector
    // for observable variables we add '$' in the end.
    this.showUser$ = this.store.select(getShowUserName);
  }


  checkChanged() {
    // here we dispatch to this action 'maskUserName'
    this.store.dispatch(UserActions.maskUserName());
  }

}




// ********************************************************
// ************ app/user/user.component.html **************
// ********************************************************
<p>user works!</p>
<button (click)="checkChanged()">click</button>
<p *ngIf="showUser$ | async">ku ku user</p>





// **********************************************************
// ************ app/user/state/user.actions.ts **************
// **********************************************************
import { createAction } from "@ngrx/store";

export const maskUserName = createAction(
    '[User] Mask User Name'
);






// ************************************************************
// ************ app/user/state/user.interface.ts **************
// ************************************************************
export interface UserState {
    showUserName: boolean;
}






// **********************************************************
// ************ app/user/state/user.reducer.ts **************
// **********************************************************
import { createReducer, on } from "@ngrx/store";

import * as userAction from './user.actions';
import { UserState } from "./user.interface";




// initial State (default values) for producrts slice
const initialState: UserState = {
    showUserName: true
};



// reducer function for user slice
export const userReducer = createReducer<UserState>(
   initialState,
   on(
      // call to cation 
      userAction.maskUserName,
      (state): UserState => {
          return {
              ...state,
              showUserName: !state.showUserName
          }
      }
   ) 
);






// ************************************************************
// ************ app/user/state/user.selectors.ts **************
// ************************************************************
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.interface";

// selectors
const getUserFeatureState = createFeatureSelector<UserState>('user');

export const getShowUserName = createSelector(
    getUserFeatureState,
    state => state.showUserName
); 
















































// **********************************************************************
// **************************** Example 2 *******************************
// **********************************************************************

// In this example we can see two feature modules that lazy loaded + preloaded.
// effect connect to lazy-loaded module.

// *********************** app.module.ts ***********************
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }






// ********************** app/state/app.state.ts **************************
import { UsersState } from "../users/state/users.interface";

export interface State {
    users: UsersState
}




// ******************** app/users/users.module.ts **********************
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { UsersShellComponent } from "./users-shell/users-shell.component";
import { UsersRoutingModule } from "./users.routing.module";
import { HttpClientModule } from '@angular/common/http';

import { usersReducer } from './state/users.reducer';
import { EffectsModule } from "@ngrx/effects";
import { UsersEffect } from "./state/users.effect";
import { UsersDataService } from "./state/users.service";


@NgModule({
    declarations: [
        UsersShellComponent
    ],
    providers: [
        UsersDataService 
    ],
    imports: [
        CommonModule,
        UsersRoutingModule,
        HttpClientModule,
        StoreModule.forFeature('users', usersReducer),
        EffectsModule.forFeature([
            UsersEffect
        ])
    ]
})

export class UsersModule {}






// *********************** app/users/users.routing.module.ts *******************
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UsersShellComponent } from "./users-shell/users-shell.component";

const routes: Routes = [
    { path: '', component: UsersShellComponent }
];

@NgModule({
    imports: [
       RouterModule.forChild(routes)     
    ],
    exports: [
        RouterModule
    ]
})

export class UsersRoutingModule {

}





// ******************** app/users/users-shell/users-shell.component.ts ***********************
import { Component, OnInit } from "@angular/core";

import { Store } from '@ngrx/store';
import { State } from '../../state/app.state';

import * as UsersActions from '../state/users.actions';
import { Users } from '../state/users.interface';
import { UsersDataService } from "../state/users.service";

@Component({
    selector: 'app.users-shell',
    templateUrl: './users-shell.component.html',
    styleUrls: ['./users-shell.component.css']
})

export class UsersShellComponent implements OnInit {
    constructor(
        private store: Store<State>
    ) {}

    

    ngOnInit(): void {  
        this.store.dispatch(UsersActions.loadUsers());     
   
    }

}






// **************************** app/users/state/users.actions.ts **********************
import { createAction, props } from '@ngrx/store';
import { Users } from './users.interface';

export const loadUsers = createAction(
    '[Users Page] Load Users'
);

export const loadUsersSuccess = createAction(
    '[Users Page] Load Users Success',
    props<{ users: Users[] }>()
);

export const loadUsersFailure = createAction(
    '[Users Page] Load Users Failure',
    props<{ error: string }>()
);







// **************************** app/users/state/users.effect.ts **********************
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UsersDataService } from "./users.service";
import { catchError, map, mergeMap, of } from "rxjs";

import * as UsersAction from './users.actions';

@Injectable()

export class UsersEffect {


    constructor(
        private actions$: Actions,
        private usersDataService: UsersDataService
    ) {}

    loadUsers$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(UsersAction.loadUsers),
                mergeMap(() => 
                this.usersDataService.getUsers().pipe(
                    map((users) => UsersAction.loadUsersSuccess( {users} )),
                    catchError((error) =>
                        of(UsersAction.loadUsersFailure({ error }))
                    )
                )
            )
          );
       }
    );

}






// **************************** app/users/state/users.interface.ts **********************
export interface UsersState {
    users: Users[];
    error: string;
}


export interface Users {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    type: string;
}




// **************************** app/users/state/users.reducer.ts **********************
import { createReducer, on } from "@ngrx/store";
import * as usersActions from './users.actions';
import { UsersState } from "./users.interface";


const initialState: UsersState = {
    users: [],
    error: ''
};

export const usersReducer = createReducer(
    initialState,
    on(
        usersActions.loadUsersSuccess,
        (state, action): UsersState => {
            return {
                ...state,
                users: action.users,
                error: ''
            }
        }
    ),
    on(
       usersActions.loadUsersFailure,
       (state, action): UsersState => {
           return {
               ...state,
               users: [],
               error: action.error
           }
       }
    )
);







// **************************** app/users/state/users.selectors.ts **********************
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './users.interface';


const getUsersFeatureState = createFeatureSelector<UsersState>('users');


export const getAllUsers = createSelector(
    getUsersFeatureState,
    state => state.users
);






// **************************** app/users/state/users.service.ts **********************
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { Users } from "./users.interface";

@Injectable()

export class UsersDataService {
    constructor(
        private http: HttpClient
    ) {}


     getUsers(): Observable<Users[]> {
        const url = '../../../assets/json-file.json'; 
        return this.http.get<Users[]>(url).pipe(
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





// ************************* assests/json-file.json *************************
[
    {
      "id": 1,
      "name": "Leanne Graham",
      "username": "Bret",
      "email": "Sincere@april.biz",
      "phone": "1-770-736-8031 x56442",
      "website": "hildegard.org",
      "type": "beginner"
    },
    {
      "id": 2,
      "name": "Ervin Howell",
      "username": "Antonette",
      "email": "Shanna@melissa.tv",
      "phone": "010-692-6593 x09125",
      "website": "anastasia.net",
      "type": "beginner"
    },
    {
      "id": 3,
      "name": "Clementine Bauch",
      "username": "Samantha",
      "email": "Nathan@yesenia.net",
      "phone": "1-463-123-4447",
      "website": "ramiro.info",
      "type": "intermediate"
    }
  ]
































// **********************************************************************
// **************************** Example 3 *******************************
// **********************************************************************





// ********************* app/state/app.state.ts **********************
import { UsersState } from "../users/state/users.interface";

export interface State {
    users: UsersState
}




// ********************* app/users/state/users.actions.ts *************************
import { createAction, props } from '@ngrx/store';
import { User } from './users.interface';

export const loadUsers = createAction(
    '[Users Page] Load Users'
);

export const loadUsersSuccess = createAction(
    '[Users Page] Load Users Success',
    props<{ users: User[] }>()
);

export const loadUsersFailure = createAction(
    '[Users Page] Load Users Failure',
    props<{ error: string }>()
);

export const showAllUsers = createAction(
    '[Users Page] Get All Users'
);

export const showUsersSortedByName = createAction(
    '[Users Page] Show Users Sorted By Name'
);

export const showUsersSortedByAge = createAction(
    '[Users Page] Show Users Sorted By Age'
);






// ********************** app/users/state/users.effect.ts **********************
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UsersDataService } from "./users.service";
import { catchError, map, mergeMap, of } from "rxjs";

import * as UsersAction from './users.actions';

@Injectable()

export class UsersEffect {


    constructor(
        private actions$: Actions,
        private usersDataService: UsersDataService
    ) {}

    loadUsers$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(UsersAction.loadUsers),
                mergeMap(() => 
                this.usersDataService.getUsers().pipe(
                    map((users) => UsersAction.loadUsersSuccess( {users} )),
                    catchError((error) =>
                        of(UsersAction.loadUsersFailure({ error }))
                    )
                )
            )
          );
       }
    );

    

}




// ********************** app/users/state/users.interface.ts **********************
export interface UsersState {
    users: User[];
    usersSorted: User[],
    error: string;
    userType: string;
}


export interface User {
    id: number;
    name: string;
    age: string;
    email: string;
    phoneNumber: string;
}






// ********************** app/users/state/users.reducer.ts **********************
import { createReducer, on } from "@ngrx/store";
import * as usersActions from './users.actions';
import { UsersState } from "./users.interface";


const initialState: UsersState = {
    users: [],
    usersSorted: [],
    error: '',
    userType: 'all'
};

export const usersReducer = createReducer(
    initialState,
    on(
        usersActions.loadUsersSuccess,
        (state, action): UsersState => {
            return {
                ...state,
                users: action.users
            }
        }
    ),
    on(
       usersActions.loadUsersFailure,
       (state, action): UsersState => {
           return {
               ...state,
               users: [],
               error: action.error
           }
       }
    )

);






// ********************** app/users/state/users.selectors.ts **********************
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './users.interface';


const selectUsersFeatureState = createFeatureSelector<UsersState>('users');



export const selectAllUsers = createSelector(
    selectUsersFeatureState,
    state => state.users
);


export const selectSortedUsers = createSelector(
    selectUsersFeatureState,
    (state) => {
       return state.usersSorted;
    }
);


export const selectUsersByAge = createSelector(
    selectUsersFeatureState,
    (state) => {
        let updatedUsers = state.users.slice(0);
        updatedUsers.sort((a: any, b:any) => a.age - b.age);
        return updatedUsers;
    }
);


export const selectUsersByName = createSelector(
    selectUsersFeatureState,
    (state) => {
        let updatedUser = state.users.slice(0);
        updatedUser.sort((a:any, b:any) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();

            if (nameA < nameB) {
                return -1;
            }

            if (nameA > nameB) {
                return 1;
            }

            return 0;
        });

        return updatedUser;
    }
);










// ********************** app/users/state/users.service.ts **********************
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { User } from "./users.interface";

@Injectable()

export class UsersDataService {
    constructor(
        private http: HttpClient
    ) {}


     getUsers(): Observable<User[]> {
        const url = '../../../assets/json-file.json'; 
        return this.http.get<User[]>(url).pipe(
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






// ************************** assets/json-file.json *************************
[
  {
    "id": 1,
    "name": "Chris",
    "age": 30,
    "email": "chris123@gmail.com",
    "phoneNumber": "555-555-5555"
  },
  {
    "id": 2,
    "name": "David",
    "age": 20,
    "email": "david123@gmail.com",
    "phoneNumber": "666-666-666"
  },
  {
    "id": 3,
    "name": "Max",
    "age": 40,
    "email": "max123@gmail.com",
    "phoneNumber": "777-777-777"
  },
  {
    "id": 4,
    "name": "Yuli",
    "age": 12,
    "email": "yuli123@gmail.com",
    "phoneNumber": "888-888-888"
  },
  {
    "id": 5,
    "name": "Ron",
    "age": 33,
    "email": "ron123@gmail.com",
    "phoneNumber": "999-999-999"
  },
  {
    "id": 6,
    "name": "Tom",
    "age": 11,
    "email": "tom12345@gmail.com",
    "phoneNumber": "123-999-999"
  },
  {
    "id": 7,
    "name": "Oleg",
    "age": 43,
    "email": "oleg12345@gmail.com",
    "phoneNumber": "123-343-999"
  },
  {
    "id": 8,
    "name": "Alex",
    "age": 41,
    "email": "alex12345@gmail.com",
    "phoneNumber": "123-343-000"
  },
  {
    "id": 9,
    "name": "Jack",
    "age": 77,
    "email": "jack12345@gmail.com",
    "phoneNumber": "123-345-220"
  },
  {
    "id": 10,
    "name": "Itamar",
    "age": 5,
    "email": "itamar2345@gmail.com",
    "phoneNumber": "123-345-111"
  }
]




// ********************** app.module.ts **********************
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }






// ********************** app.routing.module.ts ************************
import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { WelcomeComponent } from "./welcome/welcome.component";

const routes: Routes = [
    { path: '', component: WelcomeComponent },
    { path: 'about-us', loadChildren: () => import('./about-us/about-us.module').then(mod => mod.AboutUsModule) },
    { path: 'users', loadChildren: () => import('./users/users.module').then(mod => mod.UsersModule ) },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {}








// ********************** users/users.module.ts ************************
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { UsersShellComponent } from "./users-shell/users-shell.component";
import { UsersRoutingModule } from "./users.routing.module";
import { HttpClientModule } from '@angular/common/http';

import { usersReducer } from './state/users.reducer';
import { EffectsModule } from "@ngrx/effects";
import { UsersEffect } from "./state/users.effect";
import { UsersDataService } from "./state/users.service";
import { MaterialsModule } from "../materials/materials.module";
import { UsersTableComponent } from "./users-shell/users-table/users-table.component";


@NgModule({
    declarations: [
        UsersShellComponent,
        UsersTableComponent
    ],
    providers: [
        UsersDataService 
    ],
    imports: [
        CommonModule,
        UsersRoutingModule,
        MaterialsModule,
        HttpClientModule,
        StoreModule.forFeature('users', usersReducer),
        EffectsModule.forFeature([
            UsersEffect
        ])
    ]
})

export class UsersModule {

}





// ********************** users/users.routing.module.ts ************************
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UsersShellComponent } from "./users-shell/users-shell.component";

const routes: Routes = [
    { path: '', component: UsersShellComponent }
];

@NgModule({
    imports: [
       RouterModule.forChild(routes)     
    ],
    exports: [
       RouterModule 
    ]
})

export class UsersRoutingModule {

}








// ********************** users/users-shell/users-shell.component.ts ************************
import { Component, OnInit } from "@angular/core";

import { Store } from '@ngrx/store';
import { State } from '../../state/app.state';

import * as UsersActions from '../state/users.actions';
import { User } from '../state/users.interface';
import { selectAllUsers, selectSortedUsers, selectUsersByAge, selectUsersByName } from "../state/users.selectors";




@Component({
    selector: 'app.users-shell',
    templateUrl: './users-shell.component.html',
    styleUrls: ['./users-shell.component.css']
})

export class UsersShellComponent implements OnInit {
    constructor(
        private store: Store<State>
    ) {}

    users: User[] = [];
    usersSorted: User[] = [];



    ngOnInit(): void {  
        this.store.dispatch(UsersActions.loadUsers()); 


        // selectAllUsers selector
        this.store.select(selectAllUsers).subscribe(
            (responseUsers) => {
                this.users = responseUsers;
                this.usersSorted = responseUsers;
            }
        );

    }



    onSelecterTab(MatTabChangeEventObject: any) {
        this.sortData(MatTabChangeEventObject.index);
    }


    sortData(labelIndex: number) {
        switch (labelIndex) {
            case 0:
                // selectAllUsers selector   
                this.store.select(selectAllUsers).subscribe(
                    (responseUsers) => {
                        this.usersSorted = responseUsers;
                    }
                );
                break;
            case 1:
                // selectUsersByName selector    
                this.store.select(selectUsersByName).subscribe(
                    (responseSortedUsersByName) => {
                        this.usersSorted = responseSortedUsersByName;
                    }
                );

                break;
            case 2:
                // selectUsersByAge selector    
                this.store.select(selectUsersByAge)
                .subscribe( responseSortedUsersByAge => this.usersSorted = responseSortedUsersByAge );
                break;    
        
            default:
                // selectAllUsers selector  
                this.store.select(selectAllUsers).subscribe(
                    (responseUsers) => {
                        this.usersSorted = responseUsers;
                    }
                );
                break;
        }
    }

    
}






// ********************** users/users-shell/users-shell.component.html ************************
<section class="users">
    <div class="useers-content">
        <mat-tab-group (selectedTabChange)="onSelecterTab($event)">
            <mat-tab label="All"> 
                <app-users-table [users]="usersSorted"></app-users-table>                
            </mat-tab>
            <mat-tab label="By Name"> 
                <app-users-table [users]="usersSorted"></app-users-table>   
            </mat-tab>
            <mat-tab label="By Age"> 
                <app-users-table [users]="usersSorted"></app-users-table>   
            </mat-tab>
          </mat-tab-group>
    </div>
</section>





// ********************** users/users-shell/users-table/users-table.component.ts ************************
import { Component, Input } from "@angular/core";
import { User } from "../../state/users.interface";

@Component({
    selector: 'app-users-table',
    templateUrl: './users-table.component.html',
    styleUrls: ['./users-table.component.css']
})

export class UsersTableComponent {
    
    constructor() {}

    @Input() users!: User[];
    displayedColumns: string[] = ['id', 'name', 'age', 'email', 'phoneNumber'];

}






// ********************** users/users-shell/users-table/users-table.component.html ************************
<div class="table-data">
    <table mat-table [dataSource]="users" class="mat-elevation-z8">

        <!--- Note that these columns can be defined in any order.
            The actual rendered columns are set as a property on the row definition" -->
    
        <!-- No Column -->
        <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef> No. </th>
        <td mat-cell *matCellDef="let element"> {{element.id}} </td>
        </ng-container>
    
        <!-- Name Column -->
        <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef> Name </th>
        <td mat-cell *matCellDef="let element"> {{element.name}} </td>
        </ng-container>
    
        <!-- Age Column -->
        <ng-container matColumnDef="age">
        <th mat-header-cell *matHeaderCellDef> Age </th>
        <td mat-cell *matCellDef="let element"> {{element.age}} </td>
        </ng-container>
    
        <!-- Email Column -->
        <ng-container matColumnDef="email">
        <th mat-header-cell *matHeaderCellDef> Email </th>
        <td mat-cell *matCellDef="let element"> {{element.email}} </td>
        </ng-container>


        <!-- Website Column -->
        <ng-container matColumnDef="phoneNumber">
            <th mat-header-cell *matHeaderCellDef> Phone Number </th>
            <td mat-cell *matCellDef="let element"> {{element.phoneNumber}} </td>
        </ng-container>



    
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
</div> 






// ********************** materials.module.ts **********************
import { NgModule } from "@angular/core";
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';


@NgModule({
    imports: [
        MatTabsModule,
        MatTableModule
    ],
    exports: [
        MatTabsModule,
        MatTableModule
    ]
})

export class MaterialsModule {}





