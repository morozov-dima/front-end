import { NgModule } from "@angular/core";
import { PromotionsComponent } from "./promotions.component";
import { PromotionsRoutingModule } from "./promotions.routing.module";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    declarations: [
        PromotionsComponent
    ],
    imports: [
        PromotionsRoutingModule,
        HttpClientModule
    ]
})

export class PromotionsModule {}