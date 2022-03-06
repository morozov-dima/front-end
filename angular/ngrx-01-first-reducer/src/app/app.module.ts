import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


// import 'StoreModule' in order to use STORE in our project.
// 'StoreModule' is Angular module.
import { StoreModule } from '@ngrx/store';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';


import { shoppingListReducer } from './shopping-list/store/shopping-list.reducer';


@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,


    // **************** STORE *******************
    // we need declare here whitch reducers are involved
    // 'shoppingListReducer' name of our reducer
    // 'shoppingList' key name is totally up to you.
    // This way we told NgRx where to find our reducer.
    // 
    // This is structure of our STORE.
    StoreModule.forRoot({
      shoppingList: shoppingListReducer
    }),



    SharedModule,
    CoreModule
  ],
  bootstrap: [AppComponent],
  // providers: [LoggingService]
})
export class AppModule {}
