import { NgModule } from "@angular/core";
import { PromotionShellComponent } from "./promotion-shell/promotion-shell.component";
import { PromotionComponent } from "./promotion/promoton.component";
import { PromotionsRoutingModule } from "./promotions.routing.module";
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from "@angular/common";
import { LoaderComponent } from "../loader/loader.component";
import { EffectsModule } from "@ngrx/effects";
import { PromotionEffects } from "./state/promotions.effects";
import { StoreModule } from "@ngrx/store";
import { promotionReducer } from "./state/promotions.reducer";

@NgModule({
    declarations: [
        PromotionComponent,
        PromotionShellComponent,
        LoaderComponent
    ],
    imports: [
        PromotionsRoutingModule,
        HttpClientModule,
        StoreModule.forFeature('promotions', promotionReducer),
        CommonModule,
        EffectsModule.forFeature([PromotionEffects]) 
    ],
    exports: []
})

export class PromotionsModule {}