import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PromotionComponent } from './promotion/promotion.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { SlotsComponent } from './slots/slots.component';

const routes: Routes = [
  { 
    path: '', 
    component: HomePageComponent 
  },
  { 
    path: 'promotions',
    component: PromotionsComponent
  },
  {
    path: 'promotion/:id',
    component: PromotionComponent
  },
  { 
    path: 'slots',
    component: SlotsComponent
   },
  { 
    path: 'contact-us', 
    component: ContactUsComponent
  },
  { 
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
