import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {

  counter: number = 0;

  constructor() { }

  increaseNumber() {
    this.counter++;
  }

  decreaseNumber() {
    this.counter--;
  }

}
