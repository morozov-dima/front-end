// *************************************************************************
// ********************************* Example *******************************
// *************************************************************************




// **************************** app.module.ts ******************************
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './app-shared.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }






// ************************** shared.module.ts ******************************
import { NgModule } from '@angular/core';
import { SharedComponent } from './shared.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    SharedComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    // now if we import this feature 'shared module' in different modules we can use 'SharedComponent' component.
    SharedComponent
  ]
})
export class SharedModule { }






