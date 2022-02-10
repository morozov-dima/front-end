import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from "../shared/ingredient.model";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  sendUserData: Subject<Ingredient> = new Subject();

  constructor() { }
  getIngredients() {
    return this.ingredients;
  }

  addUserData(userData: Ingredient) {
    this.ingredients.push(userData);

    
  }





  
}
