// ********************************************************************************
// *********************************** Example  ***********************************
// ********************************************************************************



// ************************* contact-us.component.html ****************************
<section class="my-form">
    <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">

        <input type="text" name="emailNameInput" formControlName="emailNameInput"  id="emailNameInput" >
        <span *ngIf="!emailNameInput.valid && emailNameInput.touched">
          Please enter a valid email
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
        </div>
        <!-- **************** nested form end **************** -->

        <button [disabled]="!profileForm.valid"  type="submit">Submit</button>
    </form>
    
</section>












// *************************** contact-us.component.ts ****************************
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


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
      'emailNameInput': new FormControl('', [ Validators.required, Validators.email ]),
      'userData': new FormGroup({
            'industrySelect': new FormControl('', Validators.required)
      })
    });
  }

  onSubmit() {
    console.log(this.profileForm);
    this.profileForm.reset();
  }

  get emailNameInput() { return this.profileForm.get('emailNameInput')!; }
  get industrySelect() { return this.profileForm.get('userData.industrySelect')!; }
}


