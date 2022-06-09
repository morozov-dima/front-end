// *************************************************************************
// ********************************* Example *******************************
// *************************************************************************



// ************************* contact-us.component.html *********************
<section class="content">

  <div *ngIf="isSubmitted; else elseBlock">
    Form was submitted. form id: {{userId}}
  </div>

  <ng-template #elseBlock>
    <form id="user-form" [formGroup]="userForm" (ngSubmit)="onSubmit()">
  
        <div class="form-field">
          <label for="userEmail">Enter your email:</label>
          <input 
            type="email"
            formControlName="userEmail"
            id="userEmail" >
            <span *ngIf="!userEmail.valid && userEmail.touched">enter your email</span>
        </div>
  
  
        <div class="form-field">
          <label for="userName">User Name (4 to 8 characters):</label>
          <input 
            type="text" 
            formControlName="userName"
            id="userName" >
            <span *ngIf="!userName.valid && userName.touched">enter your user name</span>
         </div> 
  
  
         <div class="user-address-group" formGroupName="userAddress">
            <div class="form-field">
              <label for="userCity">City:</label>
              <input 
              type="text"
              formControlName="userCity"
              id="userCity" >
              <span *ngIf="!userCity.valid && userCity.touched">enter your city</span>
            </div>
            <div class="form-field">
              <label for="userCountry">Country:</label>
              <input
              type="text"
              formControlName="userCountry"
              id="userCountry" >
              <span *ngIf="!userCountry.valid && userCountry.touched">enter your country</span>
            </div>
        </div>
   
  
         <button [disabled]="!userForm.valid" type="submit">
           Submit
         </button>
    
    </form>
  </ng-template>

</section>







// ************************ contact-us.component.ts *************************
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserDataService } from './shared/user-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
  userForm = new FormGroup({
    userEmail: new FormControl('', [Validators.required, Validators.email]),
    userName: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
    userAddress: new FormGroup({
      userCity: new FormControl('', Validators.required),
      userCountry: new FormControl('', Validators.required)
    })
  });

  constructor(private userDataService: UserDataService) {}

  userId!: number;
  userDataSub!: Subscription;
  isSubmitted: boolean = false;

  ngOnInit(): void {
    this.updateFormFields();
  }

  updateFormFields() {
    this.userForm.patchValue({
      userAddress: {
        userCity: 'example: TLV'
      }
    });
  }

  onSubmit() {
    console.log(this.userForm.value);
    if(this.userForm.value) {
        this.userDataSub = this.userDataService.submitUserForm(this.userForm.value).subscribe({
          next: (response) => {
            if (response.id) {
              this.userId = response.id;
            }
            this.isSubmitted = true;
            this.userForm.reset();
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            console.log('complete !!!');
          }
        })
    }
  }

  get userEmail() {
    return this.userForm.get('userEmail')!;
  }

  get userName() {
    return this.userForm.get('userName')!;
  }

  get userCity() {
    return this.userForm.get('userAddress.userCity')!;
  }

  get userCountry() {
    return this.userForm.get('userAddress.userCountry')!;
  }

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
export interface UserData {
  email: string;
  username: string;
  address: {
      city: string;
      country: string;
  }
  id?: number;
}






// ************************ api.data.service.ts ****************************
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { UserData } from './user-data.interface';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient) { }

  submitUserForm(body: UserData): Observable<UserData> {
    const url = 'https://jsonplaceholder.typicode.com/todos';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<UserData>(url, body, httpOptions).pipe(
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







// ****************** app.component.ts ******************
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }






