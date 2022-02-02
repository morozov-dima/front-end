import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  counterActiveUsers: number = 0;
  counterInactiveUsers: number = 0;

  constructor() { }

  countActiveUsers() {
    this.counterActiveUsers++;
    console.log(`Number of active->inactive users : ${this.counterActiveUsers} !!!`);
  }

  countInactiveUsers() {
    this.counterInactiveUsers++;
    console.log(`Number of inactive->active users : ${this.counterInactiveUsers} !!!`);
  }

}
