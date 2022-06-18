// *************************************************************
// ************************** Example  *************************
// *************************************************************

// ******************* app.component.html *********************

    <form #myForm="ngForm" (ngSubmit)="onSubmit(myForm)">
        <input  name="firstName" required [(ngModel)]="firstNameValue" #firstNameRef="ngModel"  type="text">
        <span *ngIf="!firstNameRef.valid">Enter your first name</span>

        <input name="lastName" ngModel  required  #lastNameRef="ngModel" type="text">
        <span *ngIf="!lastNameRef.valid">Enter your last name</span> 

        <button type="submit">Submit</button>    
    </form>    

    <p>
        FirstName: {{firstNameRef.value}}
        LastName: {{lastNameRef.value}}
    </p>




// ********************* app.component.ts *************************
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-assignment2',
  templateUrl: './assignment2.component.html',
  styleUrls: ['./assignment2.component.css']
})
export class Assignment2Component {
  firstNameValue: string = 'First Name';

  onSubmit(myForm: NgForm) {
    console.log(myForm.value);
  }
}


