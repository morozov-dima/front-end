import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { LoggingService } from '../logging.service';
import { Store } from '@ngrx/store';


// we will import all
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';



@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  // now 'ingredients' is an observable
  ingredients: Observable<{ ingredients:  Ingredient[] }>;


  constructor(
    private loggingService: LoggingService,





    // ***************** STORE ******************
    // here we will inject our application STORE
    // '{ shoppingList: { ingredients: Ingredient[] } }' this is the final type
    // of our 'store data'
    //
    // And now our type is 'fromShoppingList.AppState'
    private store: Store<fromApp.AppState>
  ) {}





  ngOnInit() {
    // here we will use our store
    // Now on this store, whitch is this injected store service provided by
    // NgRx, you have a select() method and that helps you select a slice of your state.
    // inside 'select' we use 'shoppingList' because our key name is: 
    // { shoppingList: { ingredients: Ingredient[] } }.
    //
    // So here I am selecting that shopping list part of my global store.
    // we select my shopping list and this turns out to give us an observable.
    //
    // we will store this observable in 'this.ingredients'
    // here we displaying data based on our selection from NgRx.
    this.ingredients = this.store.select('shoppingList');




    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit!');
  }

  onEditItem(index: number) {

    // without STORE
    //this.slService.startedEditing.next(index);


    // with STORE. we are dispatching this action.
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  ngOnDestroy() {

  }
}
