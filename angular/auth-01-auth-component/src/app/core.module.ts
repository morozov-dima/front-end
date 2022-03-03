import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";


@NgModule({

    // in providers array we define all the services we want to provide.
    // more recommended way is provide services inside service
    // file with '@Injectable' + providedIn: 'root'
    providers: [

     // here we can connected services that not connected with 'provideIn: root'   
     // ....   



     // here we add interceptor
     {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptorService,
        multi: true
       }
    ]
}) 

export class CoreModule {}