import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpParams
} from '@angular/common/http';
import { exhaustMap, map, take } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../state/app.reducer';

@Injectable()
export class LoginInterceptor implements HttpInterceptor {

  constructor(
    private store: Store<fromApp.State>
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    
    return this.store.select('auth').pipe(
      take(1),
      map(authState => {
        return authState.user;
      }),
      exhaustMap(user => {
        if (!user) {
          return next.handle(request);
        }

        let userToken: any;
        userToken = user?.token;

        const modifiedReq = request.clone({
          params: new HttpParams().set('auth', userToken), // add params to request URL

          // you can add new headers to existing headers
          // we will see this information in our 'request headers' in chrom network tab.
          // our interceptop will add this header for all outgoing requests,
          headers: request.headers.append('Auth', 'xyzxyzxyzxyznewwwwwwwwww') // add headers to request URL
        });

        // we add pipe if we need do something with response.
        return next.handle(modifiedReq);

      })
    );

    
  }
}