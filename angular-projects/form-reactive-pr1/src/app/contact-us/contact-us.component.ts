import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  heroForm!: FormGroup;

  ngOnInit(): void {
    this.heroForm = new FormGroup({  
      nameInput: new FormControl(null, Validators.required),
      emailInput: new FormControl(null, [Validators.required, Validators.email]),
      userComments: new FormControl(null, Validators.required)
    }); 
  }



  onSumbit() {
      console.log(this.heroForm);
      
  }

}
