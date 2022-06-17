import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MeterialsModule } from "../materials/materials.module";
import { PostsShellComponent } from "./posts-shell/posts-shell.component";
import { PostsRoutingModule } from "./posts.routing.module";

@NgModule({
    declarations: [
        PostsShellComponent
    ],
    imports: [
        CommonModule,
        PostsRoutingModule,
        MeterialsModule
    ]
})

export class PostsModule {}