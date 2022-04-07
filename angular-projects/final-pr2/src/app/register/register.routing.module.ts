import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RegisterShellComponent } from "./register-shell/register-shell.component";

const routes: Routes = [
    { path: '', component: RegisterShellComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class RegisterRoutingModule {}