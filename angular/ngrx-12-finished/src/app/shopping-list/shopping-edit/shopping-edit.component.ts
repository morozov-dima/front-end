import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';

// import all out 'actions'
import * as ShoppingListActions from '../store/shopping-list.actions';

// 'fromApp' is alias.
import * as fromApp from '../../store/app.reducer';

// import 'shopping list selectors.'
import { getShoppingListStateSelector } from '../store/shopping-list.selectors';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})





export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(
    // here we inject the 'store'
    private store: Store<fromApp.AppState>
  ) {}







  ngOnInit() {
    this.subscription = this.store
      // 1. here we use 'getShoppingListState' selector
      // 2. we are simply listen to our store
      // 3. we select the 'shoppingList' slice but now instead of using
      //    the 'async' pipe in the template, we will set up my own subscription.
      .select(getShoppingListStateSelector)
      .subscribe(stateData => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItem = stateData.editedIngredient;
          // here we update our 'shopping list' form.
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        } else {
          this.editMode = false;
        }
      });
  }





  


  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      // this.slService.updateIngredient(this.editedItemIndex, newIngredient);
      
      // 1. here we will change shopping list state and therefore should
      //    change the store.
      // 2. So now we can create a new type, a new object based on that
      // action class here and dispatch it.
      // 3. 'dispatch' = 'send'
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient(newIngredient)
      );
    } else {
      // before 'store' connection
      // this.slService.addIngredient(newIngredient);

      // 1. here we will change shopping list state and therefore should change the store.
      // 2. here we need dispatch actions.
      // 3. 'dispatch' = 'send'
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
  }








  onClear() {
    // here we reset our form
    this.slForm.reset();
    this.editMode = false;

    // here we also dispatch data to our store
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }






  onDelete() {
    // this.slService.deleteIngredient(this.editedItemIndex);

    // here we will also use store
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }







  ngOnDestroy() {
    // we recomment unsubscribe from our subscription
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
