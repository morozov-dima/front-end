import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UsersShellComponent } from "./users-shell/users-shell.component";
import { AuthGuard } from '../auth/state/auth.guard';

const routes: Routes = [
    { 
        path: '',
        component: UsersShellComponent,
        canActivate: [AuthGuard]
    }
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

export class UsersRoutingModule {}