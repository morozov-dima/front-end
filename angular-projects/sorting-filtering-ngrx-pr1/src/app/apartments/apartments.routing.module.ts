import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ApartmentsShellComponent } from "./apartments-shell/apartments-shell.component";

const routes: Routes = [
    { path: '', component: ApartmentsShellComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class RoutingApartmentModule {

}