import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found';
import { WelcomeComponent } from './welcome/welcome.component';



const routes: Routes = [
  { path: '', component: WelcomeComponent },
  {
    path: 'promotions',
    loadChildren: () =>
      import('./promotions/promotions.module').then((m) => m.PromotionsModule),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'join',
    loadChildren: () => 
      import('./register/register.module').then((m) => m.RegisterModule)
  },
  { path: '**', component: PageNotFoundComponent },
];



@NgModule({
  // 'PreloadAllModules' : Provides a preloading strategy
  //  that preloads all modules as quickly as possible.
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})


export class AppRoutingModule {}
