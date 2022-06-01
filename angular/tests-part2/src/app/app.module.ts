import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CounterComponent } from './counter/counter.component';
import { PostsComponent } from './posts/posts.component';
import { RoutingComponent } from './routing/routing.component';


@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    PostsComponent,
    RoutingComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
