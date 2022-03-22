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
