import { Component, OnInit } from '@angular/core';
import { UserDataPromotions } from '../shared/user-data.model';
import { UserDataService } from '../shared/user-data.service';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {

  filteredStatus: string = '';

  promotionsData: UserDataPromotions[] = [];

  constructor(private userDataService: UserDataService) { }

  ngOnInit(): void {
    this.promotionsData = this.userDataService.getUserPromotions();
  }

}
