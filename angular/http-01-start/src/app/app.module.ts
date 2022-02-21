import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthInterceptorService } from './auth-interceptor.service';
import { LoggingIntercaptorService } from './logging-interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  // the order of interceptors are important
  // AuthInterceptorService will rin first
  // LoggingIntercaptorService will run second
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,  // run first
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingIntercaptorService, // run second
      multi: true 
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
