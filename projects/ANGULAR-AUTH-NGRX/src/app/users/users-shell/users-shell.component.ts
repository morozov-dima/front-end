import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { State } from "../../state/app.reducer";
import { UserPageActions } from "../state/actions";
import { User } from "../state/users.interface";
import { getCurrentUser, getUsers, toggleEmail } from "../state/users.selectors";

@Component({
    selector: 'app-users-shell',
    templateUrl: './users-shell.component.html',
    styleUrls: ['./users-shell.component.css']
})

export class UsersShellComponent implements OnInit, OnDestroy {
    users: User[] = [];
    usersSubscription!: Subscription;
    displayEmail$!: Observable<boolean>;
    selectedUser$!: Observable<User | null | undefined>;

    constructor(
        private store: Store<State> ) {}



    ngOnInit(): void {
       // get users from back-end
       this.store.dispatch(UserPageActions.loadUsers());   
  
       // get users from sotre
       this.usersSubscription = this.store.select(getUsers)
       .subscribe( usersResponse => this.users = usersResponse );

        // get 'toggleEmail' boolean value from store
        this.displayEmail$ = this.store.select(toggleEmail);

        this.selectedUser$ = this.store.select(getCurrentUser);
    }




    getCurrentUser(currentUser: User) {
        // update store with current (selected) user
        this.store.dispatch(UserPageActions.setCurrentUser({userId: currentUser.id}));
    }




    toggleEmailInUsersList() {
        this.store.dispatch(UserPageActions.toggleEmail());
    }

    
    initializeNewUser() {
       this.store.dispatch(UserPageActions.initializeCurrentUser()); 
    }

    ngOnDestroy(): void {
        this.usersSubscription.unsubscribe();
    }

}