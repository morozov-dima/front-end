import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthshellComponent } from "./auth-shell/auth-shell.component";
import { AuthShellRoutingModule } from "./authshell.routing.module";

@NgModule({
    declarations: [
        AuthshellComponent
    ],
    imports: [
        AuthShellRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})

export class AuthshellModule {}