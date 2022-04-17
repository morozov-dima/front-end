import { NgModule } from "@angular/core";
import { PromotionsComponent } from "./promotions.component";
import { PromotionsRoutingModule } from "./promotions.routing.module";

@NgModule({
    declarations: [
        PromotionsComponent
    ],
    imports: [
        PromotionsRoutingModule
    ]
})

export class PromotionsModule {}