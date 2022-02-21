import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  profileForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    // create from group and controls
    this.profileForm = new FormGroup({
      'usernameInput': new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    console.log(this.profileForm);

       
  }

}
