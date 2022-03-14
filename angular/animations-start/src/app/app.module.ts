import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,


    //  Add this module in order to work with animations
    BrowserAnimationsModule



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
