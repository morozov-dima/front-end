import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {
  public userMame: string = 'Please enter you user name';
  x: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }

  resetUser() {
    this.userMame = '';
  }

}
