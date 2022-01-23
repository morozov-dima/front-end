import { Component, Input, OnInit, AfterContentInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.model'; // we will use "Recipe" model as type

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit, AfterContentInit {

  // We get data from parent component
  @Input() recipe: Recipe = {};

  @Output() recipeSelected = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit(): void {
    
  }

  ngAfterContentInit() {

  }

  onSelected(recipe: object) {
    this.recipeSelected.emit(recipe);
  
  }

}
