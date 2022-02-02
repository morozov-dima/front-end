import { Component, OnInit } from '@angular/core';
import { ShowDataService } from '../shared/show-data.service';

@Component({
  selector: 'app-show-data',
  templateUrl: './show-data.component.html',
  styleUrls: ['./show-data.component.css']
})
export class ShowDataComponent implements OnInit {

  /*
    name: string - requered parameter
    price: number - requered parameter
    bonus: number - optional parameter
  */
  items: {name: string, price: number, bonus?: number}[] = [
    {
      name: 'a1004',
      price: 10,
      bonus: 3
    },
    {
      name: 'b154',
      price: 10
    },
    {
      name: 'c1234',
      price: 100,
      bonus: 30
    },
    {
      name: 'k1211',
      price: 200,
      bonus: 10
    }
  ];

  myArr: number[] = [1, 2, 3, 4];
  mySum: number = 0;
  mySumObj: number = 0;

  numberOfLetters: number = 0;
  str: string = ' 12345678 ';
  result: {name: string, price: number, bonus?: number}[] = [];
  bigPricesItems: {name: string, price: number, bonus?: number}[] = [];
  bitPrice: number = 50;

  constructor(private showDataService: ShowDataService) { }

  ngOnInit(): void {
    this.result = this.showDataService.getItemsWithBonus(this.items);
    this.numberOfLetters = this.showDataService.countNumberOfLettersInString(this.str);
    this.mySum = this.showDataService.sumOfNumbers(this.myArr);
    this.mySumObj = this.showDataService.sumOfNumbersInObject(this.items);
    this.bigPricesItems = this.showDataService.getBigPrices(this.items, this.bitPrice);
  }

}
