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
