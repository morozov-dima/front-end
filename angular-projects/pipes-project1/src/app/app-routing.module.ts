import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PromotionComponent } from './promotions/promotion/promotion.component';
import { PromotionsComponent } from './promotions/promotions.component';

// sets up routes constant where you define your routes
const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'contact-us', component: ContactUsComponent },
    { path: 'promotions', component: PromotionsComponent },
    { path: 'promotion', component: PromotionComponent, children: [
      { path: ':id', component: PromotionComponent }
    ]},
    { path: '**', component: PageNotFoundComponent }
]; 

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }