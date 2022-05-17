import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlightsShellComponent } from "./flights-shell/flights-shell.component";
import { RoutingFlightsModule } from "./flights.routing.module";

@NgModule({
    declarations: [
        FlightsShellComponent
    ],
    imports: [
        CommonModule,
        RoutingFlightsModule
    ]
})

export class FlightsModule {}