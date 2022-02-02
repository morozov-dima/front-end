import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompareDataService {

  constructor() { }

  // How to Remove Duplicates From an Array of Objects in JavaScript
  joinData(data1: {name: string, price: number}[], data2: {name: string, price: number}[]) {
    let newData2 = [...data1, ...data2]; // Merge two Objects with spread operator

      const result = newData2.filter((element, index, array) =>
        index === array.findIndex((t) => (
          t.name === element.name
        ))
      )
      return result;
  }


  
}
