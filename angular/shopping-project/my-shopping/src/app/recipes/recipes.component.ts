import { Component, Input, OnInit } from '@angular/core';
import { RecipeService } from '../shared/recipe.service';
import { Recipe } from './recipe.model'; // we will use "Recipe" model as type

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  myRecipeDetails: Recipe = {};
  showRecipe: boolean = false;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.recipeSelected.subscribe((recipe: Recipe) => {
      this.myRecipeDetails = recipe;
    })
  }




}
