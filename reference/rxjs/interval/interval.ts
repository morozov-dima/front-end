
// ****************************************************************
// *************************** Example 1 **************************
// ****************************************************************



// *********************** game-control.ts ************************
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










// *********************** game-control.html ************************
<app-odd 
    [oddNumber]="oddNumber" >
</app-odd>

<app-even 
    [evenNumber]="evenNumber" >
</app-even>

<button (click)="onStartGame()">Start Game</button>
<button (click)="onStopGame()">Stop Game</button>









// ********************* even.component.ts ********************
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-even',
  templateUrl: './even.component.html',
  styleUrls: ['./even.component.css']
})
export class EvenComponent implements OnInit {
  @Input() evenNumber!: number;

  constructor() { }

  ngOnInit(): void {
    
  }

}







// ****************** even.component.html ******************
<p [ngStyle]="{
    'background-color': 'red',
    'color': '#ffffff'
}">
    {{ evenNumber }}
</p>









// ****************** odd.component.ts ********************
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-odd',
  templateUrl: './odd.component.html',
  styleUrls: ['./odd.component.css']
})
export class OddComponent implements OnInit {
  @Input() oddNumber!: number;

  constructor() { }

  ngOnInit(): void {
     
  }

}








// ****************** odd.component.html ********************
[ngStyle]="{
    'background-color': 'blue',
    'color': '#ffffff'
}" >{{ oddNumber }}</p>





