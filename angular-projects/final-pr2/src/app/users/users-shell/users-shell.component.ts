import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { State } from "src/app/state/app.state";
import { UserPageActions } from "../state/actions";
import { UsersService } from "../state/users.service";

@Component({
    selector: 'app-users-shell',
    templateUrl: './users-shell.component.html',
    styleUrls: ['./users-shell.component.css']
})

export class UsersShellComponent implements OnInit {



    constructor(
        private usersService: UsersService, 
        private store: Store<State> ) {}

    ngOnInit(): void {
        this.usersService.getUsers().subscribe(
            (usersResponse) => {
                //console.log(usersResponse);
                
            }
        );


         this.store.dispatch(UserPageActions.loadUsers());   



    }

}