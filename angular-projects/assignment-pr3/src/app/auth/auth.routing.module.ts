import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthShellComponent } from "./auth-shell/auth-shell.component";

const routes: Routes = [
    { path: '', component: AuthShellComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AuthRoutingModule {}