import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PostsShellComponent } from "./posts-shell/posts-shell.component";

const routes: Routes = [
    { path: '', component: PostsShellComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class PostsRoutingModule {}