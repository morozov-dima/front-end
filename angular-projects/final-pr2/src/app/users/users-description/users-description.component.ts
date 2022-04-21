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
        email: new FormControl('', [
            Validators.required,
            Validators.email,
            Validators.minLength(3),
            Validators.maxLength(50)
        ]),
        phone: new FormControl('', Validators.required),
        website: new FormControl('', Validators.required),
        network: new FormControl('', Validators.required),
        street: new FormControl('', Validators.required)
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
            email: currentUser?.email,
            phone: currentUser?.phone,
            website: currentUser?.website,
            network: currentUser?.network,
            street: currentUser?.address.street
        });
    }




    onSaveUser(originalUser: User){

       // this object include updated form values and part of original values
       const partOfUsrDataObj = {
            email: this.userForm.value.email,
            phone: this.userForm.value.phone,
            website: this.userForm.value.website,
            network: this.userForm.value.network,
            address: {
                street: this.userForm.value.street,
                suite: originalUser.address.suite,
                city: originalUser.address.city,
                zipcode: originalUser.address.zipcode,
                geo: {
                    lat: originalUser.address.geo.lat,
                    lng: originalUser.address.geo.lng,
                }
            }
       };

        // Merge objects using the spread operator (...)
        const user = {... originalUser, ...partOfUsrDataObj};
        if (user.id === 0) {
            this.store.dispatch(UserPageActions.createUser({currentUser: user}));
        } else {
            this.store.dispatch(UserPageActions.updateCurrentUser({currentUser: user}))
        }


    }







    onDeleteUser(currentUser: User) {
        console.log(currentUser);
        this.store.dispatch(UserPageActions.deleteCurrentUser({ userId: currentUser.id }));
    }




    get email() { return this.userForm.get('email')!; }
    get phone() { return this.userForm.get('phone')!; }
    get website() { return this.userForm.get('website')!; }
    get street() { return this.userForm.get('street')!; }
    get network() { return this.userForm.get('network')!; }



}