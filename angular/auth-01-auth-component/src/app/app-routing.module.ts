import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },


  // ************************* Module Lazy loading begin ***********************
  // Load the code content or add a module only when user visit this path.
  // this way we can Lazy loading current module
  { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },
  { path: 'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' }
  // ************************* Module Lazy loading end *************************
  

];

@NgModule({
  // ********************** Preload lazy loaded modules begin ***********************
  // we pass second argument for 'preload lazy loaded modules'
  // we can add 'preloadingStrategy' as second argument in main routing module (with forRoot)
  // and set it to 'PreloadAllModules'. 
  // Default is 'NoPreloading'
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
 

  // we need export 'RouterModule' module
  exports: [RouterModule]
})
export class AppRoutingModule {}
