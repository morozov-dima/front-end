import { Component, ComponentFactoryResolver } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthResponseData } from './authResponseData';

import { AlertComponent } from '../shared/alert/alert.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode: boolean = true;
  isLoading: boolean = false;

  error: string = null;

  constructor(
              private authService: AuthService,
              private router: Router,
              // here we inject ComponentFactoryResolver class
              private componentFactoryResolver: ComponentFactoryResolver) {}




  onSwitchMode() {
    // this way we can change to the opposite of what it was before.
    // if 'true' -> will be 'false'
    // if 'false' -> will be 'true'
    this.isLoginMode = !this.isLoginMode;
  }




  onSubmit(form: NgForm) {
    // if our form not valid we should not send request.
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;


    let authObs : Observable<AuthResponseData>;


    // show loading spinner
    this.isLoading = true;


    // if we are logged in - we will send Http requests.
    if (this.isLoginMode) {
      // we can here login method without subscribe it.
      // we will subscribe later.
      authObs = this.authService.login(email, password);
    } else {
        // send data to 'auth' service. this service will
        // send Http request to server.
        //
        // we can here signup method without subscribe it.
        // we will subscribe later.
        authObs = this.authService.signup(email, password);
    }



    // here will be our subscription code.
    authObs.subscribe(
      resData => {
        console.log(resData);
        // hide loading spinner after we get response
        this.isLoading = true;
        // navigate programmatically
        this.router.navigate(['/recipes']);
      }, errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
 
        // hide loading spinner after we get response
        this.isLoading = true;
      }
    );



    

    // show for data
    //console.log(form.value);


    // reset form after submit
    form.reset();
  }









  onHandleError() {
    // we want to reset the error.
    this.error = null;
  }





}
