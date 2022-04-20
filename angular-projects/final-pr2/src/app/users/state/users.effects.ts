import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { UserApiActions, UserPageActions } from "./actions";
import { UsersService } from "./users.service";


@Injectable()

export class UserEffects {


    /*
    *  switchMap:
    *  Cancels the current subscription/request and can cause race condition
    *  Use for get requests or cancelable requests like searches.
    *
    *  concatMap:
    *  Runs subscriptions/requests in order and is less performant.
    *  Use for get, post and put requests when order is important.
    * 
    *  mergeMap:
    *  Runs subscriptions/requests in parallel.
    *  Use for get, put, post and delete methods when order is not important.
    * 
    *  exhaustMap:
    *  Ignores all subsequent subscriptions/requests until it completes.
    *  Use for login when you do not want more requests until the initial one is 
    *  complete.
    *   
    */


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



    updateUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserPageActions.updateCurrentUser),
            mergeMap((action) => 
                this.usersService.updateUser(action.currentUser).pipe(
                    map((currentUser) => UserApiActions.updateCurrentUserSuccess({ currentUser })),
                    catchError((error) => of(UserApiActions.updateCurrentUserFailure({ error })))
                )
            )
        )
    });


    


    constructor(
        private actions$: Actions, 
        private usersService: UsersService ) {}


}