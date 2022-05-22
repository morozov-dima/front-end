import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../auth.interface';
import { AuthService } from '../auth.service';
import { UserModel } from './auth-user.model';

@Component({
    selector: 'app-auth-shell',
    templateUrl: './auth-shell.component.html',
    styleUrls: ['./auth-shell.component.css']
})

export class AuthShellComponent  {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    hide = true;
    loginForm = new FormGroup({
        email : new FormControl('', [Validators.required, Validators.email]),
        password : new FormControl('', [Validators.required, Validators.minLength(5)])
    });


  

      onSubmit() {
          console.log(this.loginForm.value);
          const email = this.loginForm.value.email;
          const password = this.loginForm.value.password;
          this.authService.login(email, password).subscribe(
              userResponse => {
                  console.log(userResponse);
                  this.saveUser(userResponse);
                  this.router.navigate(['/']);
              }
          );
      }



      saveUser(user: User) {
        // save user data in user class
        const expirationData = new Date(new Date().getTime() + +user.tokenExpirationDate * 100);
        const userModel = new UserModel(user.email, user.userId, user.token, expirationData);
                

        // save user data in localStorage
        localStorage.setItem('userData', JSON.stringify(userModel))
      }
}