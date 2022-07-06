


// **************************************************************************
// ******************************** Example  ********************************
// **************************************************************************



/*  1. In order to add interceptor for your project you need
 *    create two files. ts file with interceptop code and connect this interceptor in app.module.ts 
 *  2. You can add new headers to existing headers.
 *  3. We can interact with requests.
 *  4. We can interact with response.
 * 
 *  5. you can add new headers to existing headers
       our interceptop will add this header for all outgoing requests,
*/



// ************* app/shared/login.interceptor.ts **************
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';


@Injectable()
export class PhotosInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    
    const modifiedRequest = req.clone({
      headers: req.headers
      .set('Content-type', 'application/json; charset=UTF-8')
      .set('Authorization', 'DGDGFGSGFGDSF454SDFSDFDSFD')
    });

    return next.handle(modifiedRequest);
    
  }
}





// ************************ app/app.module.ts *************************
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PhotosInterceptor } from './shared/photos.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PhotosInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }














// **************************************************************************
// ******************************** Example  ********************************
// **************************************************************************


// ************* app/auth/auth-interceptor.service.ts **************
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { take, exhaustMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private store: Store<fromApp.AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
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



