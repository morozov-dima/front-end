import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserDataService } from '../shared/api.data.service';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit, OnDestroy {

  userForm = new FormGroup({
    userEmail: new FormControl('', [Validators.required, Validators.email]),
    userName: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
    userAddress: new FormGroup({
      userCity: new FormControl('', Validators.required),
      userCountry: new FormControl('', Validators.required)
    })
  });

  constructor(private userDataService: UserDataService) {}

  userId!: number;
  userDataSub!: Subscription;
  isSubmitted: boolean = false;

  ngOnInit(): void {
    this.updateFormFields();
  }

  updateFormFields() {
    this.userForm.patchValue({
      userAddress: {
        userCity: 'example: TLV'
      }
    });
  }

  onSubmit() {
    console.log(this.userForm.value);
    if(this.userForm.value) {
        this.userDataSub = this.userDataService.submitUserForm(this.userForm.value).subscribe({
          next: (response) => {
            if (response.id) {
              this.userId = response.id;
            }
            this.isSubmitted = true;
            this.userForm.reset();
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            console.log('complete !!!');
          }
        })
    }
  }

  get userEmail() {
    return this.userForm.get('userEmail')!;
  }

  get userName() {
    return this.userForm.get('userName')!;
  }

  get userCity() {
    return this.userForm.get('userAddress.userCity')!;
  }

  get userCountry() {
    return this.userForm.get('userAddress.userCountry')!;
  }

  ngOnDestroy(): void {
    this.userDataSub.unsubscribe();
  }

}
