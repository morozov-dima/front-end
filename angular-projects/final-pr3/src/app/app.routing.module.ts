import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { WelcomeComponent } from "./welcome/welcome.component";


const routes: Routes = [
    { 
        path: '',
        component: WelcomeComponent
    },
    { 
        path: 'promotions',
        loadChildren: () => import('./promotions/promotions.module').then(m => m.PromotionsModule)
    },
    { 
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/authshell.module').then(m => m.AuthshellModule)
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            routes,
            {
                preloadingStrategy: PreloadAllModules
            }
        )
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {}