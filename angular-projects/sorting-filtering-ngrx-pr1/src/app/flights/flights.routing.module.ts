import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FlightsShellComponent } from "./flights-shell/flights-shell.component";

const routes: Routes = [
    { path: '', component: FlightsShellComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class RoutingFlightsModule {}