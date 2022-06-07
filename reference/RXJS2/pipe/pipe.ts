// ************************************************************************
// ***************************** Example 1 ********************************
// ************************************************************************



// ******************** game-control.component.html ***********************
<button (click)="onStartGame()">Start Game</button>
<app-even></app-even>
<app-odd></app-odd>









// ******************** game-control.component.ts ***********************
import { Component } from '@angular/core';
import { NumbersService } from '../events.service';
 

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent  {

  constructor(
        private numbersService: NumbersService
      ) { }

  onStartGame() {
    this.numbersService.startCounter();
  }

}







// ******************** events.service.ts ***********************
import { Injectable, OnInit } from "@angular/core";
import { interval, Subject, take } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class NumbersService implements OnInit {
    counterEvents: Subject<number> = new Subject<number>()

    constructor() {}

    startCounter() {
        const time = 1000; // 1sec

        // start count from this number
        let number: number = 1;

        // set interval with RxJS
        const numbers = interval(time);
        const takePartOfNumbers = numbers.pipe(
            // take 8 events only
            take(8)
        );

        takePartOfNumbers.subscribe(() => {
            // send events outside 
            this.counterEvents.next(number);
            number++;
        });
    }

    ngOnInit(): void {

    }
    

}







// ******************** even.component.ts ***********************
import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, map, Subscription } from 'rxjs';
import { NumbersService } from '../events.service';

@Component({
  selector: 'app-even',
  templateUrl: './even.component.html',
  styleUrls: ['./even.component.css']
})
export class EvenComponent implements OnInit, OnDestroy {
  evenNumber!: number;
  eventNumberSub!: Subscription;

  constructor(private numbersService: NumbersService) { }

  ngOnInit(): void {

   this.eventNumberSub = this.numbersService.counterEvents
    .pipe(
      // pass only event numbers
      filter((number) => { 
          return number % 2 === 0
        }
      )
    )
    .subscribe({
      next: (number) => {
          this.evenNumber = number;
      }
    });
  }


  ngOnDestroy(): void {
    this.eventNumberSub.unsubscribe();
  }

}









// ******************** even.component.html ***********************
<p>even component</p>

<p [ngStyle]="{
    'background-color': 'blue',
    'color': '#ffffff'
    }">
    {{ evenNumber }}
</p>










// ******************** odd.component.ts ***********************
import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, Subscription } from 'rxjs';
import { NumbersService } from '../events.service';

@Component({
  selector: 'app-odd',
  templateUrl: './odd.component.html',
  styleUrls: ['./odd.component.css']
})
export class OddComponent implements OnInit, OnDestroy {
  oddNumber!: number;
  oddNumberSub!: Subscription;

  constructor(private numbersService: NumbersService) { }

  ngOnInit(): void {
    this.oddNumberSub = this.numbersService.counterEvents
    .pipe(
      filter(number => number % 2 !== 0)
    )
    .subscribe((number) => {
      this.oddNumber = number;
    });
  }

  ngOnDestroy(): void {
    
  }

}











// *********************** odd.component.html **************************
<p>odd number</p>

<p [ngStyle]="{
        'background-color': 'red',
        'color': '#ffffff'
    }" >
    {{ oddNumber }}
</p>