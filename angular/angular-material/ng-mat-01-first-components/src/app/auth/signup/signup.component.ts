import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate:any = undefined;

  constructor(private authService: AuthService) { }


  
  ngOnInit(): void {
    // we want to use a validation which ensures that the
    // user can only pick a date that makes him at least
    // 18 years old.
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }



  onSubmit(form: NgForm) {
    // register a new user
    this.authService.registerUser({
      // 'form.value.email' data that we get from form.
      email: form.value.email,
      // 'form.value.password' data that we get from form.
      password: form.value.password
    });
  }



}
