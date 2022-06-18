import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { State } from '../../state/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthPageActions from '../state/actions/auth-page.actions';

@Component({
    selector: 'app-join',
    templateUrl: './join.component.html',
    styleUrls: ['./join.component.css']
})

export class JoinComponent {
    isSubmitted: boolean = false;

    registerForm = new FormGroup({
        emailField: new FormControl('', [Validators.required, Validators.email]),
        passwordField: new FormControl('', Validators.required)
    })

    constructor(
        private store: Store<State>
    ) {}

    onSubmit() {
        console.log(this.registerForm.value);
        this.store.dispatch(AuthPageActions.SignupStart(
            { 
                email: this.registerForm.value.email,
                password: this.registerForm.value.password
            }
        ));
    }
}