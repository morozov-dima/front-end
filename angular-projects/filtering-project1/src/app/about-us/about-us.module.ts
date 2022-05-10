import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AboutUsRoutingModule } from "./about-us.routing.module";
import { AboutUsComponent } from "./about-us/about-us.component";


@NgModule({
    declarations: [
        AboutUsComponent
    ],
    imports: [
        CommonModule,
        AboutUsRoutingModule
    ]
})

export class AboutUsModule {

}