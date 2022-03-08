import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';
import { LoggingService } from '../logging.service';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  private subscription: Subscription;

  constructor(
    private loggingService: LoggingService,

    // 1. here we inject our 'store'.
    // 2. type of our private 'store' variable will be 'Store'
    //    and 'Store' needs to be imported from @ngrx/store
    // 3. 'Store' is a generic type, you need to describe how your application store looks like.
    private store: Store<fromApp.AppState>
  ) {}






  ngOnInit() {
    // 1. we will use 'select' method and that helps you select a 'slice' of your state.
    // 2. here I selecting that shopping list part of my global store.
    // 3. because we need to tell NgRx into which part of the store you are
    //    interested in at this point.
    // 4. this 'slice' give us an 'observable'
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.slService.getIngredients();
    // this.subscription = this.slService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );

    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit!');
  }






  onEditItem(index: number) {
    // this.slService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
