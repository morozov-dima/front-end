import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //console.log('Request is on its way');

        // we can see here request URL.
        //console.log(req.url);
        



        // ***************** we can interact with requests ****************
        const modifiedRequest = req.clone({
            // you can add new headers to existing headers
            // we will see this information in our 'request headers' in chrom network tab.
            // our interceptop will add this header for all outgoing requests,
            headers: req.headers.append('Auth', 'xyz')
        })
        // ***************** we can interact with requests ****************




        // ***************** we can interact with response ****************
        // we add pipe if we need do something with response.
        return next.handle(modifiedRequest);
        // ***************** we can interact with response ****************



    }
}