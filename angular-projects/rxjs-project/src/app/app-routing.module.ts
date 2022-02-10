import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './games/game/game.component';
import { GamesComponent } from './games/games.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { SlotsComponent } from './slots/slots.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'promotions', component: PromotionsComponent },
  { path: 'games', component: GamesComponent, children: [
      { path: 'game/:id', component: GameComponent }
    ]
  },
  { path: 'slots', component: SlotsComponent },
  { path: 'some-old-page', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
