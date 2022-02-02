import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShowDataService {

  constructor() { }
  


  
  /*
    This method get object and check in 'bonus' key appear in current object.
    Method return new array of objects that contain only objects with 'bonus' key.
  */
  getItemsWithBonus(items: {name: string, price: number, bonus?: number}[]) {
    let result: {name: string, price: number, bonus?: number}[] = [];  
    for (const item of items) {
      if(item.hasOwnProperty('bonus')) {  // check if our object has current key
        result.push(item);
      }
    }
    return  result;
  }






  /*
    Methot get string and count number of letters in this string
  */
  countNumberOfLettersInString(str: string): number {
    let result!: number;
    
    // removes whitespace from both ends of a string and returns a new string
    str = str.trim();
    result = str.length;
      return result;
  }






  /*
    Method calculate sum of array numbers
  */
  sumOfNumbers(arr: number[]): number {
    let result: number = 0;
    
    // option 1
    // const reducer = (previousValue: number, currentValue: number) => {return previousValue + currentValue};
    // result = arr.reduce(reducer);

    // option 2
    // const reducer = (previousValue: number, currentValue: number) => previousValue + currentValue;
    // result = arr.reduce(reducer);

    result = arr.reduce((previousValue, currentValue) => {
      return previousValue + currentValue;
    });

    return result;
  }







  /*
    Method that get array of objects. and return sum of prices.
    in this example we use resuce method.
  */
  sumOfNumbersInObject(items: {name: string, price: number, bonus?: number}[]): number {
    let result: number = 0;
    let arrPrices: number[] = [];

    for (const item of items) {
      arrPrices.push(item.price);
    }

    result = arrPrices.reduce((p, c) => p + c);

    return result;
  }




  /*
    Method that get array of objects and "priceAmount".
    Method return array of objects where each object have price morenthat "priceAmount"
  */
  getBigPrices(items: {name: string, price: number, bonus?: number}[], priceAmount: number) {
    return items.filter(item => item.price > priceAmount);
  }


  


}
