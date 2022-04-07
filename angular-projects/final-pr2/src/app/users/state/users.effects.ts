import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { UserApiActions, UserPageActions } from "./actions";
import { UsersService } from "./users.service";


@Injectable()

export class UserEffects {

    loadUsers$ = createEffect(() => {
        return this.actions$.pipe(
              ofType(UserPageActions.loadUsers),
              mergeMap(() => 
                this.usersService.getUsers().pipe(
                    map((users) => UserApiActions.loadUsersSuccess({ users })),
                    catchError((error) => of(UserApiActions.loadUsersFailure({ error })))
                )
              )
          )  
    });


    constructor(
        private actions$: Actions, 
        private usersService: UsersService ) {}


}