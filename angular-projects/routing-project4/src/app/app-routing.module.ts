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
