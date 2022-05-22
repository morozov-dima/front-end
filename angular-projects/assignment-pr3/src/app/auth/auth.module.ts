import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialsModule } from "../material-module/material-module.module";
import { AuthShellComponent } from "./auth-shell/auth-shell.component";
import { AuthRoutingModule } from "./auth.routing.module";


@NgModule({
    declarations: [
        AuthShellComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        MaterialsModule,
        ReactiveFormsModule
    ]
})

export class AuthModule {}