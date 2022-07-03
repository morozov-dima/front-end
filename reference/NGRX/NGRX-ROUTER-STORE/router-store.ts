// **********************************************************************
// ***************************** Example  *******************************
// **********************************************************************



// ***************************** app.module.ts *************************


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';  // NEW
import { HttpClientModule } from '@angular/common/http';

import * as fromApp from './state/app.reducer';
import { MapsEffects } from './maps/state/maps.effects';

import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
       apiKey: environment.apiKey
     }),
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([MapsEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),

    // Router Store connection begin
    StoreRouterConnectingModule.forRoot({  // NEW
      stateKey: 'router',  // NEW
      routerState: RouterState.Minimal  // NEW
    })
    // Router Store connection end
  

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }







// ************************ app.reducer.ts ****************************
import { routerReducer, RouterState } from '@ngrx/router-store';  // NEW
import { ActionReducerMap } from '@ngrx/store';
import { MapState } from '../maps/state/maps.interface';
import * as fromMaps from '../maps/state/maps.reducer';

export interface State {
    maps: MapState;
    router: RouterState // NEW
}

export const appReducer: ActionReducerMap<State> = {
    maps: fromMaps.mapReducer,
    router: routerReducer // NEW
};