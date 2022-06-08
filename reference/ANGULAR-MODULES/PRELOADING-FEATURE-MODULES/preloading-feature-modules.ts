// *************************************************************************
// ********************************* Example *******************************
// *************************************************************************





// *********** app.routing.module.ts ****************
// This is main routing module. In this module we 'lazy-loading' our feature modules.
// 
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
   { 
     path: 'posts',
     loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule)
   }
];

@NgModule({

  // with pre-loading
  // with pre-loading we need add this '{preloadingStrategy: PreloadAllModules}' second argument.
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],

  // without pre-loading, just with 'lazy-loading' our modules.
  // imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }


