// *************************************************************************
// ********************************* Example *******************************
// *************************************************************************




// **************** app.module.ts ******************
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
    </ul>
</header>









// *********** app.routing.module.ts ****************
// This is main routing module. In this module we 'lazy-loading' our feature modules.

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'posts', loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
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
    // 'posts.module.ts' should import 'posts.routing.module.ts'
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
  // here you should use empty path. real path will be added in app.routing.module.ts where we 'lazy-loading' our feature module.
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







