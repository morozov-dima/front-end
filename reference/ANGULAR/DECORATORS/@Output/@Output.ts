// *******************************************************************************
// ******************************** Example **************************************
// *******************************************************************************



// ************************** assignment4.component.html ***************************

  <section class="assignment4">
    <app-game-control (sendNumber)="sendNumberGetEvent($event)"></app-game-control>
    <app-even [evenNumber]="evenNumberValue"></app-even>
    <app-odd [oddNumber]="oddNumberValue" ></app-odd>
  </section>






// ************************** assignment4.component.ts ***************************
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-assignment4',
  templateUrl: './assignment4.component.html',
  styleUrls: ['./assignment4.component.css']
})
export class Assignment4Component {
  @Input() evenNumberValue!: number;
  @Input() oddNumberValue!: number;

  sendNumberGetEvent(eventNumber: number) {
    // odd numbers 1, 3, 5
    // even numbers 2, 4, 6
    eventNumber % 2 === 0 ? this.evenNumberValue = eventNumber : this.oddNumberValue = eventNumber
  }

}







// ************************** game-control.component.html *****************************
<button (click)="onStartGame()" >Start Game</button>
<button (click)="onStopGame()" >Stop Game</button>





// ****************************** game-control.component.ts **************************
import { Component, EventEmitter, Output } from '@angular/core';
import { interval, Subscription } from 'rxjs';


@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent  {
  numbersSubscription!: Subscription;
  @Output() sendNumber = new EventEmitter<number>();

  constructor() { }
 
  onStartGame() {
      const numbers = interval(1000);  
      this.numbersSubscription = numbers.subscribe((number) => {
        this.sendNumber.emit(number);
      });
  }

  onStopGame() {
      this.numbersSubscription.unsubscribe();
  }

}






// *************************** even.component.html ***********************
<p>even works!</p>
<p [ngStyle]="{
    'background-color': 'red',
    'color': '#ffffff'
}">
    {{ evenNumber }}
</p>





// ************************** even.component.ts ***********************
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
    console.log(this.evenNumber);
    
  }

}





// ************************* odd.component.html ***********************
<p>odd number</p>

<p [ngStyle]="{
    'background-color': 'red',
    'color': '#ffffff'
    }" >
    {{ oddNumber }}
</p>






// *************************************************
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




