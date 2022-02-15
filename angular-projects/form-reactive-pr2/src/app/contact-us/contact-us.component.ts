import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../shared/custom-validators';
import { UserDataService } from '../shared/user-data.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  profileForm!: FormGroup;

  constructor(private userDataService: UserDataService) { }

  ngOnInit(): void {


    // create form controls
    this.profileForm = new FormGroup({
      usernameInput: new FormControl('', Validators.required),
      emailInput: new FormControl('', [Validators.required, Validators.email], CustomValidators.forbiddenEmails),
      userCommentsTextarea: new FormControl('', Validators.required),
      userSkils: new FormControl('', Validators.required)
    });


  }




  onSubmit() {
    //console.log(this.profileForm);

    // get data from fields and assign it to object
    const uData = {
      userName: this.profileForm.get('usernameInput')!.value,
      userEmail: this.profileForm.get('emailInput')!.value,
      userComments: this.profileForm.get('userCommentsTextarea')!.value,
      userSkils: this.profileForm.get('userSkils')!.value
    };

     // send user data to service
     this.userDataService.saveUserData(uData);

     // reset form after submit
     this.profileForm.reset(uData);
  }



}
