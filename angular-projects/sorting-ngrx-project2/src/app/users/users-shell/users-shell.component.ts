import { Component, OnInit } from "@angular/core";

import { Store } from '@ngrx/store';
import { State } from '../../state/app.state';

import * as UsersActions from '../state/users.actions';
import { User } from '../state/users.interface';
import { selectAllUsers, selectUsersByAge, selectUsersByName } from "../state/users.selectors";




@Component({
    selector: 'app.users-shell',
    templateUrl: './users-shell.component.html',
    styleUrls: ['./users-shell.component.css']
})

export class UsersShellComponent implements OnInit {
    constructor(
        private store: Store<State>
    ) {}

  
    usersSorted: User[] = [];



    ngOnInit(): void {  
        this.store.dispatch(UsersActions.loadUsers()); 


        // selectAllUsers selector
        this.store.select(selectAllUsers).subscribe(
            (responseUsers) => {
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
                // selectAllUsers selector   
                this.store.select(selectAllUsers).subscribe(
                    (responseUsers) => {
                        this.usersSorted = responseUsers;
                    }
                );
                break;
            case 1:
                // selectUsersByName selector    
                this.store.select(selectUsersByName).subscribe(
                    (responseSortedUsersByName) => {
                        this.usersSorted = responseSortedUsersByName;
                    }
                );

                break;
            case 2:
                // selectUsersByAge selector    
                this.store.select(selectUsersByAge)
                .subscribe( responseSortedUsersByAge => this.usersSorted = responseSortedUsersByAge );
                break;    
        
            default:
                // selectAllUsers selector  
                this.store.select(selectAllUsers).subscribe(
                    (responseUsers) => {
                        this.usersSorted = responseUsers;
                    }
                );
                break;
        }
    }

    


}