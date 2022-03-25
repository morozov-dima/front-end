import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UserComponent } from './user/user.component';
import { UsersRoutingModule } from './users-routing.module';
import { LoaderComponent } from '../shared/loader/loader.component';



@NgModule({
  declarations: [
    UsersComponent,
    UserComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsertsModule { }
