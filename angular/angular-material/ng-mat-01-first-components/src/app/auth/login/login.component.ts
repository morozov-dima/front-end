import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;


  constructor(private authService: AuthService) { }



  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [
          Validators.required,
          Validators.email
        ]
      }),
      password: new FormControl('', {
        validators: [
          Validators.required
        ]}) 
    });
  }




  onSubmit() {
    // login user
    this.authService.login({
      // 'this.loginForm.value.email' data that we get from form
      email: this.loginForm.value.email,
      // 'this.loginForm.value.password' data that we get from form
      password: this.loginForm.value.password
    });  
  }




}