import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MeterialsModule } from "../materials/materials.module";
import { UsersShellComponent } from "./users-shell/users-shell.component";
import { UsersTableComponent } from "./users-shell/users-table/users-table.component";
import { UsersRoutingModule } from "./users.routing.module";
import { HttpClientModule } from '@angular/common/http';
import { UsersDataService } from "./state/users-data.service";

@NgModule({
    providers: [
        UsersDataService
    ],
    declarations: [
        UsersShellComponent,
        UsersTableComponent
    ],
    imports: [
        CommonModule,
        UsersRoutingModule,
        MeterialsModule,
        HttpClientModule
    ]
})

export class UsersModule {}