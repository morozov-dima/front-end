import { NgModule } from "@angular/core";
import { UsersComponent } from "./users.component";
import { UsersRoutingModule } from "./users.routing.module";


@NgModule({
    declarations: [
        UsersComponent
    ],
    imports: [
        UsersRoutingModule
    ]
})

export class UsersModule {}