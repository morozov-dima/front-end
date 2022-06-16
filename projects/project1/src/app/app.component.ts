import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Range, RandomValues } from './shared/data.interface';
import { DataService } from './shared/data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private dataService: DataService) {}

  data: Range[] = [
    {
      from: 1,
      to: 10
    },
    {
      from: 30,
      to: 40
    },
    {
      from: 50,
      to: 100
    }
  ];


  ngOnInit(): void {
    const array = this.generateRandomNumbers(5);

    
    // Convert array to Observable
    const result = from(array);
    //console.log(result);
    

    this.dataService.data.next(array);

    result.subscribe({
      next: (value) => {
        console.log(value);
        
      }
    });

    
  }  


  generateRandomNumbers(amountOfNumbers: number) {
    const res: RandomValues[] = [];
    for (let index = 0; index < amountOfNumbers; index++) {
      const randomNumber = this.generateRandomNumber(3, 9);
      res.push({
        id: index + 1,
        randomValue: randomNumber
      });
    }
    return res;
  }


  generateRandomNumber(min: number, max: number) {
    const randomNumber = Math.random() * (max - min) + min;
    return randomNumber;
  }


}
