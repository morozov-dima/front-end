import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { WelcomeComponent } from "./welcome/welcome.component";

const routes: Routes = [
    { path: '', component: WelcomeComponent },
    { path: 'about-us', loadChildren: () => import('./about-us/about-us.module').then(mod => mod.AboutUsModule) },
    { path: 'users', loadChildren: () => import('./users/users.module').then(mod => mod.UsersModule ) },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {}