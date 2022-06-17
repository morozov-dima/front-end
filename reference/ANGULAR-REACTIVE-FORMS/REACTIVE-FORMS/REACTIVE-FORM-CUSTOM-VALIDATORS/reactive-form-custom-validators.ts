// ********************************************************************************
// *********************************** Example  ***********************************
// ********************************************************************************





// ****************************** app.component.ts ********************************
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { forbiddenNameValidator } from './shared/custom-form-validator';
import { FormData } from './shared/form-data.interface';
import { FormDataService } from './shared/form-data.service';

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









// ****************************** app.component.html ********************************
<section class="content">
  <div class="internal-content">
    
    <div *ngIf="isSubmitted">
        Form was submitted. Referense id is: {{ formReferenseId }}
    </div>
    
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()" *ngIf="!isSubmitted">

      <div class="form-field">
        <label for="formEmail">Enter your email:</label>
        <input 
          type="text" 
          formControlName="formEmail"
          id="formEmail" >
          <span *ngIf="!formEmail.valid && formEmail.touched">Please enter correct email</span>
      </div>

       <div class="form-field">
        <label for="formPass">Password (8 characters minimum):</label>
        <input 
          type="password"
          formControlName="formPass"
          id="formPass" >
          <span *ngIf="!formPass.valid && formPass.touched">Please enter correct password</span>
       </div> 

       <button [disabled]="!userForm.valid" type="submit" >Submit</button>

    </form>
  </div>
</section>










// *************************** custom-form-validator.ts ****************************

import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const forbidden = nameRe.test(control.value);
        return forbidden ? {forbiddenName: {value: control.value}} : null;
    };
}







// ************************** form-data.interface.ts *****************************
export interface FormResponse {
  email: string;
  referenseId: number;
  id?: number;
}

export interface FormData {
  email: string;
  passowrd: string;
}








// *************************** form-data.service.ts ******************************
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { FormResponse, FormData } from './form-data.interface';


@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  constructor(private http: HttpClient) { }

  submitformData(formData: FormData): Observable<FormResponse> {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<FormResponse>(url, formData, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
