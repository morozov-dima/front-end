import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { MaterialsModule } from './materials/materials.module';
import { HeaderComponent } from './header/header.component';
import { CurrentLocationComponent } from './current-location/current-location.component';
import { HttpClientModule } from '@angular/common/http';

import * as fromApp from './state/app.reducer';
import { MapsEffects } from './maps/state/maps.effects';

import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './maps/maps.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddLocationComponent } from './add-location/add-location.component';
import { SaveLocationDialogComponent } from './save-location-dialog/save-location-dialog.component';

import { SearchLocationComponent } from './search-location/search-location.component';
import { LoaderComponent } from './loader/loader.component';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CurrentLocationComponent,
    MapComponent,
    GoogleMapComponent,
    AddLocationComponent,
    SaveLocationDialogComponent,
    SearchLocationComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialsModule,
    AgmCoreModule.forRoot({
       apiKey: environment.apiKey
     }),
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([MapsEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot()

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
