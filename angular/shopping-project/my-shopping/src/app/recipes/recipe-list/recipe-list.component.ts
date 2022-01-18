import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model'; // we will use "Recipe" model as type

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'A test Recipe',
      'This is simply a test',
      '/assets/vegan-tofu-tikka-masala-recipe.jpg'
    ),
    new Recipe(
      'A test Recipe2',
      'This is simply a test2',
      '/assets/vegan-tofu-tikka-masala-recipe.jpg'
    ),
  ];

  constructor() {}

  ngOnInit(): void {}
}
