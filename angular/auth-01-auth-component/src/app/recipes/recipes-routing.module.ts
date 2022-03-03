import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesResolverService } from './recipes-resolver.service';
import { RecipesComponent } from './recipes.component';


// constant with our 'recipes' routes.
const routes: Routes = [
  {
    // here we use '' because we load our module lazy load.
    // and we already have 'recipes' path in 'app-routing.module.ts'
    path: '',
    component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipesResolverService]
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [RecipesResolverService]
      }
    ]
  }
];



// for each new feature module we add 'NgModule' decorator.
@NgModule({
  imports: [RouterModule.forChild(routes)],

  // we need export 'RouterModule' module
  exports: [RouterModule]
})
export class RecipesRoutingModule {}
