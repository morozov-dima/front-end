import { Component, OnInit } from '@angular/core';
import { GetUserDataService } from '../shared/get-user-data.service';
import { UsedData } from '../shared/used-data';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {
  userData: UsedData[] = [];
  randomBg: string[] = [
    'bisque',
    '#a7a0ef',
    '#a5bda5',
    '#b38aad'
  ];

  constructor(private getUserDataService: GetUserDataService) { }

  ngOnInit(): void {  
    this.userData = this.getUserDataService.userData;
  }



}
