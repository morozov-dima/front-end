import { NgModule } from "@angular/core";
import { PromotionsComponent } from "./promotions.component";
import { PromotionsRoutingModule } from "./promotions.routing.module";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        PromotionsComponent
    ],
    imports: [
        PromotionsRoutingModule,
        HttpClientModule,
        CommonModule
    ]
})

export class PromotionsModule {}