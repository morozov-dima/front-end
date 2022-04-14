import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, Observable, Subscription } from "rxjs";
import { AuthPageActions } from "../auth/state/actions";


import { getUser, getAuthFeatureState } from "../auth/state/auth.selectors";
import { AuthService } from "../auth/state/auth.service";
import { State } from "../state/app.state";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
    constructor(
            private store: Store<State>,
            private authService: AuthService,
            private router: Router) {}
    isAuthenticated: boolean = false;

    ngOnInit(): void {
        

        // ####### option 1: ##################################
        // ####### this is solution with out selectors ######## 
        // this.store.select('auth')
        // .subscribe(userData => {
        //    if(userData) {
        //        this.isAuthenticated = !!userData.user;
        //    }
        // });
        // #################################################### 

     

        // ####### option 2: ###############################################
        // ####### this is solution with 'FeatureState' selector ###########
        this.store.select(getAuthFeatureState).subscribe(
            (userResponse) => {
                if (userResponse) {
                    this.isAuthenticated = !!userResponse.user;
                }
            }
        );
        // #################################################################    




    }




    onLogout() {
          this.store.dispatch(AuthPageActions.Logout());
         // this.authService.logout();
    }




}