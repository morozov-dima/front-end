import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutUsShellComponent } from "./about-us-shell/about-us-shell.component";

const routes: Routes = [
    { path: '', component: AboutUsShellComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AboutUsRoutingModule {

}