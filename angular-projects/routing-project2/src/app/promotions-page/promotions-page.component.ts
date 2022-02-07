import { Component, OnInit } from '@angular/core';
import { UsedDataService } from '../shared/used-data.service';

@Component({
  selector: 'app-promotions-page',
  templateUrl: './promotions-page.component.html',
  styleUrls: ['./promotions-page.component.css']
})
export class PromotionsPageComponent implements OnInit {
  pageType: string = 'promotions';

  constructor(private usedDataService: UsedDataService) { }

  ngOnInit(): void {
    this.usedDataService.getPageTests(this.pageType);
  }


}
