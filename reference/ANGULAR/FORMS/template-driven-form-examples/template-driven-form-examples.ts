// *************************************************************
// ************************* example 1 *************************
// *************************************************************



// ******************* app.component.html ***********************
      <form  #f="ngForm"  (ngSubmit)="onSubmit()" >


        <!-- ****** userData group begin ****** -->  
        <div 
            id="user-data" 
            ngModelGroup="userData"
            #userData="ngModelGroup"
            >
          <div class="form-group">
            <label for="username">Username</label>
            <!-- username field -->
            <input 
              type="text" 
              id="username" 
              class="form-control"
              [ngModel]="defaultUserName"
              name="username"
              required
              >
          </div>
          <button class="btn btn-default" (click)="suggestUserName()" type="button">Suggest an Username</button>
          <div class="form-group">
            <label for="email">Mail</label>
            <!-- email field -->
            <input 
              type="email" 
              id="email" 
              class="form-control"
              ngModel
              name="email"
              required
              email
              #email="ngModel" >
              
              <span *ngIf="!email.valid" class="help-block">
                Please enter a valid email!
              </span> 
          </div>
        </div>
        <!-- ****** userData group end ****** -->  

        
        


        <p *ngIf="!userData.valid && userData.touched">User Data is invalid!</p>


        <!-- secret text field -->
        <div class="form-group">
          <label for="secret">Secret Questions</label>
          <select 
            id="secret" 
            class="form-control"
            [ngModel]="defaultQuestion"
            name="secret"
            required
            >
            <option value="pet">Your first Pet?</option>
            <option value="teacher">Your first teacher?</option>
          </select>
        </div>


        <!-- textarea field -->
        <div class="form-group">
          <textarea 
            name="questionAnswer" 
            rows="3"
            [(ngModel)]="answer"  
            class="form-control"
            >
          </textarea>
        </div>

        <p>
          Your reply: {{ answer }}
        </p>


        <!-- radio field -->
        <div class="radio" *ngFor="let gender of genders">
          <label>
            <input 
              type="radio"
              name="gender"
              ngModel
              required
              [value]="gender">
              {{ gender }}
          </label>
        </div>

          <!-- disable button if form in not valid-->
          <button 
          [disabled]="!f.valid" 
          class="btn btn-primary" 
          type="submit">Submit</button>


      </form>



      <hr>

      <!-- Output form results -->
      <div class="row" *ngIf="submitted">
        <div class="col-xs-12">
          <h3>Your Data</h3>
          <p>Username: {{user.username}}</p>
          <p>Mail: {{user.email}}</p>
          <p>Secret Question: Your first {{user.secretQuestion}}</p>
          <p>Answer: {{user.answer}}</p>
          <p>Gender: {{user.gender}}</p>
         </div>
       </div>  









// ****************** app.component.ts *********************
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name: string = '';
  @ViewChild('f') signupForm!: NgForm; 
  defaultQuestion: string = 'pet';
  defaultUserName: string = 'default username';
  answer: string = '';
  genders: string[] = ['male', 'female'];
  user = {
     username: '',
     email: '',
     secretQuestion: '',
     answer: '',
     gender: ''
  };

  submitted: boolean = false;
   

  suggestUserName() {
    const suggestedName = 'Superuser';


    // /* better approach - to overwrite parts of the form */
    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    });


  }

  // onSubmit(form: NgForm) {
  //   console.log(form);
  //   console.log(form.value);
  //   console.log(form.valid);
  // }


  onSubmit() {
    //console.log(this.signupForm);
    //console.log(this.signupForm.value);
    this.submitted = true;
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secretQuestion = this.signupForm.value.secret;
    this.user.answer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;

    this.signupForm.reset(); // resetting our form

  }

}









// ********************* app.module.ts *************************
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // add this module for TD Forms <= #######################
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }























// *************************************************************
// ************************* example 2 *************************
// *************************************************************

// ******************* app.component.html *********************
<h3>assignment - TD Form</h3>
<ol>
  <li>Add a Form inputs firstName and lastName</li>
  <li>submit form, use TD form </li>
  <li>Dislay below form submitted values</li>
  <li>Below each field add error if current fiest is empty</li>
  <li>Add Validators for input fields</li>
</ol>

<br>
<br>
<br>


<section class="assignment2">
    <form #myForm="ngForm" (ngSubmit)="onSubmit(myForm)">
        <div class="row">
            <input
                name="firstName"
                class="firstName"
                required
                [(ngModel)]="firstNameValue"
                #firstNameRef="ngModel"
                type="text">
                <span *ngIf="!firstNameRef.valid">Enter your first name</span>
        </div>

        <div class="row">
        <input
            name="lastName"
            class="lastName"
            ngModel
            required
            #lastNameRef="ngModel"
            type="text">
            <span *ngIf="!lastNameRef.valid">Enter your last name</span> 
        </div>       
            
        <div class="row">
            <button type="submit">Submit</button>    
        </div>
    </form>    


    <p>
        FirstName: {{firstNameRef.value}}
        <br>
        LastName: {{lastNameRef.value}}
    </p>

</section>






// ********************* app.component.ts *************************
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-assignment2',
  templateUrl: './assignment2.component.html',
  styleUrls: ['./assignment2.component.css']
})
export class Assignment2Component implements OnInit {

  firstNameValue: string = 'First Name';

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(myForm: NgForm) {
    console.log(myForm.value);
    
  }

}







// ******************** app.module.ts ********************
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Assignment1Component } from './assignment1/assignment1.component';
import { Assignment2Component } from './assignment2/assignment2.component';

@NgModule({
  declarations: [
    AppComponent,
    Assignment1Component,
    Assignment2Component
  ],
  imports: [
    BrowserModule,
    FormsModule        // add this module for TD Forms <= #######################
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }












