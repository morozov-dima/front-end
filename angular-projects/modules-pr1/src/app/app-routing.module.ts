import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
   { 
     path: 'posts',
     loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule)
   },
   { 
     path: 'comments',
     loadChildren: () => import('./comments/comments.module').then(m => m.CommentsModule)
   }
];

@NgModule({
  // with pre-loading
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],

  // without pre-loading
  //imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }
