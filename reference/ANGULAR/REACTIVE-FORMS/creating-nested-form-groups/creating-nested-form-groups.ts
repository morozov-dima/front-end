// ********************************************************************************
// *********************************** Example  ***********************************
// ********************************************************************************



// ************* contact-us.component.html **************
<section class="my-form">
    <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">

        <!-- Full Name field begin -->
        <div class="mb-3">
            <label for="fullNameInput" class="form-label">Full Name *</label>
            <input 
                type="text" 
                class="form-control" 
                name="fullNameInput"
                formControlName="fullNameInput" 
                id="fullNameInput" >
                <span 
                  *ngIf="!fullNameInput.valid && fullNameInput.touched"
                  class="help-block">
                  Please enter a valid fuul name!
                </span>
          </div>
        <!-- Full Name field end -->



        <!-- Email field begin -->
        <div class="mb-3">
            <label for="emailNameInput" class="form-label">Email *</label>
            <input 
                type="text" 
                class="form-control" 
                name="emailNameInput"
                formControlName="emailNameInput"
                id="emailNameInput" >
                <span 
                    *ngIf="!emailNameInput.valid && emailNameInput.touched" 
                    class="help-block">
                    Please enter a valid email
                </span>
            </div>
        <!-- Email field end -->




        <!-- Company Name field begin -->
        <div class="mb-3">
            <label for="companyNameInput" class="form-label">Company *</label>
            <input 
                type="text" 
                class="form-control" 
                name="companyNameInput"
                formControlName="companyNameInput"
                id="companyNameInput" >
                <span *ngIf="!companyNameInput.valid && companyNameInput.touched">
                    Please enter a valid company
                </span>
            </div>
        <!-- Company Name field end -->




        <!-- Phone Name field begin -->
        <div class="mb-3">
            <label for="phoneInput" class="form-label">Phone *</label>
            <input 
                type="text" 
                class="form-control" 
                name="phoneInput"
                formControlName="phoneInput"
                id="phoneInput" >
                <span *ngIf="!phoneInput.valid && phoneInput.touched">
                    Please enter a valid phone
                </span>
            </div>
        <!-- Company Name field end -->





        <!-- **************** nested form begin **************** -->
        <div class="mb-3" formGroupName="userData">

            <!-- Industry begin -->
            <div class="mb-3">
                <label for="phoneInput" class="form-label">Industry</label>
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
            <!-- Industry end -->

            <!-- visitorsUserData begin -->    
            <div class="mb-3">
                <label for="visitorsInput" class="form-label">Visitors</label>
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
            <!-- visitorsUserData end -->


        </div>
        <!-- **************** nested form end **************** -->




        <!-- submit form button begin -->
        <div class="col-12">
            <button [disabled]="!profileForm.valid"
                 type="submit"
                 class="btn btn-primary">
                 Submit
            </button>
        </div>
        <!-- submit form button end -->

    </form>
</section>









// *************** contact-us.component.ts *******************
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from '../shared/custom-validator';
import { IndustryModel, VisitorsModel } from '../shared/user-data-model';
import { UserDataService } from '../shared/user-data.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  profileForm!: FormGroup;

  industryUserData: IndustryModel[] = [];
  visitorsUserData: VisitorsModel[] = [];


  constructor(private userDataService: UserDataService) { }


  ngOnInit(): void {
    this.profileForm = new FormGroup({
      'fullNameInput': new FormControl('', Validators.required),
      'emailNameInput': new FormControl('', [ Validators.required, Validators.email ], CustomValidator.forbiddenEmails),
      'companyNameInput': new FormControl('', Validators.required),
      'phoneInput': new FormControl('', [Validators.maxLength(10), Validators.required]),
      'userData': new FormGroup({
        'industrySelect': new FormControl('', Validators.required),
        'visitorsInput': new FormControl('', Validators.required)
      })
    });


    
    // get industry data from service
    this.industryUserData = this.userDataService.getIndustryData();
   
    // get visitors data from service
    this.visitorsUserData = this.userDataService.getVisitorsData();
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






// *************** contact-us.component.css *****************
.my-form {
    margin:20px;
}

input.ng-invalid.ng-touched {
    border:1px solid red;
}

input.ng-valid.ng-touched {
    border:1px solid green;
}

select.ng-invalid.ng-touched {
    border:1px solid red;
}

select.ng-valid.ng-touched {
    border:1px solid green;
}







// *************** custom-validator.ts *****************
import { AbstractControl } from "@angular/forms";
import { Observable } from "rxjs";

export class CustomValidator {

    static forbiddenEmails(control: AbstractControl): Promise<any> | Observable<any> {
        const promise = new Promise((resolve, reject) => {

        // we want right now to simulate the fact that we have
        // an asynchronous task like reaching out to a server.
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








// ****************** app.component.ts ******************
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,

    // we need import this module for reactive forms.
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }












