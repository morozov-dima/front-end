import { NgModule } from "@angular/core";
import { MaterialsModule } from "../materials/materials.module";
import { UsersDataComponent } from "./users-list/users-data/users-data.component";
import { UsersListComponent } from "./users-list/users-list.component";
import { UsersRoutingModule } from "./users.routing.module";

@NgModule({
    declarations: [
        UsersListComponent,
        UsersDataComponent
    ],
    imports: [
        UsersRoutingModule,
        MaterialsModule
    ]
})

export class UsersModule {

}