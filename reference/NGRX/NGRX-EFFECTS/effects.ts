// **********************************************************************
// **************************** Example 1 *******************************
// **********************************************************************


// ********************* state/users.effect.ts *************************

import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UsersDataService } from "./users.service";
import { catchError, map, mergeMap, of } from "rxjs";

import * as UsersAction from './users.actions';

@Injectable()


export class UsersEffect {


    constructor(
        private actions$: Actions,
        private usersDataService: UsersDataService
    ) {}

        loadUsers$ = createEffect(() => {
                return this.actions$.pipe(
                    ofType(UsersAction.loadUsers),
                    mergeMap(() => 
                    this.usersDataService.getUsers().pipe(
                        map((users) => UsersAction.loadUsersSuccess( {users} )),
                        catchError((error) =>
                            of(UsersAction.loadUsersFailure({ error }))
                        )
                    )
                )
            );
        }
        );
  

}








// **************************** users.module.ts *************************

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { UsersShellComponent } from "./users-shell/users-shell.component";
import { UsersRoutingModule } from "./users.routing.module";
import { HttpClientModule } from '@angular/common/http';

import { usersReducer } from './state/users.reducer';
import { EffectsModule } from "@ngrx/effects";
import { UsersEffect } from "./state/users.effect";


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