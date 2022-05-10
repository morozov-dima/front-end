// *****************************************************************
// ************************** Example 1 ****************************
// *****************************************************************


// ************************* app.module.ts ************************
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
import { CommonModule } from '@angular/common';

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
    CommonModule,
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







// ************************ materials.module.ts ***************************
import { NgModule } from "@angular/core";
import { MatButtonModule} from '@angular/material/button'
import { MatSliderModule } from '@angular/material/slider';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDividerModule} from '@angular/material/divider';


@NgModule({
    imports: [
        MatButtonModule,
        MatSliderModule,
        MatInputModule,
        MatTabsModule,
        MatTableModule,
        MatCardModule,
        MatProgressBarModule,
        MatDividerModule
    ],
    exports: [
        MatButtonModule,
        MatSliderModule,
        MatInputModule,
        MatTabsModule,
        MatTableModule,
        MatCardModule,
        MatProgressBarModule,
        MatDividerModule
    ]
})

export class MaterialsModule {}







// ************************* app.routing.module.ts ***************************
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  {
    path: 'promotions',
    loadChildren: () =>
      import('./promotions/promotions.module').then((m) => m.PromotionsModule),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'auth',
    loadChildren: () => 
      import('./auth/auth.module').then((m) => m.AuthModule)
  },
  { path: '**', component: PageNotFoundComponent },
];


@NgModule({
  // 'PreloadAllModules' : Provides a preloading strategy
  //  that preloads all modules as quickly as possible.
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})


export class AppRoutingModule {}








