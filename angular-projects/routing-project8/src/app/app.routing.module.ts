import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { PostsComponent } from "./posts/posts.component";
import { CanActivateUser } from "./shared/canActivateUser";
import { UsersComponent } from "./users/users.component";
import { WelcomeComponent } from "./welcome/welcome.component";

const routes: Routes = [
    { path: '', component: WelcomeComponent },
    { path: 'users', component: UsersComponent, canActivate: [CanActivateUser] },
    { path: 'posts', component: PostsComponent },
    { path: 'login', component: LoginComponent }
];

@NgModule({
    imports: [
       RouterModule.forRoot(routes) 
    ],
    exports: [
        RouterModule
    ],
    providers: [
        CanActivateUser
    ]
})

export class AppRoutingModule {

}