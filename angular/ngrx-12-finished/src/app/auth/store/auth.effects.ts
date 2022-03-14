import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import * as AuthActions from './auth.actions';
import { User } from '../user.model';
import { AuthService } from '../auth.service';

// inport 'auth' interface
import { AuthResponseData } from './auth.model';











const handleAuthentication = (
  expiresIn: number,
  email: string,
  userId: string,
  token: string
) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  // here we use 'User' model class that imported.
  const user = new User(email, userId, token, expirationDate);
  // we save 'user' in our localStorege. 
  localStorage.setItem('userData', JSON.stringify(user));
  // 1. here we return this new action here and this automatically
  //    gets dispatched by @ngrx/effects.
  return new AuthActions.AuthenticateSuccess({
    email: email,
    userId: userId,
    token: token,
    expirationDate: expirationDate,
    redirect: true
  });
};













// handleError constant
const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthenticateFail(errorMessage));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email exists already';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct.';
      break;
  }
  return of(new AuthActions.AuthenticateFail(errorMessage));
};









// 1. we need add '@Injectable()' here before our class export.
//
// 2. '@Injectable()' should be empty.
@Injectable()
// 1. we need export a normal class, we organize your effects in classes.
export class AuthEffects {












  // 1. we add such an effect as a normal property in your class
  //
  // 2. we will create 'authSignup' property.
  //
  // 3. 'actions$' is just a observable and we can call 'pipe', and what you
  //    need to pipe here in now a special RxJs operator which in part of RxJs but 
  //    which is provided by '@ngrx/effects' - in is 'ofType' operator.
  //
  // 4. 'ofType' operator simply allows you to define a filter for which types
  //     of effects you want to continue in this observable pipe you are creating.
  //
  // 5. effect by default always should return a new action at the end one it is done.
  //
  // 6. We also need to add a special decorator to this auth login property here
  //    to turn it into an effect @ngrx/effects is able to pick up later,
  //    that is the @Effect() decorator.
  //
  // 7. You typically want to dispatch a new action once you are done with the code in your effect.
  @Effect()
  authSignup = this.actions$.pipe(
    // 1. you can simply define different types of effects that you want to handle in each chain.
    //
    // 2. this is a filter to allow us to define for which exact actions
    //    we want to continue in this chain.
    //
    // 3. Only continue in this 'observable chain' if the action that we are
    //    reaching to here is of current type.
    //
    // 4. here we add filter fro the action type.
    ofType(AuthActions.SIGNUP_START),
    // 1. 'switchMap' operator allows us to create a new observable by taking
    //     another observable's data.
    switchMap((signupAction: AuthActions.SignupStart) => {
      return this.http
        .post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
            environment.firebaseAPIKey,
          {
            email: signupAction.payload.email,
            password: signupAction.payload.password,
            returnSecureToken: true
          }
        )
        .pipe(
          // success case
          // 'tap' operator will not return anything
          tap(resData => {
            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
          }),
          map(resData => {
            return handleAuthentication(
              +resData.expiresIn,
              resData.email,
              resData.localId,
              resData.idToken
            );
          }),
          // error case
          catchError(errorRes => {
            return handleError(errorRes);
          })
        );
    })
  );














  // 1. we add such an effect as a normal property in your class.
  //
  // 2. we will create 'authSignup' property.
  //
  // 3. 'actions$' is just a observable and we can call 'pipe', and what you
  //    need to pipe here in now a special RxJs operator which in part of RxJs but 
  //    which is provided by '@ngrx/effects' - in is 'ofType' operator.
  //
  // 4. 'ofType' operator simply allows you to define a filter for which types
  //     of effects you want to continue in this observable pipe you are creating.
  //
  // 5. effect by default always should return a new action at the end one it is done.
  //
  // 6. We also need to add a special decorator to this auth login property here
  //    to turn it into an effect @ngrx/effects is able to pick up later,
  //    that is the @Effect() decorator.
  //
  // 7. You typically want to dispatch a new action once you are done with the code in your effect.
  @Effect()
  authLogin = this.actions$.pipe(
    // 1. you can simply define different types of effects that you want to handle in each chain.
    //
    // 2. this is a filter to allow us to define for which exact actions
    //    we want to continue in this chain.
    //
    // 3. Only continue in this 'observable chain' if the action that we are
    //    reaching to here is of current type.
    //
    // 4. here we add filter fro the action type.
    ofType(AuthActions.LOGIN_START),
    // 1. 'switchMap' operator allows us to create a new observable by taking
    //     another observable's data.
    switchMap((authData: AuthActions.LoginStart) => {
      // here we will use 'HttpClient' service.
      return this.http
        .post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
            environment.firebaseAPIKey,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
          }
        )
        .pipe(
          // 'tap' operator will not return anything
          tap(resData => {
            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
          }),
          map(resData => {
            return handleAuthentication(
              +resData.expiresIn,
              resData.email,
              resData.localId,
              resData.idToken
            );
          }),
          // in case we have errors
          catchError(errorRes => {
            return handleError(errorRes);
          })
        );
    })
  );















  // 1. we add such an effect as a normal property in your class
  //
  // 2. we will create 'authSignup' property.
  //
  // 3. 'actions$' is just a observable and we can call 'pipe', and what you
  //    need to pipe here in now a special RxJs operator which in part of RxJs but 
  //    which is provided by '@ngrx/effects' - in is 'ofType' operator.
  //
  // 4. 'ofType' operator simply allows you to define a filter for which types
  //     of effects you want to continue in this observable pipe you are creating.
  //
  // 5. effect by default always should return a new action at the end one it is done.
  //
  // 6. We also need to add a special decorator to this auth login property here
  //    to turn it into an effect @ngrx/effects is able to pick up later,
  //    that is the @Effect() decorator.
  //
  // 7. You typically want to dispatch a new action once you are done with the code in your effect.
  //
  // 8. What is really important here though is that this is an effect which
  //    does not dispatch a new action in the end.
  //
  // 9. we need set 'dispatch: false' inside our @Effect() decorator because our
  //    effect does not dispatch a new action in the end.
  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(
    // 1. you can simply define different types of effects that you want to handle in each chain.
    //
    // 2. this is a filter to allow us to define for which exact actions
    //    we want to continue in this chain.
    //
    // 3. Only continue in this 'observable chain' if the action that we are
    //    reaching to here is of current type.
    //
    // 4. here we add filter fro the action type.
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    // 'tap' operator will not return anything
    tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
      if (authSuccessAction.payload.redirect) {
        // here we create redirect to the root route
        this.router.navigate(['/']);
      }
    })
  );

















  // 1. we add such an effect as a normal property in your class
  //
  // 2. we will create 'authSignup' property.
  //
  // 3. 'actions$' is just a observable and we can call 'pipe', and what you
  //    need to pipe here in now a special RxJs operator which in part of RxJs but 
  //    which is provided by '@ngrx/effects' - in is 'ofType' operator.
  //
  // 4. 'ofType' operator simply allows you to define a filter for which types
  //     of effects you want to continue in this observable pipe you are creating.
  //
  // 5. effect by default always should return a new action at the end one it is done.
  //
  // 6. We also need to add a special decorator to this auth login property here
  //    to turn it into an effect @ngrx/effects is able to pick up later,
  //    that is the @Effect() decorator.
  //
  // 7. You typically want to dispatch a new action once you are done with the code in your effect.
  @Effect()
  autoLogin = this.actions$.pipe(
    // 1. you can simply define different types of effects that you want to handle in each chain.
    //
    // 2. this is a filter to allow us to define for which exact actions
    //    we want to continue in this chain.
    //
    // 3. Only continue in this 'observable chain' if the action that we are
    //    reaching to here is of current type.
    //
    // 4. here we add filter fro the action type.
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        return { type: 'DUMMY' };
      }

      const loadedUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );

      if (loadedUser.token) {
        // this.user.next(loadedUser);
        const expirationDuration =
          new Date(userData._tokenExpirationDate).getTime() -
          new Date().getTime();
        this.authService.setLogoutTimer(expirationDuration);
        return new AuthActions.AuthenticateSuccess({
          email: loadedUser.email,
          userId: loadedUser.id,
          token: loadedUser.token,
          expirationDate: new Date(userData._tokenExpirationDate),
          redirect: false
        });

        // const expirationDuration =
        //   new Date(userData._tokenExpirationDate).getTime() -
        //   new Date().getTime();
        // this.autoLogout(expirationDuration);
      }
      return { type: 'DUMMY' };
    })
  );













  // 1. we add such an effect as a normal property in your class
  //
  // 2. we will create 'authSignup' property.
  //
  // 3. 'actions$' is just a observable and we can call 'pipe', and what you
  //    need to pipe here in now a special RxJs operator which in part of RxJs but 
  //    which is provided by '@ngrx/effects' - in is 'ofType' operator.
  //
  // 4. 'ofType' operator simply allows you to define a filter for which types
  //     of effects you want to continue in this observable pipe you are creating.
  //
  // 5. effect by default always should return a new action at the end one it is done.
  //
  // 6. We also need to add a special decorator to this auth login property here
  //    to turn it into an effect @ngrx/effects is able to pick up later,
  //    that is the @Effect() decorator.
  //
  // 7. You typically want to dispatch a new action once you are done with the code in your effect.
  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    // 1. you can simply define different types of effects that you want to handle in each chain.
    //
    // 2. this is a filter to allow us to define for which exact actions
    //    we want to continue in this chain.
    //
    // 3. Only continue in this 'observable chain' if the action that we are
    //    reaching to here is of current type.
    //
    // 4. here we add filter fro the action type.
    ofType(AuthActions.LOGOUT),
    // 'tap' operator will not return anything
    tap(() => {
      this.authService.clearLogoutTimer();
      // remove data from localStorage
      localStorage.removeItem('userData');
      // then navigate to '/auth' path
      this.router.navigate(['/auth']);
    })
  );












  constructor(
    private actions$: Actions,
    private http: HttpClient,
    // here we need inject router
    private router: Router,
    private authService: AuthService
  ) {}
}




