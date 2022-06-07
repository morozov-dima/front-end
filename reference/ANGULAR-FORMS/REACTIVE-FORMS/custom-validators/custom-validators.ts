// ********************************************************************************
// *********************************** Example  ***********************************
// ********************************************************************************




// ************************** contact-us.component.ts *****************************
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from '../shared/custom-validator';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  profileForm!: FormGroup;
  constructor() { }
  ngOnInit(): void {
    this.profileForm = new FormGroup({
      'fullNameInput': new FormControl('', Validators.required),
      'emailNameInput': new FormControl('', [ Validators.required, Validators.email ], CustomValidator.forbiddenEmails),
      'companyNameInput': new FormControl('', Validators.required)
    });
  }


  onSubmit() {
    console.log(this.profileForm);
    // reset form after submit
    //this.profileForm.reset();
  }

  // we can always access any form control through the get method
  get fullNameInput() { return this.profileForm.get('fullNameInput')!;  }
  get emailNameInput() { return this.profileForm.get('emailNameInput')!; }
  get companyNameInput() { return this.profileForm.get('companyNameInput')!; }
}









// *************************** custom-validator.ts ****************************
import { AbstractControl } from "@angular/forms";
import { Observable } from "rxjs";

export class CustomValidator {
    static forbiddenEmails(control: AbstractControl): Promise<any> | Observable<any> {
        const promise = new Promise((resolve, reject) => {
          // we simulate the fact that we have an asynchronous task like reaching out to a server.
          // for this reason we add setTimeout
          setTimeout(() => {
              if(control.value === 'test@test.com') {
                // if validation is false
                resolve({'emailIsForbidden': true})
              } else {
                  // if validation is successful , you have to pass nothing or null.
                  resolve(null)
              }
          }, 1500);
        });
        return promise;
    }
}






