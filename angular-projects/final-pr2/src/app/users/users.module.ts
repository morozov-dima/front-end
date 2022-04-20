import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { MaterialsModule } from "../materials/materials.module";
import { UserEffects } from "./state/users.effects";
import { userReducer } from "./state/users.reducer";
import { UsersDescriptionComponent } from "./users-description/users-description.component";
import { UsersListComponent } from "./users-list/users-list.component";
import { UsersShellComponent } from "./users-shell/users-shell.component";
import { UsersRoutingModule } from "./users.routing.module";

@NgModule({
    declarations: [
        UsersShellComponent,
        UsersListComponent,
        UsersDescriptionComponent
    ],
    imports: [
        UsersRoutingModule,
        HttpClientModule,
        CommonModule,
        MaterialsModule,
        ReactiveFormsModule,
        StoreModule.forFeature('users', userReducer),
        EffectsModule.forFeature([UserEffects])
    ],
    exports: []
})

export class UsersModule {}