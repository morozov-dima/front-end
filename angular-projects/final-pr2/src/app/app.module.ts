import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app.routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginInterceptor } from './auth/state/auth.interceptor';
import { FooterComponent } from './footer/footer.component';
import { MaterialsModule } from './materials/materials.module';


import * as fromApp from './state/app.reducer';
import { AuthEffects } from './auth/state/auth.effects';
import { PromotionEffects } from './promotions/state/promotions.effects';
import { UserEffects } from './users/state/users.effects';
import { WelcomeLoginComponent } from './welcome/welcome-login/welcome-login.component';
import { WelcomeLogoutComponent } from './welcome/welcome-logout/welcome-logout.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,
    WelcomeLoginComponent,
    WelcomeLogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([AuthEffects, PromotionEffects, UserEffects]),
    BrowserAnimationsModule,
    MaterialsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoginInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
