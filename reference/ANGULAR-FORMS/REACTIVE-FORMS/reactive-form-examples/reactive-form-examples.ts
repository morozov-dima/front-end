// *************************************************************************
// ********************************* Example *******************************
// *************************************************************************



// ************************* contact-us.component.html *********************
<section class="contact-us">
    <form [formGroup]="profileForm" (ngSubmit)="onSubmit()" *ngIf="!isSubmitted">

        <!-- firstName field -->
        <div>
            <label for="firstName">First Name: </label>
            <input id="firstName" type="text" formControlName="firstName">
            <span *ngIf="!firstNameInput.valid && firstNameInput.touched">
                Please enter a valid industry
            </span>
        </div>

        <!-- lastName field -->
        <div>
            <label for="lastName">Last Name: </label>
            <input id="lastName" type="text" formControlName="lastName">
            <span *ngIf="!lastNameInput.valid && lastNameInput.touched">
                Please enter a valid industry
            </span>
        </div>

        <!-- email field -->
        <div>
            <label for="email">Email: </label>
            <input id="email" type="text" formControlName="email">
            <span *ngIf="!emailInput.valid && emailInput.touched">
                Please enter a valid industry
            </span>
        </div>

        <button type="submit" [disabled]="!profileForm.valid">Submit</button>
    </form>

    <p *ngIf="isSubmitted">
          form was isSubmitted
          <br>
          you will get all details in your email: {{ submittedEmail }}  
    </p>
</section>








// ************************ contact-us.component.ts *************************
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ApiDataService } from '../shared/api-data.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements  OnDestroy {

  userDataSub!: Subscription;
  isSubmitted: boolean = false;
  submittedEmail: string = '';

  profileForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email] )
  });

  constructor(private apiDataService: ApiDataService) { }
  
  onSubmit() {
    this.userDataSub = this.apiDataService.sendContactUsForm(this.profileForm.value).subscribe({
      next: (responseData) => {
        this.isSubmitted = responseData.isSubmitted;
        this.submittedEmail = responseData.email;
      },
      error: () => {
        console.error("error in sendContactUsForm");
      }
    });
  }

    get firstNameInput() { return this.profileForm.get('firstName')!;  }
    get lastNameInput() { return this.profileForm.get('lastName')!; }
    get emailInput() { return this.profileForm.get('email')!; }

    ngOnDestroy(): void {
      this.userDataSub.unsubscribe();
    }
}









// ************************ contact-us.component.css *************************
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






// ************************* data.model.ts **************************
export interface ContactUsModel {
    firstName: string;
    lastName: string;
    email: string;
}







// ************************ api.data.service.ts ****************************
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ContactUsModel, UsersModel } from './data.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiDataService {

  constructor(private http: HttpClient) { }

  sendContactUsForm(formData: ContactUsModel) {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const body: ContactUsModel = formData;

    return this.http.post<ContactUsModel>(url, body, httpOptions).pipe(
        map(
          responseData => {
            const submittedformInfo = {
              email: responseData.email,
              isSubmitted: true
            };
            return submittedformInfo;
          }
        )
        );
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

