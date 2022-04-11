import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

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

    onSubmit() {
        console.log(this.registerForm.value);

    }
}