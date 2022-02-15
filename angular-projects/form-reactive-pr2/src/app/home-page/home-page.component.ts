import { Component, OnInit } from '@angular/core';
import { UserDataModel } from '../shared/user-data-model';
import { UserDataService } from '../shared/user-data.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styles: [
  ]
})
export class HomePageComponent implements OnInit {
  userDataHp: UserDataModel[] = [];

  constructor(private userDataService: UserDataService) { }

  ngOnInit(): void {
    this.userDataHp = this.userDataService.userData;
  }

}
