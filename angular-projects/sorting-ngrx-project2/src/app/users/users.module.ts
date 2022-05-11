import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { UsersShellComponent } from "./users-shell/users-shell.component";
import { UsersRoutingModule } from "./users.routing.module";
import { HttpClientModule } from '@angular/common/http';

import { usersReducer } from './state/users.reducer';
import { EffectsModule } from "@ngrx/effects";
import { UsersEffect } from "./state/users.effect";
import { UsersDataService } from "./state/users.service";
import { MaterialsModule } from "../materials/materials.module";
import { UsersTableComponent } from "./users-shell/users-table/users-table.component";


@NgModule({
    declarations: [
        UsersShellComponent,
        UsersTableComponent
    ],
    providers: [
        UsersDataService 
    ],
    imports: [
        CommonModule,
        UsersRoutingModule,
        MaterialsModule,
        HttpClientModule,
        StoreModule.forFeature('users', usersReducer),
        EffectsModule.forFeature([
            UsersEffect
        ])
    ]
})

export class UsersModule {

}