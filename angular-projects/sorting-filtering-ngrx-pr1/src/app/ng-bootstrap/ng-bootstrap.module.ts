import { NgModule } from "@angular/core";
import { NgbAlertModule, NgbNavModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    imports: [
        NgbAlertModule,
        NgbNavModule
    ],
    exports: [
        NgbAlertModule,
        NgbNavModule
    ]
})

export class ngBootstrapModule {}