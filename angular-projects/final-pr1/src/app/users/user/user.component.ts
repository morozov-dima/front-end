import { Component, Input, OnInit } from '@angular/core';
import { UsersModel } from 'src/app/shared/data.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() usersAddressData: UsersModel[] = [];
  constructor() { }

  ngOnInit(): void {
 
  }

}
