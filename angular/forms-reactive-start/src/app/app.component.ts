import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;


  ngOnInit(): void {
      this.signupForm = new FormGroup({
        'userData': new FormGroup({
          'username': new FormControl(null, Validators.required ),
          'email': new FormControl(null, [Validators.required, Validators.email])
         }),
        'gender': new FormControl('male'),
        'hobbies': new FormArray([])
      });
  }

  onSubmit() {
    /* thus is how we can access to the form */
    console.log(this.signupForm);
  }


  onAddHobby() {
    /* add new bobby to the hobbies array */
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }



}
