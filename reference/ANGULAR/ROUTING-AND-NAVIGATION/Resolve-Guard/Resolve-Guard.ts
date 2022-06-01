// **************************************************************************
// ****************************** Example 1: ********************************
// **************************************************************************



// ************************ app.module.ts ************************
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ServerResolver } from './servers/server/server-resolver.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    ServerResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }







// ************************** server-resolver.service.ts **************************
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { ServersService } from "../servers.service";

interface Server {
    id: number;
    name: string;
    status: string;
}

@Injectable()

export class ServerResolver implements Resolve<Server> {
    constructor(private serversService: ServersService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Server | Observable<Server> | Promise<Server> {
        return this.serversService.getServer(+route.params['id']);
    }
}









// **************************** app-routing.module.ts ******************************
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { AuthGuard } from "./guards/auth-guard.service";

import { HomeComponent } from "./home/home.component";
//import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServerResolver } from "./servers/server/server-resolver.service";
import { ServerComponent } from "./servers/server/server.component";
import { ServersComponent } from "./servers/servers.component";
import { UserComponent } from "./users/user/user.component";
import { UsersComponent } from "./users/users.component";



const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'users', component: UsersComponent, children: [
      { path: ':id/:name', component: UserComponent}
    ]},
    { 
      path: 'servers',
      // canActivate: [AuthGuard],
      canActivateChild: [AuthGuard],
      component: ServersComponent,
      children: [
        { path: ':id', component: ServerComponent, resolve: {server: ServerResolver} },
        { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard]}
      ]
    },
    //{ path: 'not-found', component: PageNotFoundComponent},
    { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not fount!'}},
    //{ path: 'some-page', redirectTo: '/servers', pathMatch: 'full'},  // redirect to `servers`
    { path: '**' , redirectTo: '/not-found' } // this route must be last in the list.
  ];



@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {

}