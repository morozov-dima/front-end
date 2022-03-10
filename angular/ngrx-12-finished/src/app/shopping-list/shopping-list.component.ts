import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';
import { LoggingService } from '../logging.service';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';
import { ShoppingListState } from '../shopping-list/store/shopping-list.model';

import { getIngredientsSelector } from '../shopping-list/store/shopping-list.selectors';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private subscription: Subscription;

  public shoppingListIngredientsIndex: number;

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
    // 5. here we use our selector that we create in state/shoppingList folder.
    // 6. 'getIngredients' this is selector that was created.
    // 7. here we select our 'selecter' and we subscribe to it.
    this.store.select(getIngredientsSelector).subscribe(res => {
      this.ingredients = res;
    });
    

    //this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit!');

   
    
  }






  onEditItem(index: number) {
    // this.slService.startedEditing.next(index);

    // here we will use our global 'store'
    // we will dispatch (send) a new action
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }






  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
