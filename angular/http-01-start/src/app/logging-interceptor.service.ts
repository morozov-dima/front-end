import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

export class LoggingIntercaptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Outgoing request');
        console.log(req.url);
        console.log(req.headers);
        
            


        // ***************** we can interact with response ****************    
        return next.handle(req).pipe(
            // in the interceptor, you always get an event.
            tap(event => {
                if (event.type === HttpEventType.Response) {
                    console.log('Incoming response');

                    // we can see here our response
                    console.log(event.body);
                }
            })
        );
        // ***************** we can interact with response ****************    




    }
}