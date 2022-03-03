import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { DropdownDirective } from "./dropdown.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";

// since this is shared module, in order to make these things then
// available in other modules, you will also export all these things which you are importing.

@NgModule({

    declarations: [
        AlertComponent,
        LoadingSpinnerComponent,
        DropdownDirective
    ],

    imports: [
        CommonModule
    ],

    // this is what we want export from our shared module
    exports: [
        AlertComponent,
        LoadingSpinnerComponent,
        DropdownDirective,
        CommonModule
    ]

})

export class SharedModule {

}