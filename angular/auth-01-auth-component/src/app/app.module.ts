import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';







@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],





  // this array allows you to import other modules into this module.
  // imports array here is important to split your app into multiple modules.
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,

 
    // here we import our ###shared module###
    SharedModule,

    // here we import our ###core module###
    CoreModule
  ],



    providers: [
      
    ],


  // bootstrap array is important for starting the App.  
  // It defines which component is available right in that index.html file.
  bootstrap: [AppComponent]
})


export class AppModule {}
