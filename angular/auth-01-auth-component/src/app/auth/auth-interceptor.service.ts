import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { exhaustMap, take } from "rxjs/operators";

@Injectable()

export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    // our interceptor will add token to all outgoing requests.
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {

                // in case if we have no user    
                if(!user) {
                    return next.handle(req);
                }

                // in case if we have user
                // configuring HTTP URL parameters
                const modifiedReq = req.clone({
                    params: new HttpParams().set('auth', user.token)
                });

                return next.handle(modifiedReq);
            }));
    }
}