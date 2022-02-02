import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../shared/user-data.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  constructor(private userDataService: UserDataService) { }

  ngOnInit(): void {
    
  }

  onAddUserData(userData: string) {
    this.userDataService.userData.emit(userData);
  }

}
