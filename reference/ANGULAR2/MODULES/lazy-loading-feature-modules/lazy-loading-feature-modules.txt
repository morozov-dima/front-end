
// Example 1:
// **************** app.module.ts ******************
// 1. This is main module that loaded. 
// 2. Pay attantion that modules that 'lazy loaded' dosen'that
//    appear in 'imports' array. Because we load them in
//    'app.routing.module.ts'.
//
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    
    // pay attantion that modules that 'lazy loaded' dosen't appear here !!!
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }








// ************* header.component.html ****************
<header class="header">
    <ul class="header-list">
        <li>
            <a [routerLink]="['/']" routerLinkActive="active"  [routerLinkActiveOptions]="{exact: true}">Home</a>
        </li>
        <li>
            <a [routerLink]="['/posts']"  routerLinkActive="active" >Posts</a>
        </li>
        <li>
            <a [routerLink]="['/comments']"  routerLinkActive="active">Comments</a>
        </li>
    </ul>
</header>









// *********** app.routing.module.ts ****************
// This is main routing module. In this module we 'lazy-loading' our feature modules.
// 
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
  //
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],

  // without pre-loading, just with 'lazy-loading' our modules.
  //imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }









// *********** posts.module.ts ***************
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { PostsComponent } from './posts.component';
import { PostsRoutingModule } from './posts-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    PostsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    PostsRoutingModule
  ]
})
export class PostsModule { }






// ************ posts.routing.module.ts ***************
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './posts.component';

const routes: Routes = [
  // here you should use empty path. real path will be added
  // in app.routing.module.ts where we 'lazy-loading' our feature module.
  { path: '', component: PostsComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PostsRoutingModule { }











// Example 2:
// This is module for rest 'angular material' modules
// that we import and then export.
//
import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  imports: [
    MatInputModule
  ],
  exports: [
    MatInputModule
  ]
})
export class MaterialsModule { }





