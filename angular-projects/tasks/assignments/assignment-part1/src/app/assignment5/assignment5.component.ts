import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-assignment5',
    templateUrl: './assignment5.component.html',
    styleUrls: ['./assignment5.component.css']
})

export class Assignment5Component implements OnInit {

    userForm = new FormGroup({
        userEmail: new FormControl('', [Validators.required, Validators.email]),
        userSub: new FormControl('', Validators.required),
        userPassword: new FormControl('', Validators.required) 
    })

    ngOnInit(): void {
        
    }

    onSubmitForm() {
        console.log(this.userForm.value);
    }

    get getUserEmail() { return this.userForm.get('userEmail')!; }
    get getUserPassword() { return this.userForm.get('userPassword')!; }
    get getUserSub() { return this.userForm.get('userSub')!; }

}