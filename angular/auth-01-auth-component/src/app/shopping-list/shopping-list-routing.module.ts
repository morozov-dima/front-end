import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ShoppingListComponent } from "./shopping-list.component";

const routes: Routes = [
    { path: '', component: ShoppingListComponent }
];


// for each new feature module we add 'NgModule' decorator.
@NgModule({
   imports: [
       RouterModule.forChild(routes)
   ],

   // we need export 'RouterModule' module
   exports: [
       RouterModule
   ]
})

export class ShoppingListRoutingModule {

}