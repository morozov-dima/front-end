import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CommentsComponent } from './comments.component';
import { CommentsRoutingModule } from './comments-routing.module';


@NgModule({
  declarations: [
    CommentsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    CommentsRoutingModule
  ]
})
export class CommentsModule { }
