import { NgModule } from "@angular/core";
import { RegisterFormComponent } from "./register-form/register-form.component";
import { RegisterInfoComponent } from "./register-info/register-info.component";
import { RegisterShellComponent } from "./register-shell/register-shell.component";
import { RegisterRoutingModule } from "./register.routing.module";
import { MaterialsModule } from '../materials/materials.module';

@NgModule({
    declarations: [
        RegisterFormComponent,
        RegisterInfoComponent,
        RegisterShellComponent
    ],
    imports: [
        RegisterRoutingModule,
        MaterialsModule
    ]
})

export class RegisterModule {}