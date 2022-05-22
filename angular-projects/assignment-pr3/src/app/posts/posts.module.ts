import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsRoutingModule } from './posts.routing.module';
import { MaterialsModule } from '../material-module/material-module.module';
import { PostsShellComponent } from './posts-shell/posts-shell.component';



@NgModule({
  declarations: [
    PostsShellComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    MaterialsModule
  ]
})
export class PostsModule { }
