import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


// 1. we need import 'StoreModule' in order to work with 'STORE'
// 2. this is angular module.
import { StoreModule } from '@ngrx/store';



import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import * as fromApp from './store/app.reducer';
import { AuthEffects } from './auth/store/auth.effects';
import { environment } from '../environments/environment';
import { RecipeEffects } from './recipes/store/recipe.effects';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,



    // ***************************** STORE *********************************
    // 1. we need to tell NgRx what makes up our store, which reducers are involved.
    // 2. here we connect our 'appReducer'.
    // 3. we told NgRx where to find our reducer.
    // 4. here we are adding NgRx to our application by including 'StoreModule'
    //    and calling 'forRoot' and we connect here our 'appReducer' reducer.
    StoreModule.forRoot(fromApp.appReducer),
    // ***************************** STORE **********************************






    // ***************************** Effect *********************************
    // 1. Now for registering all the effects and this effects login globally, 
    // 2. we have to go back to the app module and register the 'EffectsModule'
    // 3. this 'EffectsModule' also has s forRoot method and to 'forRoot' you
    // 4. now have to pass an array of your root effects.
    // 5. here we can see list of our effects.
    EffectsModule.forRoot([AuthEffects, RecipeEffects]),
    // ***************************** Effect *********************************
    





    // ************************** Google Chrom Redux DevTools *****************
    // we need add this for 'Google Chrom Redux DevTools'
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    // ************************** Google Chrom Redux DevTools *****************




    StoreRouterConnectingModule.forRoot(),
    SharedModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
  // providers: [LoggingService]
})
export class AppModule {}
