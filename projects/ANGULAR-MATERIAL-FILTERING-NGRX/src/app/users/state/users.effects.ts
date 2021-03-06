import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UsersDataService } from "./users-data.service";
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
                this.usersDataService.getUsersData().pipe(
                map((users) => UsersAction.loadUsersSuccess( {users} )),
                catchError((error) => 
                    of(UsersAction.loadUsersFailure( {error} ))
                )
            ))
        )
    });
}