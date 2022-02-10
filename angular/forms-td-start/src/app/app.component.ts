import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name: string = '';
  @ViewChild('f') signupForm: NgForm; 
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


    // /* This is not the best approach - setValue is used to set your whole form */
    // this.signupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: ''
    //   },
    //   secret: 'pet',
    //   questionAnswer: '',
    //   gender: 'male'
    // });


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
