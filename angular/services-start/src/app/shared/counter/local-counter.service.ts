import { Injectable } from '@angular/core';

@Injectable()
export class LocalCounterService {

  counter: number = 0;

  constructor() { }

  increaseNumber() {
    this.counter++;
  }

  decreaseNumber() {
    this.counter--;
  }
}
