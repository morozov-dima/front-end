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
