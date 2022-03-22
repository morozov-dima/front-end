import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },

  // Lazy-loading feature modules. In new Angular versions we must use
  // 'import' instead 'loadChildren'
  {
    path: 'training',
    loadChildren: () =>
      import('./training/training.module').then((m) => m.TrainingModule),
      // in case we use 'Lazy-loading feature modules' we need add 'canLoad'
      // guard here instead 'canActivate'
      canLoad: [AuthGuard]
  },
];

@NgModule({
    // ********************** Preload lazy loaded feature modules begin ***********************
  // we pass second argument for 'preload lazy loaded modules'
  // we can add 'preloadingStrategy' as second argument in main routing module (with forRoot)
  // and set it to 'PreloadAllModules'. 
  // Default is 'NoPreloading'
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],


  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
