import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames: string[] = ['Chris', 'Anna'];


  ngOnInit(): void {
      this.signupForm = new FormGroup({
        'userData': new FormGroup({
          'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)] ),
          'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
         }),
        'gender': new FormControl('male'),
        'hobbies': new FormArray([])
      });



      // /* we can call this on an individual form control. */
      // this.signupForm.valueChanges.subscribe(
      //   (value) => {
      //     console.log(value);
      //   }
      // );


      /* here we reseave the status now */
      this.signupForm.statusChanges.subscribe(
        (status) => {
         // console.log(status);
        }
      );


      /* we can set some default values for our form */  
      this.signupForm.setValue({
        'userData': {
          'username': 'Max',
          'email': 'max@test.com'
        },
        'gender': 'male',
        'hobbies': []
      });  



      /* set default value only for part of fields */  
      this.signupForm.patchValue({
        'userData': {
          'username': 'Anna'
        }
      });  







  }

  onSubmit() {
    /* thus is how we can access to the form */
    console.log(this.signupForm);
    
    /* reset form after submiting */
    this.signupForm.reset();
  }


  onAddHobby() {
    /* add new bobby to the hobbies array */
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')!).push(control);
  }




  /* 
     Here we create our own validator
     for example our validator will return :  {nameIsForbidden: true}
  */
  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    // check if "forbiddenUsernames" array contains the value of our control
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true}
    }
    // if validation is successful , you have to pass nothing or null.
    return null; 
  }







  /*
    Asynchronous validators - in case we get some data (forbidden emails) from server
  */
 forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
   const promise = new Promise<any>((resolve, reject) => {

     // we want right now to simulate the fact that we have
     // an asynchronous task like reaching out to a server.
     // for this reason we add setTimeout
     setTimeout(() => {
       if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true})
       } else{
         resolve(null)
       }
     }, 1500);
   });
   return promise;
 }





}
