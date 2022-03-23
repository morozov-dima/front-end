import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UsersComponent } from './users/users.component';
import { WelcomeComponent } from './welcome/welcome.component';



const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { 
    path: 'posts',
    loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule)
  },
  { 
    path: 'users',
    loadChildren: () => import('./users/userts.module').then(m => m.UsertsModule)
  },
  { 
    path: 'contact',
    loadChildren: () => import('./contact-us/contact-us.module').then(m => m.ContactUsModule) 
  },
  { 
    path: 'comments',
    loadChildren: () => import('./comments/comments.module').then(m => m.CommentsModule)
  },
  { 
    path: '**', component: PageNotFoundComponent } // Wildcard route for a 404 page
];



@NgModule({
  // with pre-loading we need add this '{preloadingStrategy: PreloadAllModules}' second argument.
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],

  exports: [RouterModule]
})
export class AppRoutingModule { }
