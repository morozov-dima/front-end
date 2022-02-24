import { AfterContentChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Comments, Posts, UserData } from '../shared/user-data.model';
import { UserDataService } from '../shared/user-data.service';
import { merge, forkJoin, tap, delay, concat } from 'rxjs';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit, OnDestroy, AfterContentChecked {

  profileForm = new FormGroup({
    userInput: new FormControl('', Validators.required),
    emailInput: new FormControl('', [Validators.required, Validators.email])
  });

  userData: UserData[] = [];
  postsData: Posts[] = [];
  commentsData: Comments[] = [];


  constructor(private userDataService: UserDataService) { }

  ngOnInit(): void {
  
  }
  

  onSubmit() {
    // get form data
    //console.log(this.profileForm.value);

    // reset form after submit
    this.profileForm.reset(); 
    
    // get data from two different places
    const posts$Subscription = this.userDataService.getPosts();
    const comments$Subscription = this.userDataService.getComments();


    

    //  'forkJoin' RXJS operator
    //  'forkJoin' waits for each HTTP request to complete
    //  and group’s all the observables returned by each HTTP call
    //  into a single observable array and finally return that observable array.
    //
    //  There are use cases where you need to make multiple HTTP requests
    //  (to same or different server) and you need to wait until you get
    //  responses from all the HTTP requests for rendering the view.
    const userData$Subscription = forkJoin([
      posts$Subscription,
      comments$Subscription
    ]);




    userData$Subscription.subscribe(
      response => {
        // posts data from server
        this.postsData = response[0];
        // comments data from server
        this.commentsData = response[1];
      }
    );





  
      

  }

  ngOnDestroy(): void {
      
  }

  ngAfterContentChecked(): void {
      
  }



  get userInput() { return this.profileForm.get('userInput'); }
  get emailInput() { return this.profileForm.get('emailInput'); }


}
