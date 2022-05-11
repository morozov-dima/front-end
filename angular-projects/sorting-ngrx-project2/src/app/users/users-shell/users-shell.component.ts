import { Component, OnInit } from "@angular/core";

import { Store } from '@ngrx/store';
import { State } from '../../state/app.state';

import * as UsersActions from '../state/users.actions';
import { User } from '../state/users.interface';
import { selectAllUsers, selectSortedUsers } from "../state/users.selectors";




@Component({
    selector: 'app.users-shell',
    templateUrl: './users-shell.component.html',
    styleUrls: ['./users-shell.component.css']
})

export class UsersShellComponent implements OnInit {
    constructor(
        private store: Store<State>
    ) {}

    users: User[] = [];
    usersSorted: User[] = [];



    ngOnInit(): void {  
        this.store.dispatch(UsersActions.loadUsers());     
        this.store.select(selectAllUsers).subscribe(
            (responseUsers) => {
                this.users = responseUsers;
                this.usersSorted = responseUsers;
            }
        );
    }


    onSelecterTab(MatTabChangeEventObject: any) {
        this.sortData(MatTabChangeEventObject.index);
    }


    sortData(labelIndex: number) {
        switch (labelIndex) {
            case 0:
                this.store.dispatch(UsersActions.showAllUsers());
                this.store.select(selectAllUsers).subscribe(
                    (responseUsers) => {
                        this.usersSorted = responseUsers;
                    }
                );
                break;
            case 1:
                this.store.dispatch(UsersActions.showUsersSortedByName());
                this.store.select(selectSortedUsers).subscribe(
                    (responseSortedUsers) => {
                        this.usersSorted = responseSortedUsers;
                    }
                );
                break;
            case 2:
                this.store.dispatch(UsersActions.showUsersSortedByAge());
                this.store.select(selectSortedUsers).subscribe(
                    (responseSortedUsers) => {
                        this.usersSorted = responseSortedUsers;
                    }
                );
                break;    
        
            default:
                this.store.dispatch(UsersActions.showAllUsers());
                this.store.select(selectAllUsers).subscribe(
                    (responseUsers) => {
                        this.usersSorted = responseUsers;
                    }
                );
                break;
        }
    }

    


}