import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../shared/user-data.service';

@Component({
  selector: 'app-promotions-page',
  templateUrl: './promotions-page.component.html',
  styleUrls: ['./promotions-page.component.css']
})
export class PromotionsPageComponent implements OnInit {
  text: string = '';
  pageType: string = 'promotions';

  constructor(private userDataService: UserDataService) { }

  ngOnInit(): void {
    this.text = this.userDataService.getPageData(this.pageType);
  }

}
