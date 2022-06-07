// ********************************************************************************
// *********************************** Example  ***********************************
// ********************************************************************************



// ************************* contact-us.component.html ****************************
<section class="my-form">
    <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">

            <input type="text" name="fullNameInput" formControlName="fullNameInput"  id="fullNameInput">
            <span *ngIf="!fullNameInput.valid && fullNameInput.touched">
                Please enter a valid fuul name!
            </span>

            <input type="text" name="emailNameInput" formControlName="emailNameInput"  id="emailNameInput" >
            <span *ngIf="!emailNameInput.valid && emailNameInput.touched">
                Please enter a valid email
            </span>

            <input type="text" name="companyNameInput" formControlName="companyNameInput"  id="companyNameInput" >
            <span *ngIf="!companyNameInput.valid && companyNameInput.touched">
                Please enter a valid company
            </span>

            <input type="text" name="phoneInput" formControlName="phoneInput" id="phoneInput" >
            <span *ngIf="!phoneInput.valid && phoneInput.touched">
                Please enter a valid phone
            </span>
   






        <!-- **************** nested form begin **************** -->
        <div formGroupName="userData">

                <select 
                    name="industrySelect" 
                    class="form-select" 
                    id="industrySelect"
                    formControlName="industrySelect"
                    aria-label="Industry select" >
                    <option *ngFor="let iUserData of industryUserData"
                             [value]="iUserData.industry">
                             {{iUserData.industry}}
                    </option>
                </select>
                <span *ngIf="!industrySelect.valid && industrySelect.touched">
                    Please enter a valid industry
                </span>


  
                <select 
                    name="visitorsInput" 
                    class="form-select" 
                    id="visitorsInput"
                    formControlName="visitorsInput"
                    aria-label="Visitors select" >
                    <option *ngFor="let vUserData of visitorsUserData"
                             [value]="vUserData.visitors">{{vUserData.visitors}}
                    </option>
                </select>
                <span *ngIf="!visitorsInput.valid && visitorsInput.touched">
                    Please enter a valid visitors
                </span>

        </div>
        <!-- **************** nested form end **************** -->


        <button [disabled]="!profileForm.valid"  type="submit">Submit</button>

    </form>
</section>












// *************************** contact-us.component.ts ****************************
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserDataService } from '../shared/user-data.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})

export class ContactUsComponent implements OnInit {
  profileForm!: FormGroup;

  constructor(private userDataService: UserDataService) { }

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      'fullNameInput': new FormControl('', Validators.required),
      'emailNameInput': new FormControl('', [ Validators.required, Validators.email ]),
      'companyNameInput': new FormControl('', Validators.required),
      'phoneInput': new FormControl('', [Validators.maxLength(10), Validators.required]),
      'userData': new FormGroup({
            'industrySelect': new FormControl('', Validators.required),
            'visitorsInput': new FormControl('', Validators.required)
      })
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
  get phoneInput() { return this.profileForm.get('phoneInput')!; }
  get industrySelect() { return this.profileForm.get('userData.industrySelect')!; }
  get visitorsInput() { return this.profileForm.get('userData.visitorsInput')!; }
}


