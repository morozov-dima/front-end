import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model'; // we will use "Recipe" model as type

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() myRecipeDetailsItem: Recipe = {};
  constructor() { }

  ngOnInit(): void {
 
  }

}
