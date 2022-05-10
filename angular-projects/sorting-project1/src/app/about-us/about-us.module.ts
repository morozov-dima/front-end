import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AboutUsComponentComponent } from "./about-us-page/about-us-page.component";
import { AppRoutingAboutUsModule } from "./about-us.routing.module";

@NgModule({
    declarations: [
        AboutUsComponentComponent
    ],
    imports: [
        CommonModule,
        AppRoutingAboutUsModule
    ]
})

export class AboutUaModule {

}