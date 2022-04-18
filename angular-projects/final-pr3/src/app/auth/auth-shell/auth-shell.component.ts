import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-authshell',
    templateUrl: './auth-shell.component.html',
    styleUrls: ['./auth-shell.component.css']
})


export class AuthshellComponent implements OnInit{

    authForm!: FormGroup;

    ngOnInit(): void {
        this.authForm = new FormGroup({
            email: new FormControl('', [
                Validators.email,
                Validators.required,
                Validators.minLength(4)
            ]),
            password: new FormControl('', Validators.required)
        });
    }

    onSubmit() {
        console.log(this.authForm.value);
    }

    get emailInput() { return this.authForm.get('email')!; }
    get passwordInput() { return this.authForm.get('password')!; }


}