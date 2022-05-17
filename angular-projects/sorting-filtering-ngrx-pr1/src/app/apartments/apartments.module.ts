import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "../materials/materials.module";
import { ngxBootstrapModule } from "../ngx-bootstrap/ngx-bootstrap.module";
import { ApartmentsShellComponent } from "./apartments-shell/apartments-shell.component";
import { RoutingApartmentModule } from "./apartments.routing.module";
import { ApartmentsService } from "./state/apartments-service";
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from "@ngrx/store";
import { apartmentsReducer } from "./state/apartments-reducer";
import { EffectsModule } from "@ngrx/effects";
import { ApartmentsEffect } from "./state/apartments-effects";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    providers: [
        ApartmentsService
    ],
    declarations: [
        ApartmentsShellComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RoutingApartmentModule,
        MaterialModule,
        ngxBootstrapModule,
        HttpClientModule,
        StoreModule.forFeature('apartments', apartmentsReducer),
        EffectsModule.forFeature([
            ApartmentsEffect
        ])
   ]
})

export class ApartmentsModule {

}