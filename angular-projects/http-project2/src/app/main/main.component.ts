import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserData } from '../shared/user-data.model';
import { UserDataService } from '../shared/user-data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  userData: UserData[] = [];
  userDataSubscription!: Subscription;
  isSubmitted: boolean = false;
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;

  profileForm = new FormGroup({
    dataInput: new FormControl('', Validators.required)
  });

  constructor(private userDataService: UserDataService) { }
  
  ngOnInit(): void {

  }


  onSubmit() {
    this.isSubmitted = true;

    this.userDataSubscription = this.userDataService.getDataFromServer()
    .subscribe({
      next: (uData) => {
        this.userData = uData;
        this.showSuccessMessage = true;
      },
      error: (error) => {
        console.error(error.message);
        this.showErrorMessage = true; 
      }
    });



    // reset form after submit
    this.profileForm.reset();
  }



  ngOnDestroy(): void {
      this.userDataSubscription.unsubscribe();
  }

  get dataInput() { return this.profileForm.get('dataInput'); }

}
