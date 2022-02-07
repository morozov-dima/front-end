import { Component, OnInit } from '@angular/core';
import { SaveUserDataService } from '../shared/save-user-data.service';
import { UserData } from '../shared/user-data';

@Component({
  selector: 'app-slots',
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.css']
})
export class SlotsComponent implements OnInit {
  userData: UserData[] = [];
  gameId: number = 0;

  constructor(private saveUserDataService: SaveUserDataService) { }

  ngOnInit(): void {
    this.userData = this.saveUserDataService.data;
  }





}
