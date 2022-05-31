// ********* hot to add store dev tool ***********

1. run this code 'ng add @ngrx/store-devtools@latest'
2. add 'StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })'
   in imports array.
3.  add :
    import { StoreDevtoolsModule } from '@ngrx/store-devtools';
    import { environment } from '../environments/environment';  
    in the top of your app.module.ts file.


// Example:
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { ProductsModule } from './products/products.module';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ProductsModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }