import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
              private http: HttpClient,
              private recipeService: RecipeService
              ) { }

  storeRecipes() {
    // list of recipes
    const recipes = this.recipeService.getRecipes();
    const url = 'https://ng-complete-guide-2aa44-default-rtdb.firebaseio.com';
    // we can also subscribe inside component
    this.http.put(url, recipes).subscribe(response => {
      console.log(response);  
    });
  }



}
