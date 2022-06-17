import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersDataComponent } from './users/users-data/users-data.component';
import { UsersListComponent } from './users/users-data/users-list/users-list.component';
import { MaterialsModule } from './materials/materials.module';


@NgModule({
  declarations: [
    AppComponent,
    UsersDataComponent,
    UsersListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
