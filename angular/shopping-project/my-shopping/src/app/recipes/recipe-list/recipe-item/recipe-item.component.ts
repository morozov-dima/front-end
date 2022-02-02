import { Component, Input, OnInit, AfterContentInit } from '@angular/core';
import { RecipeService } from 'src/app/shared/recipe.service';
import { Recipe } from '../../recipe.model'; // we will use "Recipe" model as type

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit, AfterContentInit {

  // We get data from parent component
  @Input() recipe: Recipe = {};


  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    
  }

  ngAfterContentInit() {

  }

  onSelected(recipe: object) {
    this.recipeService.recipeSelected.emit(this.recipe);
  }

}
