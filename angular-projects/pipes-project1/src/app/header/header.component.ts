import { Component, OnInit } from '@angular/core';
import { UserDataPromotions } from '../shared/user-data.model';
import { UserDataService } from '../shared/user-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // create loval variable for list of promotions
  promotionsData: UserDataPromotions[] = [];
  
  constructor(private promData: UserDataService) { }

  ngOnInit(): void {
    // get list of promotions from service
    this.promotionsData = this.promData.getUserPromotions();
  }

  

}
