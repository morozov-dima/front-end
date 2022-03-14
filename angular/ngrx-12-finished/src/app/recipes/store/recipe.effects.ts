import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import * as RecipesActions from './recipe.actions';
import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';





@Injectable()
export class RecipeEffects {






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
  fetchRecipes = this.actions$.pipe(
    // 1. you can simply define different types of effects that you want to handle in each chain.
    //
    // 2. this is a filter to allow us to define for which exact actions
    //    we want to continue in this chain.
    //
    // 3. Only continue in this 'observable chain' if the action that we are
    //    reaching to here is of current type.
    //
    // 4. here we add filter fro the action type.
    ofType(RecipesActions.FETCH_RECIPES),
    // 1. 'switchMap' operator allows us to create a new observable by taking
    //     another observable's data.
    switchMap(() => {
      // here we send this request with 'get'
      return this.http.get<Recipe[]>(
        'https://ng-course-recipe-book-65f10.firebaseio.com/recipes.json'
      );
    }),
    // here we also need map our response.
    map(recipes => {
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      });
    }),
    map(recipes => {
      // here we return action, and we pass 'recipes' into our actions.
      return new RecipesActions.SetRecipes(recipes);
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
  @Effect({dispatch: false})
  storeRecipes = this.actions$.pipe(
    // 1. you can simply define different types of effects that you want to handle in each chain.
    //
    // 2. this is a filter to allow us to define for which exact actions
    //    we want to continue in this chain.
    //
    // 3. Only continue in this 'observable chain' if the action that we are
    //    reaching to here is of current type.
    //
    // 4. here we add filter fro the action type.
    ofType(RecipesActions.STORE_RECIPES),
    // 1. special RxJs operator 'withLatestFrom'.
    // 2. this operator allows us to merge a value from another observable
    //    into this observable stream here.
    withLatestFrom(this.store.select('recipes')),
    // 1. 'switchMap' operator allows us to create a new observable by taking
    //     another observable's data.
    //
    // 2. Here we are using a syntax called 'array destructuring'
    switchMap(([actionData, recipesState]) => {
      return this.http.put(
        'https://ng-course-recipe-book-65f10.firebaseio.com/recipes.json',
        recipesState.recipes
      );
    })
  );












  constructor(
    //  we recomment add $ after 'action' , this is optional.
    // type of our 'actions$' will be Actions.
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
