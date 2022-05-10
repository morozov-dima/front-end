import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutUsComponentComponent } from "./about-us-page/about-us-page.component";

const routes: Routes = [
    { path: '', component: AboutUsComponentComponent }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingAboutUsModule {

}