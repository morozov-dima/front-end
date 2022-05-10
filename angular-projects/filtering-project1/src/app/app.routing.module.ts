import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { WelcomeComponent } from "./welcome/welcome.component";

const routes: Routes = [
    { path: '', component: WelcomeComponent },
    { path: 'users', loadChildren: () => import('./users/app.users.module').then(m => m.UsersModule) },
    { path: 'about-us', loadChildren: () => import('./about-us/about-us.module').then(m => m.AboutUsModule) },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        // preload all lazy loaded modules
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules })
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {

}