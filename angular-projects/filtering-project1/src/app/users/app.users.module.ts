import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialsModule } from "../materials/materials.module";
import { UsersDataComponent } from "./users-data/users-data.component";
import { UsersListComponent } from "./users-data/users-list/users-list.component";
import { UsersRoutingModule } from "./users.routing.module";

@NgModule({
    declarations: [
        UsersDataComponent,
        UsersListComponent
    ],
    imports: [
        CommonModule,
        UsersRoutingModule,
        MaterialsModule
    ]
})

export class UsersModule {

}

