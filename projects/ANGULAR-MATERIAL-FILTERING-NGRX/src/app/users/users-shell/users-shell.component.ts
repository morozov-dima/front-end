import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { UsersDataService } from "../state/users-data.service";
import { UserData, UserState } from "../state/users.interface";

import * as UsersAction from '../state/users.actions';
import { selectAllUsers, selectUsersByType } from "../state/users.selectors";

@Component({
    selector: 'app-users-shell',
    templateUrl: './users-shell.component.html',
    styleUrls: ['./users-shell.component.css']
})

export class UsersShellComponent implements OnInit {
    constructor(
        private store: Store<UserState>
    ) {}

    userData: UserData[] = [];

    ngOnInit(): void {
        
        // load Users from back-end
        this.store.dispatch(UsersAction.loadUsers());

        // select all users
        this.store.select(selectAllUsers).subscribe(
            (responseAllUsers) => {
                this.userData = responseAllUsers;
            }
        );
    }


    selectTab(tabEvent: any) {
        const tabLabelName = tabEvent.tab.textLabel.toLowerCase();
        this.store.dispatch(UsersAction.selectedTab( {selectedTabName: tabLabelName} ));
        this.store.select(selectUsersByType).subscribe(
            (resultUsersByType) => {
                this.userData = resultUsersByType;
            }
        );
    }


}