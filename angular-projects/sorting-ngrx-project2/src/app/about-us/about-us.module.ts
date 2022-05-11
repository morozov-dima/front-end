import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AboutUsShellComponent } from "./about-us-shell/about-us-shell.component";
import { AboutUsRoutingModule } from "./about-us.routing.module";

@NgModule({
    declarations: [
        AboutUsShellComponent
    ],
    imports: [
        CommonModule,
        AboutUsRoutingModule
    ]
})

export class AboutUsModule {

}