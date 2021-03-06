import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthPageActions } from "../state/actions";
import { State } from "../../state/app.reducer";
import { Store } from '@ngrx/store';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    isSubmitted: boolean = false;

    loginForm = new FormGroup({
        emailField: new FormControl('', [Validators.required, Validators.email]),
        passwordField: new FormControl('', Validators.required)
    });

    constructor(private store: Store<State>) {}

    ngOnInit(): void {
        
    }

    onSubmit() {
        this.isSubmitted = true;
        this.loginForm.reset();
        const email = this.loginForm.value.emailField;
        const password = this.loginForm.value.passwordField;
        this.store.dispatch(AuthPageActions.LoginStart({ email: email, password: password }));
    }

}