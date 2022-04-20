import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { State } from "src/app/state/app.reducer";
import { UserPageActions } from "../state/actions";
import { User } from "../state/users.interface";
import { getCurrentUser } from "../state/users.selectors";

@Component({
    selector: 'app-users-description',
    templateUrl: './users-description.component.html',
    styleUrls: ['./users-description.component.css']
})

export class UsersDescriptionComponent implements OnInit {
   
    currentUserSubscription!: Subscription;
    currentUser!: User;
    showUserDetails: boolean = false;
   
    constructor(
        private store: Store<State>
    ) {}


    userForm = new FormGroup({
        emailInput: new FormControl('', [
            Validators.required,
            Validators.email,
            Validators.minLength(3),
            Validators.maxLength(50)
        ]),
        phoneInput: new FormControl('', Validators.required),
        websiteInput: new FormControl('', Validators.required),
        networkInput: new FormControl('', Validators.required),
        streetInput: new FormControl('', Validators.required)
    });    


    ngOnInit(): void {
        this.currentUserSubscription = this.store.select(getCurrentUser).subscribe(
            responseCurrentUser => {
                if (responseCurrentUser) {
                    this.currentUser = responseCurrentUser;
                    this.showUserDetails = true;
                    this.displayUserDetails(responseCurrentUser)
                }
            }
        );
    }



    displayUserDetails(currentUser: User | null) {
        // update form inputs from ts code.
        this.userForm.patchValue({
            emailInput: currentUser?.email,
            phoneInput: currentUser?.phone,
            websiteInput: currentUser?.website,
            networkInput: currentUser?.network,
            streetInput: currentUser?.address.street
        });
    }




    onSaveUser(currentUser: User){
        console.log(currentUser);
        this.store.dispatch(UserPageActions.updateCurrentUser({currentUser: currentUser}))
    }



    onCancelEdit(currentUser: User) {
        console.log(currentUser);
    }




    onDeleteUser(currentUser: User) {
        console.log(currentUser);
    }




    get emailInput() { return this.userForm.get('emailInput')!; }
    get phoneInput() { return this.userForm.get('phoneInput')!; }
    get websiteInput() { return this.userForm.get('websiteInput')!; }
    get streetInput() { return this.userForm.get('streetInput')!; }
    get networkInput() { return this.userForm.get('networkInput')!; }



}