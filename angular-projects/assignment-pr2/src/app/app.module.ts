import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserDataComponent } from './user-data/user-data.component';
import { ShowUserDataComponent } from './show-user-data/show-user-data.component';
import { CommonModule } from '@angular/common';
import { ButtonsGameComponent } from './buttons-game/buttons-game.component';
import { ButtonsComponent } from './buttons-game/buttons/buttons.component';
import { BoxesComponent } from './buttons-game/boxes/boxes.component';
import { BoxComponent } from './buttons-game/boxes/box/box.component';
import { BooksComponent } from './books/books.component';
import { BackgroundComponent } from './background/background.component';
import { NumbersComponent } from './numbers/numbers.component';
import { CircleComponent } from './circle/circle.component';
import { ToggleTextComponent } from './toggle-text/toggle-text.component';
import { ContentProjectionComponent } from './content-projection/content-projection.component';

@NgModule({
  declarations: [
    AppComponent,
    UserDataComponent,
    ShowUserDataComponent,
    ButtonsGameComponent,
    ButtonsComponent,
    BoxesComponent,
    BoxComponent,
    BooksComponent,
    BackgroundComponent,
    NumbersComponent,
    CircleComponent,
    ToggleTextComponent,
    ContentProjectionComponent
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
