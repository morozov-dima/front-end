import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';



// *************************** STORE ****************************
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';
// *************************** STORE ****************************



@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(
              private slService: ShoppingListService,
              // when we inject the store, we reference from 'fromShoppingList.AppState'
              private store: Store<fromShoppingList.AppState> ) { }




  ngOnInit() {
    this.subscription = this.slService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.slService.getIngredient(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        }
      );
  }




  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      // without STORE
      // this.slService.updateIngredient(this.editedItemIndex, newIngredient);


      // ********************* STORE ********************
      // with STORE. now we can use dispatch() method.
      // we will dispatch our actions.
      // here we are using our global store.
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({index: this.editedItemIndex, ingredient: newIngredient}));
      // ********************* STORE ********************



    } else {
      // without STORE
      //this.slService.addIngredient(newIngredient);



      // ********************* STORE ********************
      // with STORE. now we can use dispatch() method.
      // we will dispatch our actions.
      // here we are using our global store.
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
      // ********************* STORE ********************



    }
    this.editMode = false;
    form.reset();
  }





  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }





  onDelete() {
    // without STORE
    // this.slService.deleteIngredient(this.editedItemIndex);


    // with STORE
    this.store.dispatch(
        new ShoppingListActions.DeleteIngredient(this.editedItemIndex)
    );  

    

    this.onClear();
  }





  ngOnDestroy() {
    this.subscription.unsubscribe();
  }





}
