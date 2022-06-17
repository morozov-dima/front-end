import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormDataService } from './form-data.service';
import { forbiddenNameValidator } from './custom-form-validator';
import { FormData } from './form-data.interface';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  userForm = new FormGroup({
    formEmail: new FormControl('', [
      Validators.required,
      Validators.email,
      /*
       * Here's how you pass in the custom validator.
       * you can pass value ro regular expression '/testemail/i'
      */
      forbiddenNameValidator(/testemail/i)  // <-- custom validator.
    ]),
    formPass: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(private formDataService: FormDataService) {}

  isSubmitted: boolean = false;
  formDataSub!: Subscription;
  formReferenseId!: number;


  ngOnInit(): void {
    this.userForm.patchValue({
      formEmail: 'Email'
    });
  }

  onSubmit() {
    const formValue: FormData = {
      email: this.userForm.value.formEmail,
      passowrd: this.userForm.value.formPass
    };
    this.formDataSub = this.formDataService.submitformData(formValue).subscribe({
      next: (response) => {
        this.userForm.reset();
        this.isSubmitted = true;
        if (response.id) {
          this.formReferenseId = response.id;
        }
      }
    })
  }
  
  get formEmail() {
    return this.userForm.get('formEmail')!;
  }

  get formPass() {
    return this.userForm.get('formPass')!;
  }

}