// *************************************************************************
// ********************************* Example *******************************
// *************************************************************************




// ************************* contact-us.component.html *********************
<section class="contact-us">
    <form [formGroup]="profileForm" (ngSubmit)="onSubmit()" *ngIf="!isSubmitted">

        <!-- firstName field begin -->
        <p>
            <label for="first-name">First Name: </label>
            <input id="first-name" type="text" formControlName="firstName">
            <span *ngIf="!firstNameInput.valid && firstNameInput.touched">
                Please enter a valid industry
            </span>
        </p>
        <!-- firstName field end -->


        <!-- lastName field begin -->
        <p>
            <label for="last-name">Last Name: </label>
            <input id="last-name" type="text" formControlName="lastName">
            <span *ngIf="!lastNameInput.valid && lastNameInput.touched">
                Please enter a valid industry
            </span>
        </p>
        <!-- lastName field end -->


        <!-- email field begin -->
        <p>
            <label for="last-name">Email: </label>
            <input id="last-name" type="text" formControlName="email">
            <span *ngIf="!emailInput.valid && emailInput.touched">
                Please enter a valid industry
            </span>
        </p>
        <!-- email field end -->

        <button type="submit" [disabled]="!profileForm.valid">Submit</button>
    </form>


    <p *ngIf="isSubmitted">
          form was isSubmitted
          <br>
          you will get all details in your email: {{ submittedEmail }}  
    </p>

</section>








// ************************ contact-us.component.ts *************************
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ApiDataService } from '../shared/api-data.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit, OnDestroy {

  userData!: Subscription;

  // we will check if our form was submitted or not.
  isSubmitted: boolean = false;

  submittedEmail: string = '';

  profileForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email] )
  });

  constructor(private apiDataService: ApiDataService) { }

  ngOnInit(): void {

  }

  
  onSubmit() {
    this.userData = this.apiDataService.sendContactUsForm(this.profileForm.value).subscribe({
      next: responseData => {
        this.isSubmitted = responseData.isSubmitted;
        this.submittedEmail = responseData.email;
      },
      error: () => {
        console.error("error in sendContactUsForm");
      }
    });
  }


    // we can always access any form control through the get method
    // we use this 'gets' in html errors
    get firstNameInput() { return this.profileForm.get('firstName')!;  }
    get lastNameInput() { return this.profileForm.get('lastName')!; }
    get emailInput() { return this.profileForm.get('email')!; }


    ngOnDestroy(): void {
      this.userData.unsubscribe();
    }

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


  // send form data to server with POST
  sendContactUsForm(formData: ContactUsModel) {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
         Authorization: 'my-auth-token'
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

