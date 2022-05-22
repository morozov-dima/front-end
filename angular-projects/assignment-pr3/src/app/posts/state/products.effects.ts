import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { ProductsService } from "./products.service";


@Injectable()

export class ProductsEffects {
    constructor(
        private action$: Actions,
        private productsService: ProductsService
    ) {}    
}