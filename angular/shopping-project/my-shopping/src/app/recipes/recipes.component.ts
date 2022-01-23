import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from './recipe.model'; // we will use "Recipe" model as type

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  myRecipeDetails: Recipe = {};
  showRecipe: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  onMyRecipe(onMyRecipe: object) {
    //console.log(onMyRecipe);
    this.myRecipeDetails = onMyRecipe;
    this.showRecipe = true;
  }


}
