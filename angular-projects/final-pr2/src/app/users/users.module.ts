import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
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
        StoreModule.forFeature('users', userReducer),
        EffectsModule.forFeature([UserEffects])
    ],
    exports: []
})

export class UsersModule {}