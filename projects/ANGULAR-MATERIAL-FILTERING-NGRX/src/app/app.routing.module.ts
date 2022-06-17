import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { Welcomecomponent } from "./welcome/welcome.component";

const routes: Routes = [
    { path: '', component: Welcomecomponent },
    { path: 'users', loadChildren: () => import('./users/users.module').then(mod => mod.UsersModule) },
    { path: 'posts', loadChildren: () => import('./posts/posts.module').then(mod => mod.PostsModule) },
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

export class AppRoutingModule {

}