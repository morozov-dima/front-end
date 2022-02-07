import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { GamesComponent } from './games/games.component';
import { SlotsComponent } from './slots/slots.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SlotGameComponent } from './slot-game/slot-game.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PromotionsComponent,
    GamesComponent,
    SlotsComponent,
    PageNotFoundComponent,
    HeaderComponent,
    LoginComponent,
    SlotGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
