import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { delay, Subscription } from 'rxjs';
import { Comments } from '../shared/user-data';
import { UserDataService } from '../shared/user-data.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit, OnDestroy {

  
  profileFrom!: FormGroup;

  isSubmitted: boolean = false;
  showLoading: boolean = false;
  comments: Comments[] = [];
  commentsSubscription!: Subscription;

  constructor(private userDataService: UserDataService) { }





  ngOnInit(): void {
    this.profileFrom = new FormGroup({
      // add user name validators
      'usernameInput': new FormControl(null, Validators.required),
      // add email validators, if we use more then one validator we
      // add '[]'
      'emailInput': new FormControl(null, [Validators.required, Validators.email]),
      'commentsInput': new FormControl(null, Validators.required)
    });


    // get data from 'UserDataService' 
    this.commentsSubscription = this.userDataService.getComments().subscribe(data => {
      this.comments = data;
    });

  }





  onSubmit() {
    // output submitted form result
    console.log(this.profileFrom.value);



    // create object with from data
    const commentstData: Comments = {
      postId: 120,
      id: 121,
      name: this.profileFrom.value.usernameInput,
      email: this.profileFrom.value.emailInput,
      body: this.profileFrom.value.commentsInput
      }; 

      // show loading
      this.showLoading = true;
      // show form
      this.isSubmitted = false;
      
      // send submitted form object to server
      this.userDataService.createComments(commentstData)
      .pipe(
        // you can add delay opeator . remove it in production
        delay(5000)
      )
      .subscribe(data => {
        console.log(data);

        // hide loading
        this.showLoading = false;
        // hide form
        this.isSubmitted = true;
      });


      // reset form after submit
      this.profileFrom.reset();


  }




    
  // we can always access any form control through the get method
  get usernameInput() { return this.profileFrom.get('usernameInput')!;  }
  get emailInput() { return this.profileFrom.get('emailInput')!;  }





  ngOnDestroy(): void {
      // unsubscribe from comments subscription
      this.commentsSubscription.unsubscribe();
  }



}
