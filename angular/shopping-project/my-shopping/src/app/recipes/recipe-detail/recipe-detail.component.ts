import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/shared/recipe.service';
import { Recipe } from '../recipe.model'; // we will use "Recipe" model as type

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  myRecipeDetailsItem: Recipe = {};
  id: number = 0;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.myRecipeDetailsItem = this.recipeService.getRecipe(this.id);
      }
    );
  }

  onEditRecipe() {
    // option 1
    //  Navigate from "http://localhost:4200/recipes/1" to "http://localhost:4200/recipes/1/edit"
    // this.router.navigate(['edit'], {relativeTo: this.route});

    // option 2
    this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }


}
