import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PromotionShellComponent } from "./promotion-shell/promotion-shell.component";

const routes: Routes = [
    { path: '', component: PromotionShellComponent }
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class PromotionsRoutingModule {}