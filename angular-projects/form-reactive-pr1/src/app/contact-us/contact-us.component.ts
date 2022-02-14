import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  
  // access our form
  heroForm!: FormGroup;

  userName: string = '';
  userEmail: string = '';
  userSkils: string = '';
  userComments: string = '';

  ngOnInit(): void {

    // set form controls
    this.heroForm = new FormGroup({  
      'nameInput': new FormControl(null, Validators.required),
      'emailInput': new FormControl(null, [Validators.required, Validators.email]),
      'userSkils': new FormControl(null),
      'userComments': new FormControl(null, Validators.required)
    }); 
  }







  /*
    Run this function  when form is submitted
  */
  onSumbit() {
      console.log(this.heroForm);

      // get field values from submitted form
      this.userName = this.heroForm.get('nameInput')!.value;
      this.userEmail = this.heroForm.get('emailInput')!.value;
      this.userSkils = this.heroForm.get('userSkils')!.value;
      this.userComments = this.heroForm.get('userComments')!.value;
      
      // reset form after form submitted
      this.heroForm.reset();
  }







}
