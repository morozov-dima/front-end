import { Component, OnInit } from '@angular/core';
import { CompareDataService } from '../shared/compare-data.service';

@Component({
  selector: 'app-compare-data',
  templateUrl: './compare-data.component.html',
  styleUrls: ['./compare-data.component.css']
})
export class CompareDataComponent implements OnInit {
  mainData: {name: string, price: number}[] = [];

  data1: {name: string, price: number}[] = [
    {
      name: 'a1',
      price: 10
    },
    {
      name: 'b1',
      price: 20
    },
    {
      name: 'c1',
      price: 30
    }
  ];

  data2: {name: string, price: number}[] = [
    {
      name: 'a1',
      price: 9
    },
    {
      name: 'd1',
      price: 19
    },
    {
      name: 'k1',
      price: 15
    }
  ];



  constructor(private compareDataService: CompareDataService) { }

  ngOnInit(): void {
    this.mainData = this.compareDataService.joinData(this.data1, this.data2);
  }

}
