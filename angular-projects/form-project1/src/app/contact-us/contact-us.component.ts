import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GetUserDataService } from '../shared/get-user-data.service';
import { UserDataModel } from '../shared/user-data.model';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  @ViewChild('f') signupForm!: NgForm;

  /* set default valie to subscription drop down field */
  defaultSub: string = 'Advanced';

  /* create empty array of objects according to "UserDataModel" model */
  userDataItems: UserDataModel[] = [];

  /* display message if form in invalid */
  isValidForm: boolean = false;

  constructor(private getUserDataService: GetUserDataService) { }

  ngOnInit(): void {

    /* get data from service */
    this.userDataItems = this.getUserDataService.subscriptionsData;
    console.log(this.userDataItems);
  }

  onSubmit() {
     console.log(this.signupForm);
     console.log(this.signupForm.valid);
     this.isValidForm = this.signupForm.valid!;
  }

}
