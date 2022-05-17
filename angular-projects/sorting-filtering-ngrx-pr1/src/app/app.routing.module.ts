import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { WelcomeComponent } from "./welcome/welcome.component";

const routes: Routes = [
    { path: '', component: WelcomeComponent },
    { path: 'apartments', loadChildren: () => import('./apartments/apartments.module').then(mod => mod.ApartmentsModule) },
    { path: 'flights', loadChildren: () => import('./flights/flights.module').then(mod => mod.FlightsModule) },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabledBlocking' })
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {

}