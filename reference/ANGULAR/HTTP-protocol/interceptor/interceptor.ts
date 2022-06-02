


// **************************************************************************
// ******************************** Example  ********************************
// **************************************************************************



// 1. In order to add interceptor for your project you need
//    create two files. ts file with interceptop code and connect 
//    this interceptor in app.module.ts
// 2. You can add new headers to existing headers.
// 3. We can interact with requests.
// 4. We can interact with response.



// ************* app/shared/login.interceptor.ts **************

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LoginInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    

    // ***************** we can interact with requests ****************
    const modifiedRequest = request.clone({
      // you can add new headers to existing headers
      // we will see this information in our 'request headers' in chrom network tab.
      // our interceptop will add this header for all outgoing requests,
      headers: request.headers.append('Auth', 'xyzxyzxyzxyz')
    });
    // ***************** we can interact with requests ****************



    // ***************** we can interact with response ****************
    // we add pipe if we need do something with response.
    return next.handle(modifiedRequest);
    // ***************** we can interact with response ****************
    
  }
}





// ************************ app/app.module.ts *************************
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginInterceptor } from './shared/login.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [

    // ######### add this code for interceptors - begin ############  
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoginInterceptor,
      multi: true
    }
    // ######### add this code for interceptors - end ############  

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }















// **************************************************************************
// ******************************** Example  ********************************
// **************************************************************************



// ************* app/auth/auth-interceptor.service.ts **************
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams
} from '@angular/common/http';
import { take, exhaustMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private store: Store<fromApp.AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // here we use our NgRx store and we select 'auth' slice.
    return this.store.select('auth').pipe(
      // we want take only one snapshot. Because we have only one user.
      take(1),
      map(authState => {
        return authState.user;
      }),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token)
        });
        return next.handle(modifiedReq);
      })
    );
  }
}







// ************* app/core.module.ts **************
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptorService } from './auth/auth-interceptor.service';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
})
export class CoreModule {}



