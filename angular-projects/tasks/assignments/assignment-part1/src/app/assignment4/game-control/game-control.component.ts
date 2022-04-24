import { Component } from '@angular/core';
import { interval, Subscription, take } from 'rxjs';


@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent  {
  number: number = 0;
  interval: any;
  oddNumber!: number;
  evenNumber!: number;
  numbersSubscription!: Subscription;

  constructor() { }
 
  onStartGame(){
    const numbers = interval(1000);

    // optional. you can also just subscribe to 'numbers' and use regulat interval.
    const takeFourNumbers = numbers.pipe(take(4)); 
    this.numbersSubscription = takeFourNumbers.subscribe((number) => {
      number % 2 === 0 ? this.evenNumber = number : this.oddNumber = number;
    });
  }

  onStopGame(){
    this.numbersSubscription.unsubscribe();
  }

}
