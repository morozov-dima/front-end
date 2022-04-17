import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthshellComponent } from "./auth-shell/auth-shell.component";

const routes: Routes = [
    { path: '', component: AuthshellComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})


export class AuthShellRoutingModule {

}