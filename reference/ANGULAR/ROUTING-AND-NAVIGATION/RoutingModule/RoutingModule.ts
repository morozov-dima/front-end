// *************************************************************************
// ******************************** Example  *******************************
// *************************************************************************



// ************************ app.routing.module.ts **************************
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesComponent } from './games/games.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { LoginGuardGuard } from './shared/login-guard.guard';
import { SlotGameComponent } from './slot-game/slot-game.component';
import { SlotsComponent } from './slots/slots.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'promotions', component: PromotionsComponent },
  { path: 'games', component: GamesComponent },
  { path: 'slots', component: SlotsComponent, canActivate: [LoginGuardGuard] ,
      children: [
        { path: 'slot-games/:id/:name', component: SlotGameComponent }
      ]
  },
  { path: 'old-page', redirectTo: '', pathMatch: 'full' }, // redirect "old-page" page to "home page"
  { path: '**', component: PageNotFoundComponent } // Wildcard route for a 404 page
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }








// *********************** header.component.html ********************
<a [routerLink]="['/slots/slot-games', 10, 'slotGame']">Load slotGame</a> <!-- /slots/slot-games/10/slotGame -->








// *********************** header.component.html ********************
<header class="header">
    <div class="header-left">
        <ul class="header-left-items">
            <li class="header-left-item">
                <a [routerLink]="['']" [routerLinkActive]="['active']" [routerLinkActiveOptions]="{exact: true}">Home</a>
            </li>
            <li class="header-left-item">
                <a [routerLink]="['/promotions']" [routerLinkActive]="['active']">Promotions</a>
            </li>
            <li class="header-left-item">
                <a [routerLink]="['/games']" [routerLinkActive]="['active']">Games</a>
            </li>
            <li *ngIf="showTab" class="header-left-item">
                <a [routerLink]="['/slots']" [routerLinkActive]="['active']">Slots</a>
            </li>
        </ul>
    </div>

    <div class="header-right">
        <app-login></app-login>
    </div>
</header>






// ************************ app.module.ts **************************
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './RoutingModule';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }













