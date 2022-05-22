import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users.routing.module';
import { UsersShellComponent } from './users-shell/users-shell.cmponent';



@NgModule({
  declarations: [
    UsersShellComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
