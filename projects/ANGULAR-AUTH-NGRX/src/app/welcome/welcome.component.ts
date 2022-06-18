import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { getAuthFeatureState } from "../auth/state/auth.selectors";
import { State } from "../state/app.reducer";

@Component({
    selector: 'app-welcome',
    templateUrl: 'welcome.component.html',
    styleUrls: ['welcome.component.css']
})

export class WelcomeComponent implements OnInit {
    constructor(
        private store: Store<State>
    ) {}

    isAuthenticated: boolean = false;

    ngOnInit(): void {
        this.store.select(getAuthFeatureState).subscribe(
            (response) => {
                // this way we can check of user logged in/ not logged in
                this.isAuthenticated = !!response.user;
            }
        );
    }




}