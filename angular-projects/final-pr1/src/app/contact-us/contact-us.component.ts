import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ApiDataService } from '../shared/api-data.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit, OnDestroy {

  userData!: Subscription;

  // we will check if our form was submitted or not.
  isSubmitted: boolean = false;

  submittedEmail: string = '';

  profileForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email] )
  });

  constructor(private apiDataService: ApiDataService) { }

  ngOnInit(): void {

  }


  onSubmit() {
    // 1. we send form data to server.
    // 2. here we use 'apiDataService' service.
    // 3. we also 'subscribe' to the response, because show some
    //    message after form submitted.
    this.userData = this.apiDataService.sendContactUsForm(this.profileForm.value).subscribe({
      next: responseData => {
        this.isSubmitted = responseData.isSubmitted;
        this.submittedEmail = responseData.email;
      },
      error: () => {
        console.error("error in sendContactUsForm");
      }
    });
  }


    // we can always access any form control through the get method
    get firstNameInput() { return this.profileForm.get('firstName')!;  }
    get lastNameInput() { return this.profileForm.get('lastName')!; }
    get emailInput() { return this.profileForm.get('email')!; }


    ngOnDestroy(): void {
      this.userData.unsubscribe();
    }

}
