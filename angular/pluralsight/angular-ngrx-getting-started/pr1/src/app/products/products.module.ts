import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { StoreModule } from '@ngrx/store';
import { productReducer } from './state/products.reducer';
import { ProductsRoutingModule } from './products.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './state/products.effects';



@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    HttpClientModule,
    StoreModule.forFeature('products', productReducer),

    // Lazily load our 'products effects' when we load our 'ProductModule'
    EffectsModule.forFeature([ProductEffects])
  ],
  exports: [
    ProductsComponent
  ]
})
export class ProductsModule { }
