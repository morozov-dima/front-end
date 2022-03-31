import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';

import { StoreModule } from '@ngrx/store';
import { userReducer } from './state/user.reducer';
import { UserRoutingModule } from './user.routing.module';

@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    StoreModule.forFeature('user', userReducer)
  ],
  exports: [
    UserComponent
  ]
})
export class UserModule { }
