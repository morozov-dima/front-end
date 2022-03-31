// This is main routing module. In this module we 'lazy-loading' our feature modules.
// 
//
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
    { path: '', component: WelcomeComponent },
    { 
        path: 'products',
        loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
    },
    { 
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
    }
];

@NgModule({
  // with pre-loading
  // with pre-loading we need add this '{preloadingStrategy: PreloadAllModules}' second argument.
  //
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],

  // without pre-loading, just with 'lazy-loading' our modules.
  //imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }