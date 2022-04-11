import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { LoadingComponent } from "../loading/loading.component";
import { MaterialsModule } from "../materials/materials.module";
import { AuthShellComponent } from "./auth-shell/auth-shell.component";
import { AuthTermsComponent } from "./auth-terms/auth-terms.component";
import { AuthRoutingModule } from "./auth.routing.module";
import { JoinComponent } from "./join/join.component";
import { LoginComponent } from "./login/login.component";
import { AuthEffects } from "./state/auth.effects";
import { authReducer } from "./state/auth.reducer";

@NgModule({
    declarations: [
        JoinComponent,
        LoginComponent,
        AuthShellComponent,
        AuthTermsComponent,
        LoadingComponent
    ],
    imports: [
        MaterialsModule,
        ReactiveFormsModule,
        CommonModule,
        AuthRoutingModule,
        HttpClientModule,
        StoreModule.forFeature('auth', authReducer),
        EffectsModule.forFeature([AuthEffects])
    ]
})

export class AuthModule {}