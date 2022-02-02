import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { ActiveUsersComponent } from './active-users/active-users.component';
import { InactiveUsersComponent } from './inactive-users/inactive-users.component';
import { ActiveUsersDiComponent } from './active-users-di/active-users-di.component';
import { InactiveUsersDiComponent } from './inactive-users-di/inactive-users-di.component';
import { GamesComponent } from './games/games.component';
import { ColorDataComponent } from './color-data/color-data.component';
import { ColorViewComponent } from './color-view/color-view.component';
import { CommonModule } from '@angular/common';
import { CompareDataComponent } from './compare-data/compare-data.component';
import { ShowDataComponent } from './show-data/show-data.component';
import { UserDataComponent } from './user-data/user-data.component';
import { UserDataResultComponent } from './user-data-result/user-data-result.component';

@NgModule({
  declarations: [
    AppComponent,
    ActiveUsersComponent,
    InactiveUsersComponent,
    ActiveUsersDiComponent,
    InactiveUsersDiComponent,
    GamesComponent,
    ColorDataComponent,
    ColorViewComponent,
    CompareDataComponent,
    ShowDataComponent,
    UserDataComponent,
    UserDataResultComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
