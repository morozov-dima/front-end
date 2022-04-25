import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserDataService } from './user-data.service';

@Component({
  selector: 'app-assignment6',
  templateUrl: './assignment6.component.html',
  styleUrls: ['./assignment6.component.css']
})
export class Assignment6Component implements OnInit {

  constructor(
    private userDataService: UserDataService
  ) { }

  userForm = new FormGroup({
    userEmail: new FormControl('', [Validators.required, Validators.email]),
    userPassword: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.userDataService.getTop3Users()
    .subscribe((response) => {
      console.log(response);
    });
  }


  onSubmitForm() {
    console.log(this.userForm.value);

  }


  get getUserEmail() { return this.userForm.get('userEmail')!; }
  get getUserPassword() { return this.userForm.get('userPassword')!; }

}
