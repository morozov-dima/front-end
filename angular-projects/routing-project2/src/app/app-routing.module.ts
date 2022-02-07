import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './games-page/game/game.component';
import { GamesPageComponent } from './games-page/games-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PromotionsPageComponent } from './promotions-page/promotions-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'promotions', component: PromotionsPageComponent },
  { path: 'games', component: GamesPageComponent ,children: [
      { path: '1', component: GameComponent },
      { path: '2', component: GameComponent },
      { path: '3', component: GameComponent }
    ]
  },
  { path: '**', component: PageNotFoundComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
