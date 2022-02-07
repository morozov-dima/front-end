import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesPageComponent } from './games-page/games-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PromotionsPageComponent } from './promotions-page/promotions-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'promotions', component: PromotionsPageComponent },
  { path: 'games', component: GamesPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
